import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function GET() {
  const reports = await prisma.report.findMany({
    include: { bar: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(reports);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { barId, type, description, isAnonymous } = body;

  if (!barId || !type) {
    return Response.json({ error: "barId and type are required" }, { status: 400 });
  }

  const report = await prisma.report.create({
    data: {
      barId,
      type,
      description: description || null,
      isAnonymous: isAnonymous ?? true,
      status: "pending",
    },
  });

  return Response.json(report, { status: 201 });
}
