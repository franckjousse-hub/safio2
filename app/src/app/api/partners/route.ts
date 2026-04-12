import { PARTNERS } from "@/lib/data";

export async function GET() {
  return Response.json(PARTNERS);
}
