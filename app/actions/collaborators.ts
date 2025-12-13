'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CollaboratorInput } from '@/lib/validations'

export async function getCollaborators() {
  try {
    const collaborators = await prisma.collaborator.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { success: true, data: collaborators }
  } catch (error) {
    console.error('Error fetching collaborators:', error)
    return { success: false, error: 'Error al obtener colaboradores' }
  }
}

export async function getCollaboratorById(id: string) {
  try {
    const collaborator = await prisma.collaborator.findUnique({
      where: { id },
    })
    return { success: true, data: collaborator }
  } catch (error) {
    console.error('Error fetching collaborator:', error)
    return { success: false, error: 'Error al obtener el colaborador' }
  }
}

export async function createCollaborator(data: CollaboratorInput) {
  try {
    const collaborator = await prisma.collaborator.create({
      data,
    })
    revalidatePath('/admin/collaborators')
    revalidatePath('/')
    return { success: true, data: collaborator }
  } catch (error) {
    console.error('Error creating collaborator:', error)
    return { success: false, error: 'Error al crear el colaborador' }
  }
}

export async function updateCollaborator(id: string, data: CollaboratorInput) {
  try {
    const collaborator = await prisma.collaborator.update({
      where: { id },
      data,
    })
    revalidatePath('/admin/collaborators')
    revalidatePath('/')
    return { success: true, data: collaborator }
  } catch (error) {
    console.error('Error updating collaborator:', error)
    return { success: false, error: 'Error al actualizar el colaborador' }
  }
}

export async function deleteCollaborator(id: string) {
  try {
    await prisma.collaborator.delete({
      where: { id },
    })
    revalidatePath('/admin/collaborators')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error deleting collaborator:', error)
    return { success: false, error: 'Error al eliminar el colaborador' }
  }
}
