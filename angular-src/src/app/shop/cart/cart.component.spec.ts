import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from '../../services/cart.service';
import { Item } from '../../../../../shared/interfaces';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const item: Item = { "sku": 43900, "name": "Duracell - AAA Batteries (4-Pack)", "type": "HardGood", "price": 5.49, "upc": "041333424019", "category": [{ "id": "pcmcat312300050015", "name": "Connected Home & Housewares" }, { "id": "pcmcat248700050021", "name": "Housewares" }, { "id": "pcmcat303600050001", "name": "Household Batteries" }, { "id": "abcat0208002", "name": "Alkaline Batteries" }], "shipping": 5.49, "description": "Compatible with select electronic devices; AAA size; DURALOCK Power Preserve technology; 4-pack", "manufacturer": "Duracell", "model": "MN2400B4Z", "url": "http://www.bestbuy.com/site/duracell-aaa-batteries-4-pack/43900.p?id=1051384074145&skuId=43900&cmp=RMXCC", "image": "http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg" };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [CartService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.cartService.addToCart(item);
  });

  describe('removeFromCart', () => {
    it('should remove the item from the cart', () => {
      component.removeFromCart(item);
      expect(component.cartService.cart).not.toContain(item);
    });

    it(`should sub the removed items' price to the total price`, () => {
      const prevTotalPrice: number = component.cartService.totalPrice;
      component.removeFromCart(item);
      const newTotalPrice: number = component.cartService.totalPrice;
      expect(newTotalPrice).toEqual(prevTotalPrice - item.price);
    });
  });
});
