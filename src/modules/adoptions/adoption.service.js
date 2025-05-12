import { NotFoundError } from "../../common/errors/errors.js";
import { petDao } from "../pets/pet.dao.js";
import { userDao } from "../users/user.dao.js";
import { adoptionDao } from "./adoption.dao.js";

class AdoptionService {
  //Retorna todas las adopciones
  async getAll() {
    return await adoptionDao.getAll();
  }

  //Retorna una adopción
  async getOne(query) {
    const adoption = await adoptionDao.getOne(query);

    //Manejo de error
    if (!adoption) throw new NotFoundError("Adopción no encontrada");

    return adoption;
  }

  //Crea una adopcion con id de usr y pet
  async createAdoption(ownerId, petId) {
    const pet = await petDao.getOne({ _id: petId }); //busco la mascota por id

    //Manejo de errores
    if (!pet) throw new NotFoundError("Mascota no encontrada");
    if (pet.adopted) throw new NotFoundError("La mascota ya ha sido adoptada");

    const user = await userDao.getOne({ _id: ownerId });
    if (!user) throw new NotFoundError("Usuario no encontrado");

    // Creamos la adopción
    const adoption = await adoptionDao.create({ owner: ownerId, pet: petId });

    // Actualizar el estado de adopción del pet
    await petDao.update(pet._id, { adopted: true, owner: user._id });

    // Actualizar la lista de mascotas del usuario
    const updatePets = [...user.pets, { _id: pet._id }];
    await userDao.update(user._id, { pets: updatePets });

    return adoption;
  }

  async deleteAdoption(id){
    //Obtener la adopción
    const adoption = await adoptionDao.getOne({_id: id});
    if(!adoption) throw new NotFoundError("Adoption not found");

    //Obtener el id del usuario asociado a la adopción
    const user = await userDao.getOne(adoption.owner._id);
    if (!user) throw new NotFoundError("User not found");

    //Validar que la mascota existe y actualizar su estado
    if (!adoption.pet || !adoption.pet._id) throw new NotFoundError("Pet not found");
    await petDao.update(adoption.pet._id, { adopted: false, owner: null });

    // Eliminar la mascota de la lista de adopciones del usuario (según la estructura de pets)
    await userDao.update(user._id, { $pull: { pets: { _id: adoption.pet._id } } });
    
    // Eliminar la adopción de la base de datos
    return await adoptionDao.remove(id);
  }

  async deleteAll(CalledFromPets = false){
    const adoptions = await adoptionDao.getAll();
    if(!adoptions.length && !CalledFromPets) throw new NotFoundError("No hay adopciones registradas. Por favor crea una");
  
    // CalledFromPets = No se arroja el throw / se mantiene la ejecucion si se busca borrar adopciones desde pets
    // Extraer los IDs de usuarios y mascotas afectados
    const userIds = adoptions.map(adoption => adoption.owner._id);
    const petIds = adoptions.map(adoption => adoption.pet._id);

    // Actualizar usuarios: eliminar referencia a mascotas
    await userDao.updateMany(
        { _id: { $in: userIds } },
        { $set: { pets: [] } }
    );

    // Actualizar mascotas: eliminar estado de adopción
    await petDao.updateMany(
        { _id: { $in: petIds } },
        { $set: { adopted: false, owner: null } }
    );

    // Eliminar todas las adopciones
    return await adoptionDao.removeAll();
  }
}

export const adoptionService = new AdoptionService();