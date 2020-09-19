export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface CartProduct extends Product {
  quantity: number;
}
