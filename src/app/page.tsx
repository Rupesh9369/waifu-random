// src/app/page.tsx
import { Shuffle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.svg");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRandomWaifu = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/random-waifu");
      const data = await res.json();
      setImageUrl(data.url);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomWaifu();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-4 tracking-tight">
            drop-shadow-2xl">
            Random Waifu Reaction
          </h1>
          <p className="text-purple-200 text-center mb-10 text-lg">
            Click the button for a new random SFW/NSFW reaction gif
          </p>

          <div className="relative bg-black/30 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {loading && (
              <div className="aspect-video flex items-center justify-center">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-pink-400"></div>
              </div>
            )}

            {!loading && error && (
              <div className="aspect-video flex items-center justify-center text-red-400 text-xl">
                Failed to load image
              </div>
            )}

            {!loading && !error && (
              <img
                src={imageUrl}
                alt="Random waifu reaction"
                className="w-full h-full object-contain bg-black/50"
                onError={() => setError(true)}
              />
            )}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={fetchRandomWaifu}
              disabled={loading}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xl rounded-full rounded-full shadow-xl transform transition hover:scale-105 active:scale-95 disabled:opacity-70"
            >
              <Shuffle className="w-8 h-8" />
              Give Me Another One!
            </button>
          </div>

          <p className="mt-8 text-gray-300 text-sm text-center">
            Powered by{" "}
            <a href="https://waifu.pics" target="_blank" className="underline hover:text-white">
              waifu.pics
            </a>
          </p>
        </div>
      </main>
    </>
  );
}