import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { id, season } = await params;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${process.env.TMDB_KEY}&append_to_response=images`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
        cache: "no-store",
      } // best practice untuk dynamic data
    );

    if (!res.ok)
      return NextResponse.json(
        { error: "Failed to fetch season data" },
        { status: 500 }
      );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching season:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
