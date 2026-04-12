import { prisma } from "@/lib/prisma";

export async function GET() {
  const [totalBars, totalUsers, totalReports, totalPartners, bars] = await Promise.all([
    prisma.bar.count(),
    prisma.user.count(),
    prisma.report.count(),
    prisma.partner.count(),
    prisma.bar.findMany({ select: { score: true, city: true } }),
  ]);

  const avgScore = bars.length > 0
    ? Math.round(bars.reduce((sum: number, b: { score: number; city: string }) => sum + b.score, 0) / bars.length)
    : 0;

  const cityCounts = bars.reduce((acc: Record<string, number>, b: { score: number; city: string }) => {
    acc[b.city] = (acc[b.city] || 0) + 1;
    return acc;
  }, {});

  const resolvedReports = await prisma.report.count({ where: { status: "resolved" } });
  const pendingReports = await prisma.report.count({ where: { status: "pending" } });

  return Response.json({
    kpis: {
      revenue: "258 K\u20AC",
      revenueGrowth: "+34.2%",
      activeUsers: totalUsers,
      totalBars,
      totalReports,
      resolvedReports,
      pendingReports,
      totalPartners,
      avgScore,
    },
    geography: cityCounts,
  });
}
