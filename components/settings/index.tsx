"use client";

import { User, CreditCard, Shield } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import Personalization from "./user";
import Subscription from "./subscription";
import AccountSecurity from "./account";
import { ScrollArea } from "../ui/scroll-area";

export function Settings() {
  return (
    <div className=" max-w-5xl mx-auto p-2 space-y-8 h-full">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="personalization" className="w-full">
        <TabsList>
          <TabsTrigger value="personalization" className="space-x-2">
            <User className="w-4 h-4" />
            <span>Personalization</span>
          </TabsTrigger>
          <TabsTrigger value="subscription" className="space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Subscription</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="space-x-2">
            <Shield className="w-4 h-4" />
            <span>Account and Security</span>
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-220px)] w-full pr-4">
          <TabsContent value="personalization" className="space-y-12">
            <Personalization />
          </TabsContent>

          <TabsContent value="subscription" className="space-y-12">
            <Subscription />
          </TabsContent>
          <TabsContent value="security" className="space-y-12">
            <AccountSecurity />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
