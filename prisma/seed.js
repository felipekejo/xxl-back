import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const felipe = await prisma.user.upsert({
    where: { email: "felipe_m87@yahoo.com.br" },
    update: {},
    create: {
      email: "felipe_m87@yahoo.com.br",
      first_name: "Felipe",
      last_name: "Yui",
      password_hash:
        "$2a$06$fRO/M6TF5Zyefbl.uJ0xV.1/281LqE2vwAtiy5MhzNQf.oxCgRGBy",
      role: "OWNER",
    },
  });

  console.log({ felipe });
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
