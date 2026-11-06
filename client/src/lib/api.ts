const BASE_URL = "http://localhost:3000";

export const API_ROUTES = {
    ORDER: {

    },
    PRODUCT: {
        GET: `${BASE_URL}/api/products`,
        CREATE: `${BASE_URL}/api/products`
    },
    CUSTOMER: {
        GET: `${BASE_URL}/api/customers`,
        CREATE: `${BASE_URL}/api/customers`
    }
}