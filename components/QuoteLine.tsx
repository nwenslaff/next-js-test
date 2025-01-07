"use client";

import { ArrowUp, ArrowDown, Copy, Trash2 } from "lucide-react";
import { QuoteLine as QuoteLineType, QuoteGroup } from "../types/quote";
import { useQuoteBuilder } from "../contexts/QuoteBuilderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface QuoteLineProps {
  group: QuoteGroup;
  groupIndex: number;
  line: QuoteLineType;
  lineIndex: number;
}

export default function QuoteLine({
  group,
  groupIndex,
  line,
  lineIndex,
}: QuoteLineProps) {
  const { updateGroup, handleLineAction } = useQuoteBuilder();

  const handleChange = (field: keyof QuoteLineType, value: any) => {
    const updatedLine = { ...line, [field]: value };

    // Recalculate total price when quantity, price, or discount changes
    if (field === "quantity" || field === "listPrice" || field === "discount") {
      const quantity = field === "quantity" ? Number(value) : line.quantity;
      const listPrice = field === "listPrice" ? Number(value) : line.listPrice;
      const discount = field === "discount" ? Number(value) : line.discount;

      const discountAmount = (listPrice * quantity * discount) / 100;
      const totalPrice = listPrice * quantity - discountAmount;

      updatedLine.discountAmount = discountAmount;
      updatedLine.totalPrice = totalPrice;
    }

    const updatedLines = group.lines.map((l, index) =>
      index === lineIndex ? updatedLine : l
    );
    const updatedTotal = updatedLines.reduce((sum, l) => sum + l.totalPrice, 0);

    updateGroup(groupIndex, {
      ...group,
      lines: updatedLines,
      total: updatedTotal,
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Label>Selected Item</Label>
          <Input
            value={line.selectedItem}
            onChange={(e) => handleChange("selectedItem", e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="flex gap-1 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleLineAction(groupIndex, lineIndex, "moveUp")}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleLineAction(groupIndex, lineIndex, "moveDown")}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleLineAction(groupIndex, lineIndex, "copy")}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleLineAction(groupIndex, lineIndex, "delete")}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="space-y-1">
          <Label className="text-red-500">List Price</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={line.listPrice}
              onChange={(e) =>
                handleChange("listPrice", Number(e.target.value))
              }
            />
            <span className="text-sm">JPY</span>
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-red-500">Unit</Label>
          <Select
            value={line.unit}
            onValueChange={(value) => handleChange("unit", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sample">Sample</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-red-500">Qty</Label>
          <Input
            type="number"
            value={line.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
          />
        </div>
        <div className="space-y-1">
          <Label>Discount (%)</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={line.discount}
              onChange={(e) => handleChange("discount", Number(e.target.value))}
            />
            <span className="text-sm">%</span>
          </div>
        </div>
        <div className="space-y-1">
          <Label>Discount (JPY)</Label>
          <div className="flex items-center gap-2">
            <Input value={line.discountAmount.toLocaleString()} readOnly />
            <span className="text-sm">JPY</span>
          </div>
        </div>
        <div className="space-y-1">
          <Label>Total Price</Label>
          <div className="flex items-center gap-2">
            <Input value={line.totalPrice.toLocaleString()} readOnly />
            <span className="text-sm">JPY</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <Label>Line Description</Label>
        <Textarea
          value={line.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="h-20"
        />
      </div>
    </div>
  );
}
