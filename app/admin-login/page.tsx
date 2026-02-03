'use client'
import { useState } from 'react'

export default function AdminLogin(){
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')
  async function login(){
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pwd }) })
    if(res.ok) window.location.href = '/admin'
    else setError('Invalid password')
  }
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input className="input" type="password" placeholder="Password" value={pwd} onChange={e=>setPwd(e.target.value)} />
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      <button onClick={login} className="btn btn-primary mt-3">Login</button>
    </div>
  )
}
