import Link from 'next/link'

export default function AdminNav() {
  return (
    <aside className="w-56 border-r border-slate-200 p-4 space-y-2">
      <div className="font-semibold mb-2">Admin</div>
      <nav className="flex flex-col gap-2">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/orders">Orders</Link>
        <Link href="/admin/content">Pages</Link>
        <Link href="/admin/appearance">Appearance</Link>
        <Link href="/admin/settings">Settings</Link>
      </nav>
    </aside>
  )
}
