import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-product-header',
  templateUrl: `product-header.component.html`,
})
export class ProductHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  //on passe la valeur desc par defaut
  sort = 'desc';
  itemsShowCount = 12;

  // on crée une methode pour update la valeur desc lorsqu'on clic sur une valeur
  onSortUpdated(newSort: string): void {
      this.sort = newSort;
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
