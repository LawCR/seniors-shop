'use server'

import { prisma } from '@/lib/prisma'

export async function getDashboardStats() {
  try {
    const [
      productsCount,
      categoriesCount,
      collaboratorsCount,
      featuredProductsCount,
      clientsCount,
      ordersCount,
      lowStockProducts
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.collaborator.count(),
      prisma.product.count({ where: { featured: true } }),
      prisma.client.count(),
      prisma.order.count(),
      prisma.product.findMany({
        where: {
          stock: {
            lte: 5
          }
        },
        orderBy: {
          stock: 'asc'
        },
        take: 5
      })
    ])

    return {
      success: true,
      data: {
        productsCount,
        categoriesCount,
        collaboratorsCount,
        featuredProductsCount,
        clientsCount,
        ordersCount,
        lowStockProducts
      },
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return { success: false, error: 'Error al obtener estadísticas' }
  }
}
