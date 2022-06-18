import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Item } from '../../../../shared/interfaces';
import { CartService } from '../services/cart.service';
import { ShopApiService } from '../services/shop-api.service';
import { ShopComponent } from './shop.component';

export class MockHttpClient extends HttpClient { };
export class MockCartService extends CartService { };

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let shopApiService: ShopApiService;
  let cartService: CartService;
  const item: Item = { "sku": 43900, "name": "Duracell - AAA Batteries (4-Pack)", "type": "HardGood", "price": 5.49, "upc": "041333424019", "category": [{ "id": "pcmcat312300050015", "name": "Connected Home & Housewares" }, { "id": "pcmcat248700050021", "name": "Housewares" }, { "id": "pcmcat303600050001", "name": "Household Batteries" }, { "id": "abcat0208002", "name": "Alkaline Batteries" }], "shipping": 5.49, "description": "Compatible with select electronic devices; AAA size; DURALOCK Power Preserve technology; 4-pack", "manufacturer": "Duracell", "model": "MN2400B4Z", "url": "http://www.bestbuy.com/site/duracell-aaa-batteries-4-pack/43900.p?id=1051384074145&skuId=43900&cmp=RMXCC", "image": "http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg" };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopComponent],
      imports: [HttpClientModule],
      providers: [
        ShopApiService,
      {
        provide: CartService,
        useClass: MockCartService
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    shopApiService = TestBed.inject(ShopApiService);
    cartService = TestBed.inject(CartService)
  });

  it('should find items with the filter text', () => {
    component.fetchItemsByFilter('Duracell');
    component.filteredItems$.subscribe(items => {
      fixture.detectChanges();
      expect(items).toContain(item);
    })
  });
  
  describe('addToCart', () => {
    it('should add the item to the cart', () => {
      component.addToCart(item);
      expect(cartService.cart).toContain(item);
    });

    it(`should add the added items' price to the total price`, () => {
      const prevTotalPrice: number = cartService.totalPrice;
      component.addToCart(item);
      const newTotalPrice: number = cartService.totalPrice;
      expect(newTotalPrice).toEqual(prevTotalPrice + item.price);
    });
  });
});
