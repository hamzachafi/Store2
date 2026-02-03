import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { id: string } }){
  const form = await req.formData()
  const status = form.get('status') as any
  const o = await prisma.order.update({ where: { id: params.id }, data: { status } })
  return NextResponse.json(o)
}
