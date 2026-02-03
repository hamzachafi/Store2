'use client'
import { useEffect, useState } from 'react'

export default function SettingsPage(){
  const [settings, setSettings] = useState<any>(null)
  useEffect(()=>{ (async()=>{ const r=await fetch('/api/admin/settings'); setSettings(await r.json()) })() },[])
  async function save(){
    await fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) })
    alert('Saved!')
  }
  if(!settings) return <div>Loading...</div>
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-3 max-w-xl">
        <label className="flex items-center gap-3"><span className="w-40">Currency</span><input className="input" value={settings.currency} onChange={e=>setSettings({...settings, currency: e.target.value})} /></label>
        <label className="flex items-center gap-3"><span className="w-40">Enable COD</span><input type="checkbox" checked={settings.codEnabled} onChange={e=>setSettings({...settings, codEnabled: e.target.checked})} /></label>
        <button className="btn btn-primary" onClick={save}>Save</button>
      </div>
    </div>
  )
}
