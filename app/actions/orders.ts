'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Client Actions
export async function getClientByDni(dni: string) {
  try {
    const client = await prisma.client.findUnique({
      where: { dni },
    })
    return { success: true, data: client }
  } catch (error) {
    console.error('Error fetching client:', error)
    return { success: false, error: 'Error al buscar cliente' }
  }
}

// Product Search Action
export async function searchProducts(query: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
        stock: {
          gt: 0
        }
      },
      take: 10,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        images: true,
      }
    })
    return { success: true, data: products }
  } catch (error) {
    console.error('Error searching products:', error)
    return { success: false, error: 'Error al buscar productos' }
  }
}

// Order Creation Action
const orderSchema = z.object({
  client: z.object({
    fullName: z.string().min(2),
    dni: z.string().length(8),
    phone: z.string().min(9),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    price: z.number(),
  })),
  total: z.number(),
})

export async function createManualOrder(data: z.infer<typeof orderSchema>) {
  try {
    const validation = orderSchema.safeParse(data)
    if (!validation.success) {
      return { success: false, error: 'Datos inválidos' }
    }

    const { client: clientData, items, total } = validation.data

    const result = await prisma.$transaction(async (tx) => {
      // 1. Find or Create Client
      let client = await tx.client.findUnique({
        where: { dni: clientData.dni },
      })

      if (!client) {
        client = await tx.client.create({
          data: clientData,
        })
      } else {
        // Optional: Update client info if provided? For now, we keep existing.
      }

      // 2. Create Order
      const order = await tx.order.create({
        data: {
          clientId: client.id,
          total,
          status: 'completed', // Since it's manual entry of a completed sale
          items: {
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            }))
          }
        }
      })

      // 3. Update Stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      }

      return order
    })

    revalidatePath('/admin/orders')
    revalidatePath('/admin/products')
    return { success: true, data: result }
  } catch (error) {
    console.error('Error creating manual order:', error)
    return { success: false, error: 'Error al registrar la orden' }
  }
}

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        client: true,
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return { success: true, data: orders }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return { success: false, error: 'Error al obtener órdenes' }
  }
}
