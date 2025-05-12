import { fakerES as faker } from "@faker-js/faker";
import { createHash } from "../common/utils/hashPassword.js";
import { userService } from "../modules/users/user.service.js"; 


// Función para generar usuario fake
export const generateUserMocks = async (amount) => {
  const existingUsers = await userService.getAll(); 
  
  const newUsers = [];
  for (let i = 0; i < amount; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: createHash("123456"),
    };

    newUsers.push(user);
  }

  return [...existingUsers, ...newUsers]; 
};

