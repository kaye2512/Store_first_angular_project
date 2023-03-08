import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../model/product.model";

@Component({
  selector: 'app-product-box',
  templateUrl: `product-box.component.html`,
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id: 1,
    title: "Snickers",
    price: 150,
    category: "shoes",
    description: "Description",
    image: 'https://via.placeholder.com/150'
  };

  @Output() addTocart = new EventEmitter();
  onAddToCart(): void {
    this.addTocart.emit(this.product);
  }
}
