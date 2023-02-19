export type Product = {
  name: string;
  quantity: number;
  price: number;
};

export type NewApplicationFormData = {
  channel: string;
  name: string;
  surname: string;
  email: string;
  mobile: string;
  products: Product[];
  //required for FormTextField
  [key: string]: string | Product[] | undefined;
};
