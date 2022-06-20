import { expect } from 'chai';
import shopController from '../src/api/shop/shop.controller';
import { Item } from '../shared/interfaces';
const chai = require('chai');
const chaiHttp = require('chai-http');
import app from '../src/app';

chai.use(chaiHttp);

describe('productsByFilter', () => {
    const item: Item = { "sku": 43900, "name": "Duracell - AAA Batteries (4-Pack)", "type": "HardGood", "price": 5.49, "upc": "041333424019", "category": [{ "id": "pcmcat312300050015", "name": "Connected Home & Housewares" }, { "id": "pcmcat248700050021", "name": "Housewares" }, { "id": "pcmcat303600050001", "name": "Household Batteries" }, { "id": "abcat0208002", "name": "Alkaline Batteries" }], "shipping": 5.49, "description": "Compatible with select electronic devices; AAA size; DURALOCK Power Preserve technology; 4-pack", "manufacturer": "Duracell", "model": "MN2400B4Z", "url": "http://www.bestbuy.com/site/duracell-aaa-batteries-4-pack/43900.p?id=1051384074145&skuId=43900&cmp=RMXCC", "image": "http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg" };

    it('should filter products by filter text', async () => {
        const products: Item[] = await shopController.productsByFilter("Duracell - AAA Batteries (4-");

        expect(products).to.eql([item]);
    });

    it('should check product real properties by filter text', async () => {
        const products: Item[] = await shopController.productsByFilter("Duracell - AAA Batteries (4-");

        expect(products[0]).to.have.keys([
            'sku',
            'name',
            'type',
            'price',
            'upc',
            'category',
            'shipping',
            'description',
            'manufacturer',
            'model',
            'url',
            'image'
        ]);
    });

    it('should check product fake property by filter text', async () => {
        const products: Item[] = await shopController.productsByFilter("Duracell - AAA Batteries (4-");

        expect(products[0]).to.not.have.keys([
            'sku',
            'name',
            'type',
            'price',
            'upc',
            'category',
            'shipping',
            'description',
            'manufacturer',
            'model',
            'url',
            'image',
            'fakeProperty'
        ]);
    });
});

describe('GET /:filter', () => {
    it('should get products by filter text', (done) => {
        chai.request(app).get('/api/shop?filter=')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    })
})