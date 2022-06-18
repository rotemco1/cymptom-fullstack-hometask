import { Item } from '../../../shared/interfaces';
import * as products from './shop.json'

export class ShopController {
    constructor() { }

    public async productsByFilter(filter: string): Promise<Item[]> {
        return products.filter(item => item.name.includes(filter));
    }
}

export default new ShopController();