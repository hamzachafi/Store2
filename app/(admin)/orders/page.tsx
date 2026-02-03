import { prisma } from '@/lib/db'

export default async function AdminOrders(){
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { items: true, address: true } })
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="space-y-3">
        {orders.map(o=> (
          <div key={o.id} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Order {o.id.slice(0,8)}</div>
                <div className="text-sm text-slate-500">{o.email} • {o.status}</div>
              </div>
              <form action={`/api/admin/orders/${o.id}`} method="post">
                <select name="status" className="input">
                  {['PENDING','AWAITING_PAYMENT','PAID','SHIPPED','DELIVERED','CANCELLED','REFUNDED'].map(s=> <option key={s} value={s} selected={s===o.status}>{s}</option>)}
                </select>
                <button className="btn btn-outline ml-2">Update</button>
              </form>
            </div>
            <div className="mt-2 text-sm">
              {o.items.map(i=> (<div key={i.id}>{i.name} × {i.quantity} — {Number(i.price).toFixed(2)} MAD</div>))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
