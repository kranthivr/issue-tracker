"use client";

import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueUserFilter from "./IssueUserFilter";
import { useSearchParams } from "next/navigation";

const IssueActions = () => {
  const searchParams = useSearchParams();
  return (
    <Flex justify="between">
      <Flex gap="2">
        <IssueStatusFilter searchParams={searchParams} />
        <IssueUserFilter searchParams={searchParams} />
      </Flex>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
