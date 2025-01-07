"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
import { QuoteGroup as QuoteGroupType } from "../types/quote";
import { useQuoteBuilder } from "../contexts/QuoteBuilderContext";
import QuoteLine from "./QuoteLine";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface QuoteGroupProps {
  group: QuoteGroupType;
  groupIndex: number;
}

export default function QuoteGroup({ group, groupIndex }: QuoteGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { handleLineAction } = useQuoteBuilder();

  return (
    <Card className="w-full">
      <CardHeader className="p-4 flex flex-row items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        <span className="font-medium">Group {groupIndex + 1}:</span>
        <span className="font-medium">¥{group.total.toLocaleString()}</span>
        <Button variant="ghost" size="icon" className="ml-auto">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4 pt-0 space-y-4">
          {group.lines.map((line, lineIndex) => (
            <QuoteLine
              key={line.id}
              group={group}
              groupIndex={groupIndex}
              line={line}
              lineIndex={lineIndex}
            />
          ))}
          <Button
            className="w-full border-2 border-dashed border-gray-200 hover:border-gray-300"
            variant="ghost"
            onClick={() =>
              handleLineAction(groupIndex, group.lines.length, "add")
            }
          >
            Add Lines
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
