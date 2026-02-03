'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { languages, defaultLang } from '@/lib/i18n'

export default function Header({ logoUrl, siteName }: { logoUrl?: string|null, siteName?: string }) {
  const [lang, setLang] = useState<string>('en')
  useEffect(()=>{
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
    if (saved) setLang(saved)
  },[])
  useEffect(()=>{
    if (typeof window !== 'undefined') localStorage.setItem('lang', lang)
  },[lang])
  return (
    <header className="border-b border-slate-200">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="logo" className="h-8 w-auto" />
          ) : (
            <div className="h-8 w-8 rounded bg-primary" />
          )}
          <span className="font-semibold">{siteName || 'store2'}</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/pages/about">About</Link>
          <Link href="/admin-login" className="text-xs underline">Admin</Link>
          <select value={lang} onChange={e=>setLang(e.target.value)} className="border rounded px-2 py-1 text-sm">
            {languages.map(l=> <option key={l} value={l}>{l.toUpperCase()}</option>)}
          </select>
        </nav>
      </div>
    </header>
  )
}
