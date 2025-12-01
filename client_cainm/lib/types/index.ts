export interface User {
  id: number;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand?: string;
  stock: number;
  rating?: number;
}

export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartResponse {
  id: number;
  items: CartItem[];
  total: number;
}