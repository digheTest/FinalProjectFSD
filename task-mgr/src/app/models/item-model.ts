export class ItemModel {
  itemID: number;
  itemName: string;

  constructor(
    options: { itemID?: number; itemName?: string; isSelected?: boolean } = {}
  ) {
    this.itemID = options.itemID || 0;
    this.itemName = options.itemName || "";
  }
}
