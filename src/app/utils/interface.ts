export interface IProduct {
  product_id: string;
  ProductPrice: number;
}

export interface IProductDetails {
  productId: IProduct_id;
  _id: string;
  userId: string;
  Quantity: number;
  totalPrice: number;
}

export interface IProduct_id {
  _id: string;
  ProductName: string;
  ProductImage: string;
  ProductPrice: number;
}
