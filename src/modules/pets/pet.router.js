import { Router } from "express";
import { petController } from "./pet.controller.js";
import { validateSchema } from "../../common/middlewares/validateSchema.js";
import { createPetSchema, petMocksSchema, updatePetSchema } from "./pet.schemas.js";
import { objectIdSchema } from "../../common/schemas/objectId.schema.js";

const router = Router();

router.get("/", petController.getAll)
router.get("/mocks/:amount", validateSchema(petMocksSchema), petController.createPetMocks);
router.post("/", validateSchema(createPetSchema), petController.create);
router.get("/:id", validateSchema(objectIdSchema), petController.getPetById);
router.put("/:id", validateSchema(updatePetSchema), petController.updatePet);
router.delete("/:id", validateSchema(objectIdSchema), petController.deletePet);
router.delete("/", petController.deleteAll);

export default router;