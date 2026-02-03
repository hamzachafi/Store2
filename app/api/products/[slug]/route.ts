import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { slug: string } }){
  const p = await prisma.product.findUnique({ where: { slug: params.slug }, include: { images: true } })
  if(!p) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(p)
}
