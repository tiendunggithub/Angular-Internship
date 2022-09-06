import { Customer } from './customer';
import { Product } from './product';
export class Cart {
    id: number;
    product: Product;
    user: Customer;
    qty: number;
    price: string;
    promotion: string;
    adder_date: string;
}
