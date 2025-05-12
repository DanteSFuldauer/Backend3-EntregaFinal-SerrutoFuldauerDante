import { adoptionModel } from "./adoption.model.js";
import mongoose from "mongoose";


class AdoptionDao {

  async create(data) {
    return await adoptionModel.create(data);
  }

  async getAll() {
    return await adoptionModel.find().populate(["owner", "pet"]);
  }

  async getOne(id) {
    return await adoptionModel.findOne({ _id: id }).populate(["owner", "pet"]);
  }

  async update(id, data) {
    return await adoptionModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id) {
    return await adoptionModel.findByIdAndDelete(id);
  }

  async removeAll(){
    return await adoptionModel.deleteMany({});
  }

  async removeMany(filter) {
    return await adoptionModel.deleteMany(filter);
  } 
}

export const adoptionDao = new AdoptionDao();