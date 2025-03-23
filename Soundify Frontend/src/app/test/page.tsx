'use client';

import SoundifyPlayer from '../components/SoundifyPlayer';
import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <header className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Soundify Test Page</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Soundify Player Test</h2>
          <p className="text-gray-600 mb-4">
            This page is used to test the Soundify Player implementation that connects to our Java backend.
            Try searching for a song and playing it!
          </p>
        </div>
        
        <SoundifyPlayer />
      </main>
    </div>
  );
} 