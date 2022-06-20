import { expect } from 'chai';
import shopController from '../src/api/shop/shop.controller';
import { Item } from '../shared/interfaces';
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
import * as express from 'express';
import routes from '../src/api/app.route';

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
    it('should have bad request error', (done) => {
        const app = express();
        app.use('/api', routes);
        chai.request(app.listen(3000)).get('/api/shop?filter=')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(400);
                done();
            });
    });

    it('should get products by filter text', (done) => {
        const app = express();
        app.use('/api', routes);
        chai.request(app.listen(3000)).get('/api/shop?filter=cleaner a')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(6);
                done();
            });
    })
})