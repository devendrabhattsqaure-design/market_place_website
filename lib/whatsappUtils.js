export function generateWhatsAppLink(
  businessPhone,
  buyerName,
  buyerPhone,
  cartItems,
  businessName,
  totalAmount
) {
  const message = generateWhatsAppMessage(
    buyerName,
    buyerPhone,
    cartItems,
    businessName,
    totalAmount
  )

  const encodedMessage = encodeURIComponent(message)

  return `https://wa.me/${businessPhone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
}

export function generateWhatsAppMessage(
  buyerName,
  buyerPhone,
  cartItems,
  businessName,
  totalAmount
) {
  let message = `*New Order from ${buyerName}*\n\n`
  message += `*Business:* ${businessName}\n`
  message += `*Buyer Phone:* ${buyerPhone}\n\n`
  message += `*Order Details:*\n`
  message += `${'─'.repeat(30)}\n`

  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`
    message += `   Price: $${item.price.toFixed(2)} x ${item.quantity}\n`
    message += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`
  })

  message += `${'─'.repeat(30)}\n`
  message += `*Total Amount:* $${totalAmount.toFixed(2)}\n\n`

  return message
}

export function openWhatsAppChat(whatsappUrl) {
  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank')
  }
}