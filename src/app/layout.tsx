import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Developer Portfolio",
  description: "Full-stack developer specializing in web applications and e-commerce solutions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-logo-dp">
          {children}
        </div>
      </body>
    </html>
  )
}

