import { use } from "react";

const clubs = [
    {
        id: "1",
        name: "Sky Club",
        location: "Paris",
        address: "12 Rue de Rivoli, 75001 Paris",
        genre: "House",
        image:
            "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200",
        songName: "Midnight Groove",
        artist: "DJ Nova",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        rating: "4.5 ⭐",
        review: "Amazing vibe, great DJs, always packed on weekends.",
    },
    {
        id: "2",
        name: "Neon Nights",
        location: "Berlin",
        address: "Alexanderplatz 5, Berlin",
        genre: "Techno",
        image:
            "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200",
        songName: "Dark Pulse",
        artist: "TechnoX",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        rating: "4.7 ⭐",
        review: "Underground techno heaven with insane lighting.",
    },
    {
        id: "3",
        name: "Velvet Room",
        location: "London",
        address: "Oxford Street, London",
        genre: "Hip-Hop",
        image:
            "https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg?auto=compress&cs=tinysrgb&w=1200",
        songName: "Street Flow",
        artist: "MC Blaze",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        rating: "4.3 ⭐",
        review: "Chill vibe, good crowd, and strong hip-hop lineup.",
    },
];

export default function ClubPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const club = clubs.find((c) => c.id === resolvedParams.id);

    if (!club) {
        return <div className="p-6 text-white">Club not found</div>;
    }

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        club.address
    )}`;

    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-purple-950 p-6 text-white">
            <div className="mx-auto max-w-3xl">
                <a href="/" className="text-sm text-gray-400 hover:text-white">
                    ← Back
                </a>

                <img
                    src={club.image}
                    alt={club.name}
                    className="mt-4 h-64 w-full rounded-2xl object-cover"
                />

                <div className="mt-5">
                    <h1 className="text-3xl font-bold">{club.name}</h1>
                    <p className="mt-1 text-gray-400">{club.location}</p>
                    <p className="text-sm text-gray-500">{club.address}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                    <span className="rounded-full bg-purple-600/20 px-3 py-1 text-sm text-purple-200">
                        {club.genre}
                    </span>
                    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm text-yellow-200">
                        {club.rating}
                    </span>
                </div>

                <p className="mt-5 rounded-2xl bg-zinc-800 p-4 text-sm italic text-gray-300">
                    “{club.review}”
                </p>

                <div className="mt-6 rounded-2xl bg-zinc-800 p-5">
                    <p className="text-sm text-gray-400">🎵 Now playing</p>
                    <p className="mt-1 font-semibold">
                        {club.songName} — {club.artist}
                    </p>

                    <audio controls className="mt-4 w-full">
                        <source src={club.song} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-purple-600 px-4 py-3 font-medium hover:bg-purple-500 transition"
                    >
                        Open in Maps 📍
                    </a>

                    <a
                        href="/favorites"
                        className="rounded-xl bg-zinc-700 px-4 py-3 font-medium hover:bg-zinc-600 transition"
                    >
                        Go to Favorites ❤️
                    </a>
                </div>
            </div>
        </main>
    );
}