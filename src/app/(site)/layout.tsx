import { Inter } from 'next/font/google'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ProjectsProvider } from '@/contexts/projects'

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

