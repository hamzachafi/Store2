import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Settings
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, siteName: 'store2', currency: 'MAD' }
  })

  // Categories
  const cat = await prisma.category.upsert({
    where: { slug: 'default' },
    update: {},
    create: { slug: 'default', name: 'Default' }
  })

  // Products
  const p1 = await prisma.product.upsert({
    where: { slug: 'sample-product-1' },
    update: {},
    create: {
      name: 'Sample Product 1',
      slug: 'sample-product-1',
      description: 'A great sample product',
      price: 199.99,
      stock: 20,
      categoryId: cat.id,
      images: { create: [{ url: '/placeholder.png', alt: 'Sample' }] }
    }
  })

  const p2 = await prisma.product.upsert({
    where: { slug: 'sample-product-2' },
    update: {},
    create: {
      name: 'Sample Product 2',
      slug: 'sample-product-2',
      description: 'Another great item',
      price: 349.50,
      stock: 12,
      categoryId: cat.id,
      images: { create: [{ url: '/placeholder.png', alt: 'Sample' }] }
    }
  })

  // Pages
  await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      title: 'About Us', slug: 'about',
      blocks: { create: [
        { kind: 'hero', data: { title: 'About store2', subtitle: 'We sell great things.' }, order: 0 },
        { kind: 'richtext', data: { html: '<p>This is a demo e-commerce site.</p>' }, order: 1 }
      ]}
    }
  })
}

main().catch(e=>{console.error(e); process.exit(1)}).finally(()=>prisma.$disconnect())
