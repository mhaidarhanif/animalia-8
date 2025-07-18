import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const animalBear = await prisma.animal.upsert({
    where: { slug: "polar-bear" },
    update: {},
    create: {
      name: "Polar Bear",
      slug: "polar-bear",
      color: "white",
    },
  });
  console.log({ animalBear });
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
