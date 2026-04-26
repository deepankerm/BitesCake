/* eslint-disable */
const { PrismaClient } = require('@prisma/client')
const { Pool, neonConfig } = require('@neondatabase/serverless')
const { PrismaNeon } = require('@prisma/adapter-neon')
const ws = require('ws')
require('dotenv').config()

neonConfig.webSocketConstructor = ws

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const bento = await prisma.category.create({ data: { name: 'Bento Cake' } })
  const cakes = await prisma.category.create({ data: { name: 'Cakes' } })
  const cupcakes = await prisma.category.create({ data: { name: 'Cupcakes' } })
  const muffins = await prisma.category.create({ data: { name: 'Muffins' } })
  const pastry = await prisma.category.create({ data: { name: 'Pastry' } })
  const dryCake = await prisma.category.create({ data: { name: 'Dry Cake' } })

  await prisma.product.create({ data: { name: 'Signature Bento Cake', description: 'Small but mighty! Perfect personalized bento cake for an intimate celebration.', price: 400.00, imageUrl: '/images/chocolate.png', categoryId: bento.id } })
  await prisma.product.create({ data: { name: 'Custom Tiered Cake', description: 'A masterfully decorated tiered cake. Let us know your dream flavour and colors!', price: 1500.00, imageUrl: '/images/hero.png', categoryId: cakes.id } })
  await prisma.product.create({ data: { name: 'Assorted Cupcakes', description: 'A box of 6 beautifully crafted cupcakes in your preferred customized flavours.', price: 600.00, imageUrl: '/images/croissants.png', categoryId: cupcakes.id } })
  await prisma.product.create({ data: { name: 'Blueberry Muffins', description: 'Freshly baked, soft and fluffy classic blueberry muffins.', price: 150.00, imageUrl: '/images/croissants.png', categoryId: muffins.id } })
  await prisma.product.create({ data: { name: 'Butterscotch Pastry', description: 'Rich and creamy butterscotch pastry slice, perfect for a quick bite.', price: 120.00, imageUrl: '/images/chocolate.png', categoryId: pastry.id } })
  await prisma.product.create({ data: { name: 'Almond Dry Cake', description: 'Classic tea-time dry cake topped with freshly roasted almonds.', price: 350.00, imageUrl: '/images/hero.png', categoryId: dryCake.id } })
  
  console.log('Seeded database successfully with commercial payload!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
