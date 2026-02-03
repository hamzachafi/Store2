'use client'
export default function ColorPicker({ label, value, onChange }: { label: string, value: string, onChange: (v:string)=>void }) {
  return (
    <label className="flex items-center gap-3">
      <span className="w-40">{label}</span>
      <input type="color" value={value} onChange={e=>onChange(e.target.value)} />
      <input type="text" value={value} onChange={e=>onChange(e.target.value)} className="input" />
    </label>
  )
}
