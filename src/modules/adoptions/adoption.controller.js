import { request, response } from "express";
import { adoptionService } from "./adoption.service.js";
import { userService } from "../users/user.service.js";
import { petService } from "../pets/pet.service.js";

class AdoptionController {

  //obtener todas las adopciones
  async getAll(req = request, res = response, next) {
    try {
      const adoptions = await adoptionService.getAll();

      res.status(200).json(adoptions);
    } catch (error) {
      next(error);
    }
  }
  
  async getAdoptionById(req = request, res = response, next) {
    try {
      const { id } = req.params;
      
      const adoption = await adoptionService.getOne({ _id: id });
      res.status(200).json(adoption);
    } catch (error) {
      console.log("HOLA DOY ERROR2")
      next(error);
    }
  }
  
  async createAdoption(req = request, res = response, next) {
    try {
      const { owner, pet } = req.body;
      const adoption = await adoptionService.createAdoption(owner, pet);

      res.status(201).json(adoption);
    } catch (error) {
      next(error);
    }
  }

  async deleteAdoption(req = request, res = response, next) {
    try {
        const { id } = req.params;

        // Obtener la adopción para verificar existencia
        const adoption = await adoptionService.getOne(id);
        if (!adoption) {
            return res.status(404).json({ message: "La adopción no existe" });
        }

        // Eliminar la adopción y actualizar usuario y mascota
        await adoptionService.deleteAdoption(id);

        res.status(200).json({ message: `Adopción con el ID ${id} eliminada correctamente` });
    } catch (error) {
        next(error);
    }
  }

  async deleteAll(req = request, res = response, next){
    try {
      await adoptionService.deleteAll();
      res.status(200).json({message: "Todas las adopciones eliminadas"});
    
    } catch (error) {
      next(error)
    }
  }
}

export const adoptionController = new AdoptionController();