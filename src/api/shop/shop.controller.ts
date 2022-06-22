import { Item } from '../../../shared/interfaces';
import * as products from '../../../assets/products.json';

export class ShopController {
    constructor() { }

    public async productsByFilter(filter: string, limit: number, offset: number): Promise<Item[]> {
        return (products as Item[])
            .filter(item => (item.name || '').toLowerCase().includes(filter.toLowerCase())).splice(offset, limit);
    }
}

export default new ShopController();