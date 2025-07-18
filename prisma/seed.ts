import { PrismaClient } from "../src/generated/prisma";
import { createSlug } from "../src/lib/slug";

import { dataSeedAnimals } from "./data/animals";

const prisma = new PrismaClient();

async function main() {
  for (const seedAnimal of dataSeedAnimals) {
    const slug = createSlug(seedAnimal.name);

    const animal = await prisma.animal.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        ...seedAnimal,
      },
    });

    console.log(`🐻 Animal: ${animal.name} (${animal.slug})`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
