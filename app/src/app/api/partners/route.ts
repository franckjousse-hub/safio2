import { prisma } from "@/lib/prisma";

export async function GET() {
  const partners = await prisma.partner.findMany({
    orderBy: { rating: "desc" },
  });
  return Response.json(partners);
}
