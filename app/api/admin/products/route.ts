import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(){
  const list = await prisma.product.findMany({ include: { images: true, category: true } })
  return NextResponse.json(list)
}

export async function POST(req: Request){
  const body = await req.json()
  const p = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      price: body.price,
      stock: body.stock,
      categoryId: body.categoryId || undefined,
      images: { create: (body.images||[]).map((i:any)=>({ url: i.url, alt: i.alt })) }
    }
  })
  return NextResponse.json(p)
}
