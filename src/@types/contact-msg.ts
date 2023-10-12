import { User } from "./user";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User | null;
  replied?: boolean;
}