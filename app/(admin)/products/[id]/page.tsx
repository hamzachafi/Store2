'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function EditProduct(){
  const params = useParams();
  const id = params?.id as string
  const [form, setForm] = useState<any>(null)

  useEffect(()=>{ (async()=>{
    const res = await fetch('/api/admin/products')
    const list = await res.json()
    const p = list.find((x:any)=> x.id === id)
    setForm(p)
  })() },[id])

  async function save(){
    const res = await fetch(`/api/admin/products/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if(res.ok) window.location.href = '/admin/products'
  }

  if(!form) return <div>Loading...</div>

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <div className="space-y-3">
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input className="input" placeholder="Slug" value={form.slug} onChange={e=>setForm({...form, slug:e.target.value})} />
        <input className="input" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} />
        <input className="input" placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form, stock:Number(e.target.value)})} />
        <textarea className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <button className="btn btn-primary" onClick={save}>Save</button>
      </div>
    </div>
  )
}
