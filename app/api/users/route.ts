import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// we don't need NextRequest in this GET request
// but if we don't want to cache the api call
// so we are giving the request parameter.
export async function GET(requset: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
}
