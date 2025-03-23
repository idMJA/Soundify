'use client';
import dynamic from 'next/dynamic';

// Use dynamic import for client-only components
const LavalinkPlayer = dynamic(
  () => import('../components/LavalinkPlayer'),
  { ssr: false }
);

// Client component wrapper
function ClientLavalinkPlayer() {
  return <LavalinkPlayer />;
}

// Server Component
export default function LavalinkDemoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Lavalink Music Player Demo</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <p className="text-gray-300 mb-6">
            This demo shows how to integrate Lavalink with Next.js using Shoukaku. 
            You can search for tracks and play them directly in the browser.
          </p>
          
          <ClientLavalinkPlayer />
        </div>
        
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Requirements</h2>
          <p className="text-gray-300 mb-4">
            To use this player, you need to have a Lavalink server running. Follow these steps:
          </p>
          
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>
              Download the latest Lavalink.jar file from 
              <a 
                href="https://github.com/lavalink-devs/Lavalink/releases" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 ml-1"
              >
                GitHub Releases
              </a>
            </li>
            <li>Create an application.yml file with your configuration</li>
            <li>Run the server using: java -jar Lavalink.jar</li>
            <li>Update your .env.local file with your Lavalink server details</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 