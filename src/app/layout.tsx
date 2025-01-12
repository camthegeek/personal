import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "camthegeek | Cameron Chadwell | geek. dev. crypto.",
  description: "camthegeek (Cameron Chadwell) is a software engineer, web developer, and blockchain enthusiast.",
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

