import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const terms = `Insert Terms of Service content here.`;
const privacy = `Insert Privacy Policy content here.`;

export default function LegalPages() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Legal</h1>
      <Tabs defaultValue="terms" className="w-full">
        <TabsList className="flex justify-center mb-4">
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="terms">
          <div className="prose max-w-none whitespace-pre-wrap">
            {terms}
          </div>
        </TabsContent>

        <TabsContent value="privacy">
          <div className="prose max-w-none whitespace-pre-wrap">
            {privacy}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

