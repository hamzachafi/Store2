import { prisma } from '@/lib/db'

export default async function CMSPage({ params }: { params: { slug: string } }) {
  const page = await prisma.page.findUnique({ where: { slug: params.slug }, include: { blocks: true } })
  if (!page || !page.published) return <div>Not found</div>
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
      {page.blocks.sort((a,b)=>a.order-b.order).map(block => {
        const data: any = block.data
        if (block.kind === 'hero') return (
          <div key={block.id} className="card mb-4">
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="text-slate-600">{data.subtitle}</p>
          </div>
        )
        if (block.kind === 'richtext') return (
          <div key={block.id} className="prose" dangerouslySetInnerHTML={{ __html: data.html }} />
        )
        return <div key={block.id} />
      })}
    </div>
  )
}
