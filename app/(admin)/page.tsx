import { prisma } from '@/lib/db'

export default async function AdminDashboard(){
  const orders = await prisma.order.count()
  const products = await prisma.product.count()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card"><div className="text-slate-500">Orders</div><div className="text-2xl font-semibold">{orders}</div></div>
        <div className="card"><div className="text-slate-500">Products</div><div className="text-2xl font-semibold">{products}</div></div>
        <div className="card"><div className="text-slate-500">Currency</div><div className="text-2xl font-semibold">MAD</div></div>
      </div>
    </div>
  )
}
