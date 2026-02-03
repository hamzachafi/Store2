import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { id: string } }){
  const body = await req.json()
  const p = await prisma.product.update({ where: { id: params.id }, data: {
    name: body.name,
    slug: body.slug,
    description: body.description,
    price: body.price,
    stock: body.stock,
    active: body.active
  }})
  return NextResponse.json(p)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }){
  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
