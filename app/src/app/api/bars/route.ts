import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");
  const minScore = searchParams.get("minScore");
  const isOpen = searchParams.get("isOpen");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};

  if (city && city !== "tous") {
    where.city = city === "tours" ? "Tours" : "Paris";
  }
  if (minScore) {
    where.score = { gte: parseInt(minScore) };
  }
  if (isOpen === "true") {
    where.isOpen = true;
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { address: { contains: search } },
      { city: { contains: search } },
    ];
  }

  const bars = await prisma.bar.findMany({
    where,
    orderBy: { score: "desc" },
  });

  return Response.json(bars);
}
