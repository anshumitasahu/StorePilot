export interface Response {
    success: true,
    message: string,
}

export interface CreateProductProps {
    name: string,
    price: number
}

export interface ProductsQueryResponse extends Response {
    data: {
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        createdBy: string;
        updatedBy: string;
        id: number;
    }[]
}

export interface UseCreateProductProps {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setPrice: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
}


export interface CreateCustomerProps {
    id: number,
    name: string,
    email: string,
    countryCode: string,
    phone: string,
    address: string
}