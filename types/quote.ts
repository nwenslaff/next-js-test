export interface QuoteLine {
  id: string;
  selectedItem: string;
  listPrice: number;
  unit: string;
  quantity: number;
  discount: number;
  discountAmount: number;
  totalPrice: number;
  description: string;
}

export interface QuoteGroup {
  id: string;
  total: number;
  lines: QuoteLine[];
}

export type LineAction = "moveUp" | "moveDown" | "copy" | "add" | "delete";

export interface QuoteBuilderContextType {
  groups: QuoteGroup[];
  updateGroup: (groupId: number, updatedGroup: QuoteGroup) => void;
  handleLineAction: (
    groupIndex: number,
    lineIndex: number,
    action: LineAction
  ) => void;
  addGroup: () => void;
}
