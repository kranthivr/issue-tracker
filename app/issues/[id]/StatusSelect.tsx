"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<Status>(issue.status);

  useEffect(() => {
    setSelectedStatus(issue.status)
  }, [issue.status])

  const assignIssueStatus = async (newStatus: Status) => {
    const previousStatus = selectedStatus;
    setSelectedStatus(newStatus);
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status: newStatus,
      });
      router.refresh();
    } catch (error) {
      setSelectedStatus(previousStatus)
      toast.error("Changes could not be saved");
    }
  };

  return (
    <>
      <Select.Root
        value={selectedStatus}
        onValueChange={assignIssueStatus}
      >
        <Select.Trigger placeholder="Status Change"></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses.map((status) => (
              <Select.Item key={status.label} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
