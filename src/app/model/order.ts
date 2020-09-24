import {ProductWithQuantity} from './product';

export interface Order {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  products: Array<ProductWithQuantity | number>
}
