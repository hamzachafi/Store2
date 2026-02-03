'use client'
import { useState } from 'react'

export default function NewPage(){
  const [form, setForm] = useState<any>({ title: '', slug: '', blocks: [] })
  async function save(){
    const res = await fetch('/api/pages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if(res.ok) window.location.href = '/admin/content'
  }
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">New Page</h1>
      <div className="space-y-3">
        <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
        <input className="input" placeholder="Slug" value={form.slug} onChange={e=>setForm({...form, slug: e.target.value})} />
        <button className="btn btn-primary" onClick={save}>Create</button>
      </div>
    </div>
  )
}
