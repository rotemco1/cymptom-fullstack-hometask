export interface Item {
    sku: number;
    name: string;
    type: string;
    price: number;
    upc: string;
    category: {id: string; name: string}[];
    shipping: number;
    description: string;
    image: string;
}