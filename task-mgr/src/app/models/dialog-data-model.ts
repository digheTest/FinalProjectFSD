import { ItemModel } from "./item-model";

export class DialogDataModel {
  title: string;
  itemType: string;
  items: Array<ItemModel>;
  selectedItem: ItemModel;

  constructor(
    options: {
      title?: string;
      itemType?: string;
      items?: Array<ItemModel>;
      selectedItem?: ItemModel;
    } = {}
  ) {
    this.title = options.title || "";
    this.itemType = options.itemType || "";
    this.items = options.items || [];
    this.selectedItem = options.selectedItem;
  }
}
