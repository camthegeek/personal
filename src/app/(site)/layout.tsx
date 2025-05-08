import { Inter } from 'next/font/google'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ProjectsProvider } from '@/contexts/projects'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "camthegeek | Cameron Chadwell | geek. dev. crypto.",
  description: "camthegeek (Cameron Chadwell) is a software engineer, web developer, and blockchain enthusiast.",
}
const inter = Inter({ subsets: ["latin"] })

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProjectsProvider>
      <div className={`min-h-screen bg-logo-dp ${inter.className}`}>
        <Nav />
        <main className="pt-10">
          {children}
        </main>
        <Footer />
      </div>
    </ProjectsProvider>
  )
}

