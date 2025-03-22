import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Mock data for featured playlists
  const featuredPlaylists = [
    {
      id: "1",
      title: "Today's Top Hits",
      description: "Rema & Selena Gomez are on top of the Hottest 50!",
      coverImage: "/playlist-covers/todays-top-hits.jpg",
      tracks: 50,
    },
    {
      id: "2",
      title: "RapCaviar",
      description: "New music from Drake, Gunna and Lil Durk.",
      coverImage: "/playlist-covers/rapcaviar.jpg",
      tracks: 50,
    },
    {
      id: "3",
      title: "All Out 2010s",
      description: "The biggest songs of the 2010s.",
      coverImage: "/playlist-covers/all-out-2010s.jpg",
      tracks: 100,
    },
    {
      id: "4",
      title: "Rock Classics",
      description: "Rock legends & epic songs that continue to inspire generations.",
      coverImage: "/playlist-covers/rock-classics.jpg",
      tracks: 75,
    },
  ];

  // Mock data for genres
  const genres = [
    { id: "1", name: "Pop", color: "from-pink-600 to-purple-600", image: "/genres/pop.jpg" },
    { id: "2", name: "Hip-Hop", color: "from-yellow-500 to-orange-500", image: "/genres/hiphop.jpg" },
    { id: "3", name: "Rock", color: "from-red-600 to-red-800", image: "/genres/rock.jpg" },
    { id: "4", name: "Electronic", color: "from-blue-400 to-indigo-500", image: "/genres/electronic.jpg" },
    { id: "5", name: "R&B", color: "from-purple-500 to-indigo-700", image: "/genres/rnb.jpg" },
    { id: "6", name: "Indie", color: "from-teal-400 to-emerald-500", image: "/genres/indie.jpg" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/soundify-logo.svg" 
              alt="Soundify Logo" 
              width={34} 
              height={34} 
              className="dark:filter dark:invert"
              priority
            />
            <h1 className="text-xl font-bold">Soundify</h1>
          </Link>
          
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/discover" className="text-sm font-medium hover:text-primary transition-colors">Browse</Link>
            <Link href="/library" className="text-sm font-medium hover:text-primary transition-colors">Library</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <a href="/player" className="hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Web Player
            </a>
            <Link href="/player" className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/20 to-background pt-16 pb-24 px-4 md:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Music for everyone.</h2>
                <p className="text-lg md:text-xl text-foreground/70 mb-8">Millions of songs. No credit card needed.</p>
                <div className="flex gap-4">
                  <Link href="/player" className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all">
                    Get Soundify Free
                  </Link>
                </div>
              </div>
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full opacity-30 blur-2xl"></div>
                <div className="relative z-10 vinyl-spin">
                  <Image
                    src="/vinyl-record.png"
                    alt="Vinyl Record"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Playlists */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {featuredPlaylists.map((playlist) => (
                <Link 
                  key={playlist.id}
                  href={`/player?playlist=${playlist.id}`}
                  className="bg-card rounded-lg p-4 hover-card group"
                >
                  <div className="relative w-full aspect-square mb-4 rounded-md overflow-hidden shadow-lg">
                    <Image
                      src={playlist.coverImage}
                      alt={playlist.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold truncate">{playlist.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{playlist.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Genres */}
        <section className="py-12 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">Browse by Genre</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {genres.map((genre) => (
                <Link 
                  key={genre.id}
                  href={`/genre/${genre.id}`}
                  className="relative overflow-hidden rounded-lg aspect-square hover-card transition-all"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-80`}></div>
                  <Image
                    src={genre.image}
                    alt={genre.name}
                    fill
                    className="object-cover mix-blend-overlay"
                  />
                  <div className="absolute inset-0 p-4 flex items-end">
                    <h3 className="font-bold text-white text-xl">{genre.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-10 text-center">Why Choose Soundify?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Unlimited Music</h3>
                <p className="text-muted-foreground">Listen to millions of songs for free, without any limitations or subscriptions.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">High Quality</h3>
                <p className="text-muted-foreground">Enjoy crystal clear audio with our high-quality streaming technology.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M21 15V6"></path>
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                    <path d="M12 12H3"></path>
                    <path d="M16 6H3"></path>
                    <path d="M12 18H3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Playlists & Discovery</h3>
                <p className="text-muted-foreground">Create your own playlists and discover new music tailored to your taste.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start listening?</h2>
            <p className="text-lg mb-8 opacity-90">Join millions of users and enjoy unlimited music streaming with Soundify.</p>
            <Link href="/player" className="inline-flex items-center gap-2 bg-white text-accent px-8 py-3 rounded-full font-medium transition-colors hover:bg-opacity-90">
              Open Web Player
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image 
                  src="/soundify-logo.svg" 
                  alt="Soundify Logo" 
                  width={28} 
                  height={28} 
                  className="dark:filter dark:invert"
                />
                <h3 className="text-lg font-bold">Soundify</h3>
              </Link>
              <p className="text-muted-foreground text-sm">© 2023 Soundify. All rights reserved.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                  <li><Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">Jobs</Link></li>
                  <li><Link href="/press" className="text-muted-foreground hover:text-foreground transition-colors">Press</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Communities</h4>
                <ul className="space-y-2">
                  <li><Link href="/artists" className="text-muted-foreground hover:text-foreground transition-colors">For Artists</Link></li>
                  <li><Link href="/developers" className="text-muted-foreground hover:text-foreground transition-colors">Developers</Link></li>
                  <li><Link href="/brands" className="text-muted-foreground hover:text-foreground transition-colors">Brands</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Useful Links</h4>
                <ul className="space-y-2">
                  <li><Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">Help</Link></li>
                  <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
                  <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-4">
              <a href="https://instagram.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://twitter.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://facebook.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="mobile-nav py-2 px-4 md:hidden">
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center text-xs text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </Link>
          <Link href="/discover" className="flex flex-col items-center text-xs text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Search</span>
          </Link>
          <Link href="/library" className="flex flex-col items-center text-xs text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m16 6 4 14"></path>
              <path d="M12 6v14"></path>
              <path d="M8 8v12"></path>
              <path d="M4 4v16"></path>
            </svg>
            <span>Library</span>
          </Link>
          <Link href="/player" className="flex flex-col items-center text-xs text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
            <span>Player</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
