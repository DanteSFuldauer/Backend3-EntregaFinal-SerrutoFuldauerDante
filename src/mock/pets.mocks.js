import { fakerES as faker } from "@faker-js/faker";
import { petService } from "../modules/pets/pet.service.js";

// Función para generar pet fake
export const generatePetMocks = async (amount) => {
  const existingPets = await petService.getAll(); 

  const newPets = [];

  for (let i = 0; i < amount; i++) {
    const pet = {
      name: faker.person.firstName(),
      specie: faker.helpers.arrayElement(["Perro", "Gato", "Conejo", "Oso", "Pájaro", "Carpincho"]),
      birthDate: faker.date.past({ years: 5 }),
      image: faker.image.urlLoremFlickr({ category: "animals" }),
    };

    newPets.push(pet);
  }

  return [...existingPets, ...newPets]; 
};