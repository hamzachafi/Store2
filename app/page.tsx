import { prisma } from '@/lib/db'
import ProductCard from '@/components/ProductCard'

export default async function HomePage(){
  const products = await prisma.product.findMany({ where: { active: true }, take: 8, include: { images: true } })
  return (
    <div className="space-y-8">
      <section className="card">
        <h1 className="text-2xl font-bold">Welcome to store2</h1>
        <p className="text-slate-600">Modern e‑commerce with Cash on Delivery (COD)</p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Featured Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p=> <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
