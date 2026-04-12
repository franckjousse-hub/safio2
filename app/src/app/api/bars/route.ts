import { BARS } from "@/lib/data";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");
  const minScore = searchParams.get("minScore");
  const isOpen = searchParams.get("isOpen");
  const search = searchParams.get("search");

  let results = [...BARS];

  if (city && city !== "tous") {
    const cityName = city === "tours" ? "Tours" : "Paris";
    results = results.filter((b) => b.city === cityName);
  }
  if (minScore) {
    results = results.filter((b) => b.score >= parseInt(minScore));
  }
  if (isOpen === "true") {
    results = results.filter((b) => b.isOpen);
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q)
    );
  }

  results.sort((a, b) => b.score - a.score);

  return Response.json(results);
}
