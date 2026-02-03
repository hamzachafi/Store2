import './globals.css'
import { prisma } from '@/lib/db'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'store2',
  description: 'E‑commerce with COD',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.settings.findFirst()
  const vars: React.CSSProperties = {
    ['--color-primary' as any]: settings?.primaryColor || '#1d4ed8',
    ['--color-secondary' as any]: settings?.secondaryColor || '#0ea5e9'
  }
  return (
    <html lang="en">
      <body style={vars}>
        <Header logoUrl={settings?.logoUrl} siteName={settings?.siteName} />
        <main className="container py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
