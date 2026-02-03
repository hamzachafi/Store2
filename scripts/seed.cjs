// scripts/seed.cjs
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Ensure there is always a Settings row
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: "store2",
      primaryColor: "#1d4ed8",
      secondaryColor: "#0ea5e9",
      currency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || "MAD",
      codEnabled: true,
      logoUrl: null
    }
  });

  // Optional: ensure at least one Page exists so admin UI doesn’t explode
  await prisma.page.upsert({
    where: { slug: "home" },
    update: {},
    create: {
      title: "Home",
      slug: "home",
      published: true
    }
  });
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
