import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function AdminContent(){
  const pages = await prisma.page.findMany({ include: { blocks: true } })
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Pages</h1>
        <Link href="/admin/content/new" className="btn btn-primary">New Page</Link>
      </div>
      <div className="space-y-2">
        {pages.map(pg=> (
          <div key={pg.id} className="flex items-center justify-between border p-3 rounded">
            <div>
              <div className="font-medium">{pg.title}</div>
              <div className="text-sm text-slate-500">/{pg.slug} • {pg.published ? 'Published' : 'Draft'}</div>
            </div>
            <Link className="btn btn-outline" href={`/admin/content/${pg.id}`}>Edit</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
