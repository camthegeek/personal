import { Facebook, DiscIcon as Discord, Twitter, Github } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-logo-dp text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Connect with me</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400"><Facebook size={24} /></a>
              <a href="#" className="hover:text-yellow-400"><Discord size={24} /></a>
              <a href="#" className="hover:text-yellow-400"><Twitter size={24} /></a>
              <a href="#" className="hover:text-yellow-400"><Github size={24} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Site Map</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
              <li><Link href="#about" className="hover:text-yellow-400">About</Link></li>
              <li><Link href="#projects" className="hover:text-yellow-400">Projects</Link></li>
              <li><Link href="#skills" className="hover:text-yellow-400">Skills</Link></li>
              <li><Link href="#contact" className="hover:text-yellow-400">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 camthegeek. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

