import { NotFoundError } from "../../common/errors/errors.js";
import { generatePetMocks } from "../../mock/pets.mocks.js";
import { petDao } from "./pet.dao.js";

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
    return await petDao.remove(id);
  }

  async deleteAll(){
    const pets = await petDao.getAll();
    if(pets.length === 0) throw new NotFoundError("No hay mascotas para borrar. Por favor crea una");
  
    return await petDao.removeAll();
  }

}

export const petService = new PetService();