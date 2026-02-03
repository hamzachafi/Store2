'use client'
export default function AddToCartButton({ product }: { product: any }){
  function add(){
    const saved = localStorage.getItem('cart')
    const cart = saved ? JSON.parse(saved) : []
    const idx = cart.findIndex((i:any)=> i.id === product.id)
    if(idx>=0) cart[idx].qty += 1
    else cart.push({ id: product.id, slug: product.slug, name: product.name, price: Number(product.price), qty: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }
  return <button onClick={add} className="btn btn-primary">Add to cart</button>
}
