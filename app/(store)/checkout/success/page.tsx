import Link from 'next/link'

export default function SuccessPage(){
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">Order received!</h1>
      <p className="text-slate-600">Thank you for your purchase. You chose Cash on Delivery.</p>
      <Link className="btn btn-primary mt-6 inline-block" href="/shop">Continue shopping</Link>
    </div>
  )
}
