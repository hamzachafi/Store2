'use client'
import { useEffect, useState } from 'react'

export default function CheckoutPage(){
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState({
    fullName: '', phone: '', line1: '', line2: '', city: '', region: '', country: 'Morocco', postal: '', email: ''
  })
  useEffect(()=>{
    const saved = localStorage.getItem('cart')
    if(saved) setItems(JSON.parse(saved))
  },[])
  async function placeOrder(){
    const cartItems = items.map(i=> ({ productId: i.id, quantity: i.qty }))
    const res = await fetch('/api/checkout', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems, address: form, email: form.email, paymentMethod: 'cod' })
    })
    const data = await res.json()
    if(data.orderId){
      localStorage.removeItem('cart')
      window.location.href = `/checkout/success?oid=${data.orderId}`
    }
  }
  const total = items.reduce((s, it)=> s + (it.price * it.qty), 0)
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Checkout (COD)</h1>
        <div className="space-y-3">
          <input className="input" placeholder="Full Name" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} />
          <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
          <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <input className="input" placeholder="Address line 1" value={form.line1} onChange={e=>setForm({...form, line1:e.target.value})} />
          <input className="input" placeholder="Address line 2" value={form.line2} onChange={e=>setForm({...form, line2:e.target.value})} />
          <div className="grid grid-cols-2 gap-3">
            <input className="input" placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
            <input className="input" placeholder="Region" value={form.region} onChange={e=>setForm({...form, region:e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input className="input" placeholder="Postal" value={form.postal} onChange={e=>setForm({...form, postal:e.target.value})} />
            <input className="input" placeholder="Country" value={form.country} onChange={e=>setForm({...form, country:e.target.value})} />
          </div>
          <button onClick={placeOrder} className="btn btn-primary">Place order (COD)</button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        <div className="space-y-2">
          {items.map(it=> (
            <div key={it.id} className="flex justify-between">
              <span>{it.name} × {it.qty}</span>
              <span>{(it.price * it.qty).toFixed(2)} MAD</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total</span>
            <span>{total.toFixed(2)} MAD</span>
          </div>
        </div>
      </div>
    </div>
  )
}
