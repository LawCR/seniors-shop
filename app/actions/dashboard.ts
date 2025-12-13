'use server'

import { prisma } from '@/lib/prisma'

export async function getDashboardStats() {
  try {
    const [productsCount, categoriesCount, collaboratorsCount, featuredProductsCount] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.collaborator.count(),
      prisma.product.count({ where: { featured: true } }),
    ])

    return {
      success: true,
      data: {
        productsCount,
        categoriesCount,
        collaboratorsCount,
        featuredProductsCount,
      },
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return { success: false, error: 'Error al obtener estadísticas' }
  }
}
