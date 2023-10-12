import { Order } from "@prisma/client";
import { ContactMessage } from "./contact-msg";


export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  role: 'ADMIN' | 'CUSTOMER' | 'OWNER';
  reset_key?: string | null;
  key_date?: Date | null;
  contactMessages: ContactMessage[];
  orders: Order[];
}