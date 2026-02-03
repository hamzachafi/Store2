'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function EditPage(){
  const params = useParams();
  const id = params?.id as string
  const [page, setPage] = useState<any>(null)

  useEffect(()=>{ (async()=>{
    const res = await fetch('/api/pages')
    const list = await res.json()
    const p = list.find((x:any)=> x.id === id)
    setPage(p)
  })() },[id])

  async function save(){
    await fetch(`/api/pages/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(page) })
    alert('Saved')
  }

  if(!page) return <div>Loading...</div>

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Edit Page</h1>
      <div className="space-y-3">
        <input className="input" value={page.title} onChange={e=>setPage({...page, title: e.target.value})} />
        <input className="input" value={page.slug} onChange={e=>setPage({...page, slug: e.target.value})} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={page.published} onChange={e=>setPage({...page, published: e.target.checked})} /> Published</label>
        <button onClick={save} className="btn btn-primary">Save</button>
      </div>
    </div>
  )
}
