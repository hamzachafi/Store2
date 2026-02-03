import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: Request){
  const form = await req.formData()
  const file = form.get('file') as File | null
  if(!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filename = `${Date.now()}-${file.name}`
  const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
  await writeFile(filepath, buffer)
  return NextResponse.json({ url: `/uploads/${filename}` })
}
