import { NotFoundError } from "../../common/errors/errors.js";
import { generatePetMocks } from "../../mock/pets.mocks.js";
import { petDao } from "./pet.dao.js";
import { adoptionDao } from "../adoptions/adoption.dao.js";
import { adoptionModel } from "../adoptions/adoption.model.js";
import { adoptionService } from "../adoptions/adoption.service.js";
import { userDao } from "../users/user.dao.js";

import mongoose from "mongoose";


class PetService{
  async create(data){
    return await petDao.create(data);
  }

  async getAll() {
    return await petDao.getAll();
  }

  async getOne(query) {
    const pet = await petDao.getOne(query);
    if(!pet) throw new NotFoundError("Pet not found"); //si no existe el pet da error

    return pet; //sino retornamos el pet
  }

  async createPetMocks(amount) {
    const pets = await generatePetMocks(amount);
    //await petDao.removeAll();
    for(const pet of pets){
      await petDao.create(pet);
    }

    return pets;
  }

  async updatePet(id, data){
    const pet = await petDao.getOne({_id: id});
    if(!pet) throw new NotFoundError("Pet not found");
    return await petDao.update(id, data);
  }

  async deletePet(id){
    const pet = await petDao.getOne({_id: id});
    if(!pet) throw new NotFoundError("Pet not found");

    //Borrar adopcion con la mascota eliminada
    const adoptionToRemove = await adoptionModel.findOne({ pet: id}); //Obtenemos la adopcion
    
    //Si existe la adopcion, la borramos y actualizamos el usr
     if (adoptionToRemove) {
      const ownerID = adoptionToRemove.owner

      await adoptionDao.remove(adoptionToRemove._id); //Borro la adopcion
      await userDao.update(ownerID, { $pull: { pets: { _id: id } } }); //Quito mascota de "pets" del usr
    } 

    return await petDao.remove(id);
  }

  async deleteAll(){
    const pets = await petDao.getAll();
    if(pets.length === 0) throw new NotFoundError("No hay mascotas registradas para eliminar. Por favor crea una");
  
    const adoptions = await adoptionDao.getAll();

    //Llamar a deleteAllAdoptions con `calledFromPets = true`
    if (adoptions.length > 0) { await adoptionService.deleteAll(true); }

    return await petDao.removeAll();
  }

}

export const petService = new PetService();