export interface Response {
    success: true,
    message: string,
}

export interface BaseEntity {
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
    id: number;
}

export interface CreateProductProps {
    name: string,
    price: number,
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface ProductsQueryResponse extends Response, BaseEntity {
    data: CreateProductProps[]
}

export interface UseCreateProductProps {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setPrice: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
}


export interface CreateCustomerProps {
    name: string,
    email: string,
    countryCode: string,
    phone: string,
    address: string
}

export interface CustomersQueryResponse extends Response, BaseEntity {
    data: CreateCustomerProps[]
}

export interface UseCreateCustomerProps {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setCountryCode: React.Dispatch<React.SetStateAction<string>>;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
}

export interface CreateOrdersProps {
    customerId: number;
    orderItems: {
        productId: number;
        quantity: number;
    }[];
}

export interface OrderItemResponse {
    id: number;
    quantity: number;
    productId: number;
    orderId: number;
    product: CreateProductProps;
}

export interface OrderResponse extends BaseEntity {
    customerId: number;
    customer: CreateCustomerProps;
    orderItems: OrderItemResponse[];
}

export interface OrdersQueryResponse extends Response {
    data: OrderResponse[];
}