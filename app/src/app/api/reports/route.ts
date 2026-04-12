import { type NextRequest } from "next/server";

// In-memory store for demo purposes
const reports: Array<Record<string, unknown>> = [];

export async function GET() {
  return Response.json(reports);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { barId, type, description, isAnonymous } = body;

  if (!barId || !type) {
    return Response.json({ error: "barId and type are required" }, { status: 400 });
  }

  const report = {
    id: `report-${Date.now()}`,
    barId,
    type,
    description: description || null,
    isAnonymous: isAnonymous ?? true,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  reports.push(report);

  return Response.json(report, { status: 201 });
}
