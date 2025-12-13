'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CategoryInput } from '@/lib/validations'

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
    return { success: true, data: categories }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { success: false, error: 'Error al obtener categorías' }
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    })
    return { success: true, data: category }
  } catch (error) {
    console.error('Error fetching category:', error)
    return { success: false, error: 'Error al obtener la categoría' }
  }
}

export async function createCategory(data: CategoryInput) {
  try {
    const category = await prisma.category.create({
      data,
    })
    revalidatePath('/admin/categories')
    revalidatePath('/catalog')
    return { success: true, data: category }
  } catch (error) {
    console.error('Error creating category:', error)
    return { success: false, error: 'Error al crear la categoría' }
  }
}

export async function updateCategory(id: string, data: CategoryInput) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data,
    })
    revalidatePath('/admin/categories')
    revalidatePath('/catalog')
    return { success: true, data: category }
  } catch (error) {
    console.error('Error updating category:', error)
    return { success: false, error: 'Error al actualizar la categoría' }
  }
}

export async function deleteCategory(id: string) {
  try {
    // Check if category has products
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })

    if (category && category._count.products > 0) {
      return {
        success: false,
        error: 'No se puede eliminar una categoría con productos asociados'
      }
    }

    await prisma.category.delete({
      where: { id },
    })
    revalidatePath('/admin/categories')
    revalidatePath('/catalog')
    return { success: true }
  } catch (error) {
    console.error('Error deleting category:', error)
    return { success: false, error: 'Error al eliminar la categoría' }
  }
}
