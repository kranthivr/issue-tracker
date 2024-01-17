"use client";

import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

const IssueUserFilter = ({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) => {
  const router = useRouter();
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const filterByUser = (userId: string) => {
    const params = new URLSearchParams();

    if (userId) params.append("userId", userId);

    if (searchParams.get("status"))
      params.append("status", searchParams.get("status")!);

    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);

    const query = params.size ? `?${params.toString()}` : "";
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("userId") || ""}
      onValueChange={filterByUser}
    >
      <Select.Trigger placeholder="Filter by user..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by user</Select.Label>
          <Select.Item value="">All</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id || ""}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60 s refresh time
    retry: 3, // retry 3 times after first request
  });

export default IssueUserFilter;
