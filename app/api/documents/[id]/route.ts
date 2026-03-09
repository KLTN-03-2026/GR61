import { NextRequest, NextResponse } from "next/server";
import { DocumentService } from "@/lib/api/service/DocumentService";

const service = new DocumentService();

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    await service.deleteDoc(id);
    return NextResponse.json({ message: "Xóa thành công" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
