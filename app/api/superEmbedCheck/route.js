export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type") || "movie";

  if (!id) return Response.json({ available: false });

  const url =
    type === "movie"
      ? `https://multiembed.mov/?video_id=${id}&tmdb=1`
      : `https://multiembed.mov/?video_id=${id}&tmdb=1&s=1&e=1`;

  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    return Response.json({ available: res.ok });
  } catch (e) {
    return Response.json({ available: false });
  }
}
