import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function AdminProducts(){
  const products = await prisma.product.findMany({ include: { images: true, category: true } })
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="btn btn-primary">New Product</Link>
      </div>
      <div className="space-y-2">
        {products.map(p=> (
          <div key={p.id} className="flex items-center justify-between border rounded p-3">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-slate-500">{p.category?.name || 'Uncategorized'} • {Number(p.price).toFixed(2)} MAD • Stock {p.stock}</div>
            </div>
            <div className="flex items-center gap-2">
              <Link className="btn btn-outline" href={`/admin/products/${p.id}`}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
