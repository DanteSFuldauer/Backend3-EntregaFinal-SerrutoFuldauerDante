import { Router } from "express";
import { adoptionController } from "./adoption.controller.js";
import { validateSchema } from "../../common/middlewares/validateSchema.js";
import { createAdoptionSchema } from "./adoption.schema.js";
import { objectIdSchema } from "../../common/schemas/objectId.schema.js";

const router = Router();

router.get("/", adoptionController.getAll);
router.post("/", validateSchema(createAdoptionSchema), adoptionController.createAdoption);
router.get("/:id", validateSchema(objectIdSchema), adoptionController.getAdoptionById);
router.delete("/:id", validateSchema(objectIdSchema), adoptionController.deleteAdoption);
router.delete("/", adoptionController.deleteAll);

export default router;