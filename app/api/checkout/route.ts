import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request){
  const { cartItems, address, email, paymentMethod } = await req.json()
  // Fetch products
  const ids = cartItems.map((i:any)=> i.productId)
  const products = await prisma.product.findMany({ where: { id: { in: ids }, active: true } })
  let subtotal = 0
  const items = cartItems.map((ci:any)=>{
    const p = products.find(pp=> pp.id === ci.productId)!;
    const row = Number(p.price) * ci.quantity
    subtotal += row
    return { productId: p.id, name: p.name, price: p.price, quantity: ci.quantity }
  })
  const total = subtotal

  const order = await prisma.order.create({
    data: {
      email,
      total,
      status: 'AWAITING_PAYMENT',
      items: { create: items },
      address: { create: address }
    }
  })

  await prisma.payment.create({ data: { orderId: order.id, method: 'cod', amount: total, currency: 'MAD', status: 'PENDING' } })

  return NextResponse.json({ orderId: order.id, next: `/checkout/success?oid=${order.id}` })
}
