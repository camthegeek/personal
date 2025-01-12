import AboutSection from '@/components/about/about-section';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me | camthegeek',
  description: 'Learn more about Cameron, a web developer with a passion for technology and creative problem-solving.',
}


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-logo-dp via-logo-gray to-logo-dp">
      <div className="container mx-auto px-4 py-16">
        <AboutSection />
      </div>
    </div>
  )
}

