"use client";

import { QuoteBuilderProvider } from "../contexts/QuoteBuilderContext";
import QuoteBuilder from "../components/QuoteBuilder";

export default function Page() {
  return (
    <QuoteBuilderProvider>
      <QuoteBuilder />
    </QuoteBuilderProvider>
  );
}
