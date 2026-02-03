import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(){
  const s = await prisma.settings.findFirst()
  return NextResponse.json(s)
}

export async function PATCH(req: Request){
  const data = await req.json()
  const s = await prisma.settings.upsert({ where: { id: 1 }, update: data, create: { id: 1, ...data } })
  return NextResponse.json(s)
}
