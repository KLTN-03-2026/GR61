import { NextResponse } from "next/server";
import { DashboardService } from "@/lib/api/service/DashboardService";

export async function GET(req: Request) {
  try {
    const userId = parseInt(req.headers.get("x-user-id") || "0");
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await DashboardService.getOverview(userId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi Dashboard" }, { status: 500 });
  }
}
