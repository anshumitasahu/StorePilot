export interface Response {
    success: true,
    message: string,
}

export interface CreateProductProps {
    name: string,
    price: number,
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
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
    name: string,
    email: string,
    countryCode: string,
    phone: string,
    address: string
}

export interface CustomersQueryResponse extends Response {
    data: {
        name: string;
        phone: string;
        countryCode: string;
        email: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        createdBy: string;
        updatedBy: string;
        id: number;
    }[]
}

export interface UseCreateCustomerProps {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setCountryCode: React.Dispatch<React.SetStateAction<string>>;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
}