export type UserTypes = {
  name: string;
  email: string;
  role: string;
};

export enum OrderStatus {
  PLACED = "PLACED",
  PREPARING = "PREPARING",
  READY = "READY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

interface Order {
  id: string;
  customerId: string;
  providerId: string;
  status: string;
  orderedAt: string;
  deliveredAt: string | null;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  totalAmount: number;
  items: any[];
}

export interface DashboardProps {
  orders: Order[];
}

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: "ADMIN" | "USER"  ;
};

export type UserRole = "ADMIN" | "USER";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
