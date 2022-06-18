export interface Item {
    sku: number;
    name?: string;
    type: string;
    price: number;
    upc: string;
    category: {id: string; name: string}[];
    shipping: string | number;
    description: string;
    manufacturer?: string;
    model?: string;
    url: string;
    image: string;
}