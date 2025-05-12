import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateSchema } from "../../common/middlewares/validateSchema.js";
import { objectIdSchema } from "../../common/schemas/objectId.schema.js";
import { userMocksSchema, updateUserSchema } from "./user.schemas.js";

const router = Router();

router.get("/", userController.getAll);
router.get("/mocks/:amount", validateSchema(userMocksSchema), userController.createUserMocks);
//router.post("/", validateSchema(createUserSchema), userController.create);
router.get("/:id", validateSchema(objectIdSchema), userController.getUserById);
router.put("/:id", validateSchema(updateUserSchema), userController.updateUser);
router.delete("/:id", validateSchema(objectIdSchema), userController.deleteUser);
router.delete("/", userController.deleteAll);


export default router;