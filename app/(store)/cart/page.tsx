'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

export default function CartPage(){
  const [items, setItems] = useState<any[]>([])
  useEffect(()=>{
    const saved = localStorage.getItem('cart')
    if(saved) setItems(JSON.parse(saved))
  },[])
  const total = items.reduce((s, it)=> s + (it.price * it.qty), 0)
  function remove(id: string){
    const next = items.filter(i=>i.id !== id)
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {items.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div className="space-y-3">
          {items.map(it=> (
            <div key={it.id} className="flex items-center justify-between border p-3 rounded">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-slate-600">{formatCurrency(it.price)} × {it.qty}</div>
              </div>
              <button onClick={()=>remove(it.id)} className="btn btn-outline">Remove</button>
            </div>
          ))}
          <div className="text-right font-semibold">Total: {formatCurrency(total)}</div>
          <div className="text-right">
            <Link href="/checkout" className="btn btn-primary">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}
