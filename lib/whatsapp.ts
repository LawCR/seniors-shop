import { CartItem } from './cart-store'

interface OrderDetails {
  fullName: string
  dni: string
  items: CartItem[]
  total: number
  paymentMethod?: string
  address?: string
  city?: string
}

export function generateWhatsAppURL(order: OrderDetails): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '987654321'

  // Build the message
  let message = `¡Hola! Me gustaría realizar el siguiente pedido en *Manos de Vida*:\n\n`
  message += `*Datos del cliente:*\n`
  message += `Nombre: ${order.fullName}\n`
  message += `DNI: ${order.dni}\n`
  if (order.address) message += `Dirección: ${order.address}\n`
  if (order.city) message += `Ciudad: ${order.city}\n`
  message += `\n`

  message += `*Productos:*\n`
  order.items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`
    message += `   Cantidad: ${item.quantity}\n`
    message += `   Precio: S/ ${item.price.toFixed(2)}\n`
    message += `   Subtotal: S/ ${(item.price * item.quantity).toFixed(2)}\n\n`
  })

  message += `*Total a pagar: S/ ${order.total.toFixed(2)}*\n\n`

  if (order.paymentMethod && order.paymentMethod !== 'none') {
    message += `Método de pago: ${order.paymentMethod.toUpperCase()}\n`
  }

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message)

  // Return WhatsApp URL
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}
