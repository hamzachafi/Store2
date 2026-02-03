import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(){
  const pages = await prisma.page.findMany({ include: { blocks: true } })
  return NextResponse.json(pages)
}

export async function POST(req: Request){
  const { title, slug, blocks } = await req.json()
  const page = await prisma.page.create({ data: { title, slug, blocks: { create: (blocks||[]).map((b:any, i:number)=> ({ kind: b.kind, data: b.data, order: i })) } } })
  return NextResponse.json(page)
}
