import { NotFoundError } from "../../common/errors/errors.js";
import { generateUserMocks } from "../../mock/user.mock.js";
import { userDao } from "./user.dao.js";


class UserService{

  //async create(data){ 
  //  return await userDao.create(data);
  //}

  async getAll(){
    return await userDao.getAll();
  }

  async getOne(query) {
      const user = await userDao.getOne(query);
      if(!user) throw new NotFoundError("User not found"); //si no existe el user da error
  
      return user; //sino retornamos el user
  }

  async createUserMocks(amount){
    const users = await generateUserMocks(amount);
    //await userDao.removeAll();
    for( const user of users) {
      await userDao.create(user);
    }

    return users;
  }

  async updateUser(id, data){
    const user = await userDao.getOne({_id: id});
    if(!user) throw new NotFoundError("User not found");
    return await userDao.update(id, data);
  }

  async deleteUser(id){
    const user = await userDao.getOne({_id: id});
    if(!user) throw new NotFoundError("User not found");
    return await userDao.remove(id);
  }

  async deleteAll(){
    const users = await userDao.getAll();
    if(users.length === 0) throw new NotFoundError("No hay usuarios para borrar. Por favor crea uno");

    return await userDao.removeAll();
  }

}

export const userService = new UserService();