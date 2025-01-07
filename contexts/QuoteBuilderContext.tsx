"use client";

import React, { createContext, useState, useContext } from "react";
import {
  QuoteGroup,
  QuoteLine,
  QuoteBuilderContextType,
  LineAction,
} from "../types/quote";

const QuoteBuilderContext = createContext<QuoteBuilderContextType | undefined>(
  undefined
);

export const useQuoteBuilder = () => {
  const context = useContext(QuoteBuilderContext);
  if (!context) {
    throw new Error(
      "useQuoteBuilder must be used within a QuoteBuilderProvider"
    );
  }
  return context;
};

export const QuoteBuilderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultGroups: QuoteGroup[] = [];

  for (let i = 0; i < 100; i++) {
    const quoteLines: QuoteLine[] = [];

    for (let j = 0; j < 10; j++) {
      quoteLines.push({
        id: crypto.randomUUID(),
        selectedItem: `Human Biospecimens Ver. ${j + 1}`,
        listPrice: j * 100000 + 100000,
        unit: "Sample",
        quantity: 1,
        discount: 0,
        discountAmount: 0,
        totalPrice: j * 100000 + 100000,
        description:
          "Frozen: Yes | Minimum Sample Date: 2 weeks | Source: Wild Caught | Packaging Material: Screw Cap Test Tube | Certification: Delivery Certified | Weight: 50g | Color: Red",
      });
    }

    defaultGroups.push({
      id: crypto.randomUUID(),
      total: i * 100000,
      lines: quoteLines,
    });
  }

  const [groups, setGroups] = useState<QuoteGroup[]>(defaultGroups);

  const updateGroup = (groupIndex: number, updatedGroup: QuoteGroup) => {
    setGroups(
      groups.map((group, index) =>
        index === groupIndex ? updatedGroup : group
      )
    );
  };

  const handleLineAction = (
    groupIndex: number,
    lineIndex: number,
    action: LineAction
  ) => {
    console.time("handleLineAction");

    const newGroups = [...groups];
    console.timeLog("handleLineAction", "newGroups");

    const group = { ...newGroups[groupIndex] };
    console.timeLog("handleLineAction", "group");

    const lines = [...group.lines];
    console.timeLog("handleLineAction", "lines");

    switch (action) {
      case "moveUp":
        if (lineIndex > 0) {
          [lines[lineIndex - 1], lines[lineIndex]] = [
            lines[lineIndex],
            lines[lineIndex - 1],
          ];
        }
        break;
      case "moveDown":
        if (lineIndex < lines.length - 1) {
          [lines[lineIndex], lines[lineIndex + 1]] = [
            lines[lineIndex + 1],
            lines[lineIndex],
          ];
        }
        break;
      case "copy":
        const newLine = { ...lines[lineIndex], id: Date.now().toString() };
        lines.splice(lineIndex + 1, 0, newLine);
        break;
      case "delete":
        lines.splice(lineIndex, 1);
        break;
    }

    group.lines = lines;
    console.timeLog("handleLineAction", "lines");

    group.total = lines.reduce((sum, line) => sum + line.totalPrice, 0);
    console.timeLog("handleLineAction", "total");

    newGroups[groupIndex] = group;
    console.timeLog("handleLineAction", "groupIndex");

    setGroups(newGroups);
    console.timeLog("handleLineAction", "newGroups");

    console.timeEnd();
  };

  const addGroup = () => {
    setGroups([
      ...groups,
      {
        id: Date.now().toString(),
        total: 0,
        lines: [],
      },
    ]);
  };

  return (
    <QuoteBuilderContext.Provider
      value={{ groups, updateGroup, handleLineAction, addGroup }}
    >
      {children}
    </QuoteBuilderContext.Provider>
  );
};
