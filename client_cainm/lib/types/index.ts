// User & Auth
export interface User {
  username: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthResponse {
  result?: {
    token: string;
    username: string;
    role: 'ADMIN' | 'USER';
  };
  message: string;
}

// Product
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating?: number;
}

// Cart
export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  image?: string; // Frontend sẽ tự map ảnh vào đây
}

export interface CartResponse {
  id: number;
  items: CartItem[];
  total: number;
}

// Order
export interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: any[];
}