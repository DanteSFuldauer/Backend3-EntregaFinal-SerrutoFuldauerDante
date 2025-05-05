import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
    //Referencia al usuario
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },

    //Referencia al pet
    pet: { type: mongoose.SchemaTypes.ObjectId, ref: "pets" },
});

export const adoptionModel = mongoose.model("adoptions", adoptionSchema);