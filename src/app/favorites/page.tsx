"use client";

import { useEffect, useState } from "react";

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

export default function FavoritesPage() {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("clubvibe-favorites");
        if (saved) {
            setFavoriteIds(JSON.parse(saved));
        }
    }, []);

    const favoriteClubs = clubs.filter((club) => favoriteIds.includes(club.id));

    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-purple-950 p-6 text-white">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Your Favorites ❤️</h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Clubs you saved for later.
                        </p>
                    </div>

                    <a
                        href="/"
                        className="rounded-xl bg-zinc-800 px-4 py-2 hover:bg-zinc-700 transition"
                    >
                        ← Back Home
                    </a>
                </div>

                {favoriteClubs.length === 0 ? (
                    <div className="rounded-2xl bg-zinc-800 p-6 text-center text-gray-300">
                        No favorite clubs yet.
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {favoriteClubs.map((club) => (
                            <a
                                key={club.id}
                                href={`/club/${club.id}`}
                                className="overflow-hidden rounded-2xl bg-zinc-800 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20"
                            >
                                <img
                                    src={club.image}
                                    alt={club.name}
                                    className="h-52 w-full object-cover"
                                />

                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">{club.name}</h2>
                                    <p className="text-gray-400">{club.location}</p>
                                    <p className="text-sm text-purple-400">{club.genre}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}