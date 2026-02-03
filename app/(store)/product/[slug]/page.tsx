import { prisma } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import AddToCartButton from '@/components/AddToCartButton'

export default async function ProductPage({ params }: { params: { slug: string } }){
  const product = await prisma.product.findUnique({ where: { slug: params.slug }, include: { images: true } })
  if(!product) return <div>Not found</div>
  const img = product.images?.[0]?.url || '/placeholder.png'
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={product.name} className="w-full rounded" />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="text-primary text-xl font-semibold">{formatCurrency(Number(product.price))}</div>
        <p className="mt-4 text-slate-600">{product.description}</p>
        <div className="mt-6">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
