import { Metadata } from 'next';
import GameForm from '@/components/game-contact';

export const metadata: Metadata = {
  title: 'Contact Me | camthegeek',
  description: 'Connect with me through the contact form and let\'s discuss your project ideas or any questions you may have.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-logo-dp via-logo-gray to-logo-dp flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
        <GameForm />       
      </div>
    </div>
  );
}
