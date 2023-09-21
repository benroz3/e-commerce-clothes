export interface RootState {
  user: UserStateType;
  product: { updatedProduct: UpdateProductType | null };
  navModal: {
    showNavModal: boolean;
  };
}

export interface UserType {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserStateType {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  } | null;
  isAuthUser: boolean;
}

export interface LoginUserType {
  email: string;
  password: string;
}

export interface AvailableSizesType {
  id: string;
  label: string;
}

export interface AdminProductFormControlsType {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
  options?: { id: string; label: string }[];
}

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  priceDrop: number;
  category: string;
  sizes: AvailableSizesType[];
  deliveryInfo: string;
  onSale: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  priceDrop: number;
  category: string;
  sizes: AvailableSizesType[];
  deliveryInfo: string;
  onSale: string;
  imageUrl: string;
}
