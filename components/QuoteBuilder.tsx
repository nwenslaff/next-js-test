"use client";

import { useQuoteBuilder } from "../contexts/QuoteBuilderContext";
import QuoteGroup from "./QuoteGroup";
import { Button } from "@/components/ui/button";

export default function QuoteBuilder() {
  const { groups, addGroup } = useQuoteBuilder();

  return (
    <div className="container mx-auto p-4 space-y-4">
      {groups.map((group, index) => (
        <QuoteGroup key={group.id} group={group} groupIndex={index} />
      ))}
      <Button
        className="w-full border-2 border-dashed border-gray-200 hover:border-gray-300"
        variant="ghost"
        onClick={addGroup}
      >
        Add Group
      </Button>
    </div>
  );
}
