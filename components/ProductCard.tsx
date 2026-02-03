import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'

export default function ProductCard({ product }: { product: any }) {
  const img = product.images?.[0]?.url || '/placeholder.png'
  return (
    <Link href={"/product/" + product.slug} className="card block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={product.name} className="w-full h-48 object-cover rounded" />
      <div className="mt-3">
        <div className="font-medium">{product.name}</div>
        <div className="text-primary font-semibold">{formatCurrency(Number(product.price))}</div>
      </div>
    </Link>
  )
}
