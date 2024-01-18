import { Prisma } from "@prisma/client";

const commentsWithUsers = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: { commentOfUser: true },
});

export type CommentsWithUsers = Prisma.CommentGetPayload<
  typeof commentsWithUsers
>;
