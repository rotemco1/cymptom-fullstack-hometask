import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpTestingController} from '@angular/common/http/testing';
import { CartService } from '../services/cart.service';
import { ShopApiService } from '../services/shop-api.service';
import { ShopComponent } from './shop.component';

export class MockHttpClient extends HttpClient { }

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let service: ShopApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopComponent],
      imports: [HttpClientModule],
      providers: [ShopApiService, CartService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ShopApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
