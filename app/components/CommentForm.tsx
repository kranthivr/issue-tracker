"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Callout,
  Container,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorMessage, Spinner } from ".";
import { commentSchema } from "../validationSchemas";

type CommentFormData = z.infer<typeof commentSchema>;

const CommentForm = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      commentIssueId: issueId,
    },
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/comments", data);
      setSubmitting(false);
      setValue("comment", "");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <Container>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextArea
          variant="classic"
          placeholder="Comment ..."
          {...register("comment")}
        />
        <ErrorMessage>{errors.comment?.message}</ErrorMessage>
        <ErrorMessage>{errors.commentIssueId?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit Comment {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Container>
  );
};

export default CommentForm;
