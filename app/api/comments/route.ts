import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { commentSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (!user) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = commentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { comment, commentIssueId } = body;

  const newIssue = await prisma.comment.create({
    data: { comment, commentIssueId, commentUserId: user.id },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
