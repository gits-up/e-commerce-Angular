import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  cartProducts: any[] = [];
  subTotal: number = 0;
  itemsInCart: number = 0;
  saleObj: any =  {
      "SaleId": 0,
      "CustId": 1,
      "SaleDate": new Date(),
      "TotalInvoiceAmount": 0,
      "Discount": 0,
      "PaymentNaration": "Paytm",
      "DeliveryAddress1": "Plot no 123",
      "DeliveryAddress2": "Near Railway Station",
      "DeliveryCity": "Dhanbad",
      "DeliveryPinCode": "826001",
      "DeliveryLandMark": "Cinema Hall",
  };
  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.subTotal = 0;
    this.itemsInCart = 0;
    this.productService.getCartItemsByCustId(1).subscribe((res: any) => {
      this.cartProducts = res.data;
      this.cartProducts.forEach(element => {
        this.subTotal = this.subTotal + element.productPrice;
      });
      this.cartProducts.forEach(element => {
        this.itemsInCart = this.itemsInCart + 1;
      });
    })
  }
  RemoveItem(id: number) {
    this.productService.removeCartItemById(id).subscribe((res: any) => {
      if (res.result) {
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    })
  }
  makeSale() {
    this.saleObj.TotalInvoiceAmount = this.subTotal;
    this.productService.cartAddedSubject.next(true);
    this.productService.makeSale( this.saleObj).subscribe((res: any) => {
      if (res.result) {
        alert("Success")
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    })
  }
}
