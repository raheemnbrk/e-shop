import { ReactNode } from "react";

declare global {
  type Children = { children: ReactNode };

  interface MessageResponse {
    success: boolean;
    message: string;
  }
}
