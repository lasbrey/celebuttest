import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsSection = () => {
  return (
    <Tabs defaultValue="contents" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
        <TabsTrigger
          value="contents"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Contents
        </TabsTrigger>
        <TabsTrigger
          value="celebrated"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Celebrated
        </TabsTrigger>
        <TabsTrigger
          value="business"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Business
        </TabsTrigger>
      </TabsList>
      <TabsContent value="contents">
        {/* Contents content goes here */}
      </TabsContent>
    </Tabs>
  );
};

export default TabsSection;
