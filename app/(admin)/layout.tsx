import AdminNav from '@/components/AdminNav'
import { requireAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }){
  if (!requireAdmin()) redirect('/admin-login')
  return (
    <div className="flex min-h-[70vh]">
      <AdminNav />
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}
