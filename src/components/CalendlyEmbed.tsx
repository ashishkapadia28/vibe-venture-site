"use client";

import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";

export function CalendlyEmbed() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="w-full h-full min-h-[600px] bg-background flex items-center justify-center text-muted-foreground">Loading Calendar...</div>;
  }

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="text-center pt-8 pb-2">
        <h3 className="text-2xl font-heading font-bold text-foreground">One to One Meet</h3>
        <div className="w-12 h-1 bg-primary mx-auto mt-3 rounded-full opacity-80" />
      </div>
      <div className="flex-1 w-full pb-4">
        <InlineWidget 
          url="https://calendly.com/ashishkdevs/30min" 
          styles={{ height: "520px", width: "100%" }}
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: true,
            hideLandingPageDetails: true,
            primaryColor: '7c3aed',
            textColor: '000000'
          }}
        />
      </div>
    </div>
  );
}
