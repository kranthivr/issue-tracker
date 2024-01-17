"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = ({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) => {
  const router = useRouter();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();

        if (status) params.append("status", status);

        if (searchParams.get("userId"))
          params.append("userId", searchParams.get("userId")!);

        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.size ? `?${params.toString()}` : "";
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by status</Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value || ""}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
