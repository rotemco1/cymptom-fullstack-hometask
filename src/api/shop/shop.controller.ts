import { Item } from '../../../shared/interfaces';
import * as products from '../../../assets/products.json';
import * as config from '../../config/config.json';

export class ShopController {
    constructor() { }

    public async productsByFilter(filter: string, limit: number = +config.defaultLimit, offset: number = +config.defualtOffset): Promise<Item[]> {
        return (products as Item[])
            .filter(item => (item.name || '').toLowerCase().includes(filter.toLowerCase())).splice(offset, limit);
    }
}

export default new ShopController();