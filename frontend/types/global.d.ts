import { ReactNode } from "react";

declare global {
  type Children = { children: ReactNode };

  interface MessageResponse {
    success: boolean;
    message: string;
  }
  interface Pagination {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
}
