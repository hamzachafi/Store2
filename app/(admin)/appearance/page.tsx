'use client'
import { useEffect, useState } from 'react'
import ColorPicker from '@/components/ColorPicker'
import FileUpload from '@/components/FileUpload'

export default function AppearancePage(){
  const [settings, setSettings] = useState<any>(null)

  async function load(){
    const res = await fetch('/api/admin/settings')
    setSettings(await res.json())
  }
  useEffect(()=>{ load() },[])

  async function save(){
    await fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) })
    alert('Saved!')
  }

  if(!settings) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Appearance</h1>
      <div className="space-y-4 max-w-xl">
        <label className="flex items-center gap-3">
          <span className="w-40">Site Name</span>
          <input className="input" value={settings.siteName} onChange={e=>setSettings({...settings, siteName: e.target.value})} />
        </label>
        <ColorPicker label="Primary color" value={settings.primaryColor} onChange={v=>setSettings({...settings, primaryColor: v})} />
        <ColorPicker label="Secondary color" value={settings.secondaryColor} onChange={v=>setSettings({...settings, secondaryColor: v})} />
        <div className="flex items-center gap-3">
          <span className="w-40">Logo</span>
          <FileUpload onUploaded={(url)=> setSettings({...settings, logoUrl: url})} />
          {settings.logoUrl && <img src={settings.logoUrl} alt="logo" className="h-10" />}
        </div>
        <button className="btn btn-primary" onClick={save}>Save</button>
      </div>
    </div>
  )
}
