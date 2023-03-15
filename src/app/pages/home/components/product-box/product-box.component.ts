import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../model/product.model";

@Component({
  selector: 'app-product-box',
  templateUrl: `product-box.component.html`,
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;

  @Output() addTocart = new EventEmitter();
  onAddToCart(): void {
    this.addTocart.emit(this.product);
  }
}
