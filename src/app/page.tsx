"use client";

import { useEffect, useMemo, useState } from "react";

const clubs = [
  {
    id: "1",
    name: "Sky Club",
    location: "Paris",
    genre: "House",
    image:
      "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "2",
    name: "Neon Nights",
    location: "Berlin",
    genre: "Techno",
    image:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "3",
    name: "Velvet Room",
    location: "London",
    genre: "Hip-Hop",
    image:
      "https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const songResults = [
  {
    title: "Midnight Groove",
    artist: "DJ Nova",
    match: "Sky Club",
  },
  {
    title: "Dark Pulse",
    artist: "TechnoX",
    match: "Neon Nights",
  },
  {
    title: "Street Flow",
    artist: "MC Blaze",
    match: "Velvet Room",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState("All");
  const [isListening, setIsListening] = useState(false);
  const [songFound, setSongFound] = useState<null | {
    title: string;
    artist: string;
    match: string;
  }>(null);

  useEffect(() => {
    const saved = localStorage.getItem("clubvibe-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  function toggleFavorite(id: string) {
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("clubvibe-favorites", JSON.stringify(updated));
  }

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(search.toLowerCase()) ||
        club.location.toLowerCase().includes(search.toLowerCase()) ||
        club.genre.toLowerCase().includes(search.toLowerCase());

      const matchesGenre =
        activeGenre === "All" || club.genre === activeGenre;

      return matchesSearch && matchesGenre;
    });
  }, [search, activeGenre]);

  function recommendClub() {
    const pool = filteredClubs.length > 0 ? filteredClubs : clubs;
    const choice = pool[Math.floor(Math.random() * pool.length)];
    setRecommendation(
      `${choice.name} in ${choice.location} — perfect for a ${choice.genre} vibe tonight.`
    );
  }

  function handleSongFinder() {
    setIsListening(true);
    setSongFound(null);

    setTimeout(() => {
      const result =
        songResults[Math.floor(Math.random() * songResults.length)];
      setSongFound(result);
      setIsListening(false);
    }, 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-purple-950 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">ClubVibe 🎧</h1>
            <p className="mt-1 text-sm text-gray-400">
              Discover clubs, preview the vibe, and find your night.
            </p>
          </div>

          <a
            href="/favorites"
            className="rounded-xl bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700 transition"
          >
            Favorites ❤️
          </a>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="text"
            placeholder="Search clubs, cities, or genres..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-zinc-800 p-3 text-white outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={recommendClub}
            className="rounded-xl bg-purple-600 px-4 py-3 font-medium hover:bg-purple-500 transition"
          >
            Best club for tonight ✨
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {["All", "House", "Techno", "Hip-Hop"].map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`rounded-full px-4 py-2 text-sm transition ${activeGenre === genre
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="mb-6 rounded-2xl border border-purple-500/20 bg-zinc-900/70 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Song Finder 🎤</h2>
              <p className="mt-1 text-sm text-gray-400">
                Tap below to identify the vibe around you and match it to a club.
              </p>
            </div>

            <button
              onClick={handleSongFinder}
              disabled={isListening}
              className="rounded-xl bg-pink-600 px-5 py-3 font-medium hover:bg-pink-500 transition disabled:opacity-60"
            >
              {isListening ? "Listening..." : "Identify Song"}
            </button>
          </div>

          {isListening && (
            <div className="mt-4 rounded-xl bg-zinc-800 p-4 text-sm text-pink-200">
              🎧 Listening to the environment and analyzing the music...
            </div>
          )}

          {songFound && (
            <div className="mt-4 rounded-xl bg-zinc-800 p-4">
              <p className="text-sm text-gray-400">Song identified</p>
              <h3 className="mt-1 text-lg font-semibold">
                {songFound.title} — {songFound.artist}
              </h3>
              <p className="mt-2 text-sm text-purple-300">
                Best match: {songFound.match}
              </p>
            </div>
          )}
        </div>

        {recommendation && (
          <div className="mb-6 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4 text-sm text-purple-100">
            <span className="font-semibold">AI Pick:</span> {recommendation}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredClubs.map((club) => {
            const isFavorite = favorites.includes(club.id);

            return (
              <div
                key={club.id}
                className="overflow-hidden rounded-2xl bg-zinc-800 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20"
              >
                <a href={`/club/${club.id}`}>
                  <img
                    src={club.image}
                    alt={club.name}
                    className="h-52 w-full object-cover"
                  />
                </a>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">{club.name}</h2>
                      <p className="text-gray-400">{club.location}</p>
                      <p className="text-sm text-purple-400">{club.genre}</p>
                    </div>

                    <button
                      onClick={() => toggleFavorite(club.id)}
                      className="text-2xl"
                    >
                      {isFavorite ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <a
                      href={`/club/${club.id}`}
                      className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium hover:bg-purple-500 transition"
                    >
                      View Details
                    </a>

                    <a
                      href={`/club/${club.id}`}
                      className="rounded-xl bg-zinc-700 px-4 py-2 text-sm font-medium hover:bg-zinc-600 transition"
                    >
                      Preview Vibe
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredClubs.length === 0 && (
          <div className="mt-10 rounded-2xl bg-zinc-800 p-6 text-center text-gray-300">
            No clubs match your search.
          </div>
        )}
      </div>
    </main>
  );
}