'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function getClients() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { orders: true }
        }
      }
    })
    return { success: true, data: clients }
  } catch (error) {
    console.error('Error getting clients:', error)
    return { success: false, error: 'Error al obtener clientes' }
  }
}

export async function getClientById(id: string) {
  try {
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
          include: {
            items: {
              include: {
                product: true
              }
            }
          }
        }
      }
    })
    return { success: true, data: client }
  } catch (error) {
    console.error('Error getting client:', error)
    return { success: false, error: 'Error al obtener cliente' }
  }
}

const updateClientSchema = z.object({
  fullName: z.string().min(2, "El nombre es requerido"),
  phone: z.string().min(9, "El teléfono es requerido"),
  address: z.string().optional(),
  city: z.string().optional(),
})

export async function updateClient(id: string, data: z.infer<typeof updateClientSchema>) {
  try {
    const validated = updateClientSchema.parse(data)
    await prisma.client.update({
      where: { id },
      data: validated
    })
    revalidatePath('/admin/clients')
    revalidatePath(`/admin/clients/${id}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating client:', error)
    return { success: false, error: 'Error al actualizar cliente' }
  }
}
