'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ContactForm from '@/components/ContactForm';
const RunnerGame = dynamic(() => import('@/components/RunnerGame'), { ssr: false });


export default function GameForm() {
const [gameEnded, setGameEnded] = useState(false);
const [formSuccess, setFormSuccess] = useState(false);

return (<>
{!gameEnded ? (
    <>
      <h1 className="text-3xl font-bold mb-4">Contact Me — Play to Unlock!</h1>
      <RunnerGame onGameEnd={() => setGameEnded(true)} />
    </>
  ) : formSuccess ? (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-logo-yellow mb-2">Thank you!</h2>
      <p className="mb-4 text-logo-yellow">Your message was sent successfully.</p>
      <button
        className="px-4 py-2 rounded bg-logo-yellow text-logo-dp2 font-bold mt-2 hover:bg-logo-mul hover:text-logo-yellow transition-colors"
        onClick={() => window.location.reload()}
      >
        Play Again
      </button>
    </div>
  ) : (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-logo-yellow mb-2">You helped Cam escape the city!</h2>
        <p className="text-logo-yellow">Now that Cam is safe in the countryside, maybe Cam can help you too. Fill out the form below and let&apos;s connect!</p>
      </div>
      <ContactForm onSuccess={() => setFormSuccess(true)} />
    </div>
  )}
  </>
)}