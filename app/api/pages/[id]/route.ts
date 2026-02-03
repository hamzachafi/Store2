import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { id: string } }){
  const { title, slug, published, blocks } = await req.json()
  // Simple approach: delete and recreate blocks
  await prisma.contentBlock.deleteMany({ where: { pageId: params.id } })
  const page = await prisma.page.update({ where: { id: params.id }, data: {
    title, slug, published,
    blocks: { create: (blocks||[]).map((b:any, i:number)=> ({ kind: b.kind, data: b.data, order: i })) }
  } })
  return NextResponse.json(page)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }){
  await prisma.page.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
