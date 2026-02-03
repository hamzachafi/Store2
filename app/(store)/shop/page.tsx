import { prisma } from '@/lib/db'
import ProductCard from '@/components/ProductCard'

export default async function ShopPage(){
  const products = await prisma.product.findMany({ where: { active: true }, include: { images: true } })
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
