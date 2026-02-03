'use client'
import { useState } from 'react'

export default function FileUpload({ onUploaded }: { onUploaded: (url: string)=>void }) {
  const [loading, setLoading] = useState(false)
  async function onChange(e: any){
    const f = e.target.files?.[0]
    if(!f) return
    const fd = new FormData()
    fd.append('file', f)
    setLoading(true)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      onUploaded(data.url)
    } finally {
      setLoading(false)
    }
  }
  return <input type="file" onChange={onChange} disabled={loading} />
}
