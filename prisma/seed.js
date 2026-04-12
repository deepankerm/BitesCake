const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const cakes = await prisma.category.create({ data: { name: 'Signature Cakes' } })
  const pastries = await prisma.category.create({ data: { name: 'Pastries & Breads' } })

  await prisma.product.create({
    data: {
      name: 'Decadent Chocolate Fudge',
      description: 'Our luxurious signature chocolate fudge cake with thick glossy ganache and a hint of espresso.',
      price: 55.00,
      imageUrl: '/images/chocolate.png',
      categoryId: cakes.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'The Artisan Floral Cake',
      description: 'A masterfully decorated tiered cake featuring edible pressed flowers and delicate buttercream.',
      price: 120.00,
      imageUrl: '/images/hero.png',
      categoryId: cakes.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'Golden Butter Croissants',
      description: 'A dozen freshly baked, golden brown, flaky butter croissants made with French butter.',
      price: 24.00,
      imageUrl: '/images/croissants.png',
      categoryId: pastries.id
    }
  })
  
  console.log('Seeded database successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
