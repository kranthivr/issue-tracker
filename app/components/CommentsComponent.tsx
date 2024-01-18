import { Comment, Prisma } from "@prisma/client";
import { Box, Heading, Text } from "@radix-ui/themes";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import { CommentsWithUsers } from "../types";
import prisma from "@/prisma/client";

interface Props {
  issueId: number;
}

const fetchCommentsWithUsers = async (issueId: number) => {
  const commentsWithUsers: CommentsWithUsers[] = await prisma.comment.findMany({
    where: { commentIssueId: issueId },
    include: {
      commentOfUser: true,
    },
  });
  return commentsWithUsers;
};

const CommentsComponent = async ({ issueId }: Props) => {
  type UsersWithComments = Prisma.PromiseReturnType<
    typeof fetchCommentsWithUsers
  >;

  const comments: UsersWithComments = await fetchCommentsWithUsers(issueId);

  return (
    <>
      <CommentForm issueId={issueId} />
      <CommentsList comments={comments} />
    </>
  );
};

export default CommentsComponent;
