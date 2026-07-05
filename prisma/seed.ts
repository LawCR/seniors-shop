import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await hash('admin123', 10)

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@qori.com' },
    update: {},
    create: {
      email: 'admin@qori.com',
      password: hashedPassword,
      name: 'Admin',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create sample categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'tejidos' },
      update: {},
      create: {
        name: 'Tejidos',
        description: 'Productos tejidos a mano con amor',
        slug: 'tejidos',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accesorios' },
      update: {},
      create: {
        name: 'Accesorios',
        description: 'Accesorios únicos hechos a mano',
        slug: 'accesorios',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'decoracion' },
      update: {},
      create: {
        name: 'Decoración',
        description: 'Artículos decorativos para el hogar',
        slug: 'decoracion',
      },
    }),
  ])

  console.log('✅ Categories created:', categories.length)

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
