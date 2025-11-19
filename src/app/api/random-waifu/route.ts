// src/app/api/random-waifu/route.ts
const endpoints = [
    "https://api.waifu.pics/sfw/bonk",
    "https://api.waifu.pics/nsfw/blowjob",
    "https://api.waifu.pics/sfw/kill",
    "https://api.waifu.pics/sfw/kiss",
    "https://api.waifu.pics/sfw/pat",
    "https://api.waifu.pics/sfw/handhold",
    "https://api.waifu.pics/nsfw/neko",
    "https://api.waifu.pics/sfw/smile",
    "https://api.waifu.pics/sfw/hug",
    "https://api.waifu.pics/sfw/kick",
    "https://api.waifu.pics/sfw/smug",
    "https://api.waifu.pics/sfw/cuddle",
    "https://api.waifu.pics/sfw/yeet",
    "https://api.waifu.pics/sfw/nom",
    "https://api.waifu.pics/sfw/dance",
    "https://api.waifu.pics/sfw/glomp",
    "https://api.waifu.pics/sfw/poke",
    "https://api.waifu.pics/sfw/wink",
    "https://api.waifu.pics/sfw/lick",
    "https://api.waifu.pics/sfw/awoo",
    "https://api.waifu.pics/sfw/wave",
    "https://api.waifu.pics/sfw/cry",
    "https://api.waifu.pics/sfw/slap",
    "https://api.waifu.pics/nsfw/waifu",
    "https://api.waifu.pics/sfw/megumin",
    "https://api.waifu.pics/sfw/happy",
    "https://api.waifu.pics/sfw/shine",
    "https://api.waifu.pics/sfw/bully",
    "https://api.waifu.pics/sfw/neko",
    "https://api.waifu.pics/sfw/shinobu",
    "https://api.waifu.pics/sfw/blush",
    "https://api.waifu.pics/nsfw/trap",
    "https://api.waifu.pics/sfw/highfive",
    "https://api.waifu.pics/sfw/waifu"
];

export async function GET() {
    // Pick random endpoint
    const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];

    try {
        const res = await fetch(randomEndpoint, { next: { revalidate: 0 } });
        const data = await res.json();

        return Response.json({ url: data.url || data.file });
    } catch (error) {
        return Response.json({ error: "Failed to fetch image" }, { status: 500 });
    }
}