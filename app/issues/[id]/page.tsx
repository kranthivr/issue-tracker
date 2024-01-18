import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import StatusSelect from "./StatusSelect";
import CommentsComponent from "@/app/components/CommentsComponent";
import { Prisma } from "@prisma/client";
import { CommentsWithUsers } from "@/app/types";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <>
          <Box>
            <Flex direction="column" gap="4">
              <AssigneeSelect issue={issue} />
              <StatusSelect issue={issue} />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
          <Box className="md:col-span-4 mt-2">
            <CommentsComponent issueId={issue.id} />
          </Box>
        </>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.title,
  };
}
