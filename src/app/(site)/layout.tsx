import { Inter } from 'next/font/google'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-logo-dp ${inter.className}`}>
      <Nav />
      <main className="pt-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}

