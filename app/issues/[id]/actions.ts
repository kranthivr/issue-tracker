"use server";

import { Issue, Status } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

export const assignIssueToUser = async (issue: Issue) => {
  try {
    await axios.patch(`/api/issues/${issue.id}`, {
      assignedToUserId: issue.assignedToUserId || null,
      status: issue.assignedToUserId ? Status.IN_PROGRESS : Status.OPEN,
    });
  } catch (error) {
    toast.error("Changes could not be saved");
  }
};
