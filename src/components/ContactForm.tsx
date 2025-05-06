import React, { useState } from 'react';

interface ContactFormProps {
  onSuccess: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to send message.');
      } else {
        onSuccess();
      }
    } catch (err) {
        console.error('Error sending message:', err);
      setError('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-lg flex flex-col gap-4 mx-auto" onSubmit={handleSubmit} autoComplete="off">
      {/* Honeypot field for bots */}
      <input
        type="text"
        name="website"
        value={form.website || ''}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="flex gap-2 flex-col sm:flex-row">
        <input
          className="flex-1 p-2 rounded bg-logo-gray text-logo-yellow placeholder-logo-yellow/60 border border-logo-mul focus:ring-2 focus:ring-logo-yellow"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          className="flex-1 p-2 rounded bg-logo-gray text-logo-yellow placeholder-logo-yellow/60 border border-logo-mul focus:ring-2 focus:ring-logo-yellow"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <input
        className="p-2 rounded bg-logo-gray text-logo-yellow placeholder-logo-yellow/60 border border-logo-mul focus:ring-2 focus:ring-logo-yellow"
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        className="p-2 rounded bg-logo-gray text-logo-yellow placeholder-logo-yellow/60 border border-logo-mul focus:ring-2 focus:ring-logo-yellow"
        name="phone"
        type="tel"
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={handleChange}
      />
      <textarea
        className="p-2 rounded bg-logo-gray text-logo-yellow placeholder-logo-yellow/60 border border-logo-mul min-h-[80px] focus:ring-2 focus:ring-logo-yellow"
        name="message"
        placeholder="Your message"
        value={form.message}
        onChange={handleChange}
        required
      />
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <button
        type="submit"
        className={`mt-2 p-2 rounded font-bold transition-colors border border-logo-yellow ${loading ? 'bg-logo-mul text-logo-yellow' : 'bg-logo-yellow text-logo-dp2 hover:bg-logo-mul hover:text-logo-yellow'}`}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
