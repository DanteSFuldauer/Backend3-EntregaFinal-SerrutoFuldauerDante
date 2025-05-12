import { request, response } from "express";
import { petService } from "./pet.service.js";

class PetController {
  async create(req = request, res = response, next) {
    try {
      const body = req.body
      const pet = await petService.create(body);
      res.status(201).json(pet);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req = request, res = response, next) {
      try {
        const pets = await petService.getAll();
  
        res.status(200).json(pets);
      } catch (error) {
        next(error);
      }
    }

  async getPetById(req = request, res = response, next) {
    try {
      const { id } = req.params; //guardo la id
      const pet = await petService.getOne({ _id: id }); //busco por id

      res.status(200).json(pet); //devuelvo el pet
    } catch (error) {
      next(error); //si hay error, lo derivo al middleware de error
    }
  }

  async createPetMocks(req = request, res = response) {
    try {
      const { amount } = req.params;
      const pets = await petService.createPetMocks(amount);

      res.status(201).json(pets);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updatePet(req = request, res = response, next){
    try {
      const { id } = req.params;
      const body = req.body;

      const updatePet = await petService.updatePet(id, body);
      res.status(200).json(updatePet);

    } catch (error) {
      next(error)
    }
  }


  async deletePet(req = request, res = response, next){
    try {
      const { id } = req.params;

      //Borrar mascota, borrar adopcion si fue adoptado, actualizar usuario sin pets si lo adoptó
      const deletePet = await petService.deletePet(id);
      res.status(200).json({message: `Mascota con el id ${id} eliminada`, deletePet});

    } catch (error) {
      next(error)
    }
  }

  async deleteAll(req = request, res = response, next){
    try {
      await petService.deleteAll();
      res.status(200).json({message: "Todas las mascotas eliminadas"});
    
    } catch (error) {
      next(error)
    }
  }  
}

export const petController = new PetController();