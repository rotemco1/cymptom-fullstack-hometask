import { Item } from '../../../shared/interfaces';
import * as products from '../../../assets/products.json';

export class ShopController {
    constructor() { }

    public async productsByFilter(filter: string): Promise<Item[]> {
        return (products as Item[]).filter(item => (item.name || '').toLowerCase().includes(filter.toLowerCase()));
    }
}

export default new ShopController();