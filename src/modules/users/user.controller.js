import { request, response } from "express";
import { generateUserMocks } from "../../mock/user.mock.js";
import { userService } from "./user.service.js";

class UserController {
  /* async create(req = request, res = response, next) {
      try {
        const body = req.body
        const user = await userService.create(body);
        res.status(201).json(user);
      } catch (error) {
        next(error);
      }
    }
   */
  async getAll(req = request, res = response, next) {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);

    } catch (error) {
      next(error);
    }
  }

  async getUserById(req = request, res = response, next) {
      try {
        const { id } = req.params; //guardo la id
        const user = await userService.getOne({ _id: id }); //busco por id
  
        res.status(200).json(user); //devuelvo el user
      } catch (error) {
        next(error); //si hay error, lo derivo al middleware de error
      }
    }
  

  async createUserMocks(req = request, res = response) {
    try {
      const { amount } = req.params;
      const users = await userService.createUserMocks(amount);

      res.status(201).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

 async updateUser(req = request, res = response, next){
    try {
      const { id } = req.params;
      const body = req.body;

      const updateUser = await userService.updateUser(id, body);
      res.status(200).json(updateUser);

    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req = request, res = response, next){
      try {
        const { id } = req.params;
  
        const deleteUser = await userService.deleteUser(id);
        res.status(200).json({message: `Usuario con el id ${id} eliminado`, deleteUser});
  
      } catch (error) {
        next(error)
      }
    }

  async deleteAll(req = request, res = response, next){
    try {
      await userService.deleteAll();
      res.status(200).json({message: "Usuarios eliminados"});
  
    } catch (error) {
        next(error)
    }
  }

}

export const userController = new UserController();