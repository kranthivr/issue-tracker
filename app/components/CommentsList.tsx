import { Avatar, Box, Card, Container, Flex, Text } from "@radix-ui/themes";
import { CommentsWithUsers } from "../types";

const CommentsList = ({ comments }: { comments: CommentsWithUsers[] }) => {
  return (
    <Container mt="9">
      {comments.map((comment) => (
        <Card className="max-w-full mb-5" key={comment.id}>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src={comment.commentOfUser.image!}
              radius="full"
              fallback="?"
            />
            <Box>
              <Text as="div" size="1" color="gray">
                {comment.commentOfUser.name}
              </Text>
              <Text as="div" size="2">
                {comment.comment}
              </Text>
            </Box>
          </Flex>
        </Card>
      ))}
    </Container>
  );
};

export default CommentsList;
