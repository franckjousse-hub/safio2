import { BARS, PARTNERS } from "@/lib/data";

export async function GET() {
  const avgScore = Math.round(
    BARS.reduce((sum, b) => sum + b.score, 0) / BARS.length
  );

  const cityCounts = BARS.reduce((acc: Record<string, number>, b) => {
    acc[b.city] = (acc[b.city] || 0) + 1;
    return acc;
  }, {});

  return Response.json({
    kpis: {
      revenue: "258 K\u20AC",
      revenueGrowth: "+34.2%",
      activeUsers: 4821,
      totalBars: BARS.length,
      totalReports: 312,
      resolvedReports: 214,
      pendingReports: 98,
      totalPartners: PARTNERS.length,
      avgScore,
    },
    geography: cityCounts,
  });
}
