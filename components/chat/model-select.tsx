"use client";
import { ModelIcons } from "~/lib/ai/models";
import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import type { Model } from "~/lib/drizzle";
import cookies from "js-cookie";
import { ModelSelectorSkelton } from "../skeletons";
import { trpc } from "~/lib/backend/trpc/client";

export function ModelSelector() {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>();

  const { data: models, isLoading } = trpc.models.useQuery()

  useEffect(() => {
    if (selectedModel) {
      cookies.set("model.id", selectedModel.id.toString(), {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    }
  }, [selectedModel]);

  useEffect(() => {
    if (models) {
      const modelId = cookies.get("model.id");
      if (modelId) {  
        const selectedModel = models.find((m) => m.id === modelId);
        if (selectedModel) setSelectedModel(selectedModel);
      }
      const selectModel = models.find((m) => m.isDefault);
      if (selectModel) setSelectedModel(selectModel);
    }   
  }, [models]);

  const filteredModels = useMemo(() => {
    return models?.filter((model) => {
      const matchesSearch = model.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, models]);

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setOpen(false);
    setSearchQuery("");
  };

  const SelectedModelIcon = selectedModel
    ? ModelIcons[selectedModel.type]
    : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={isLoading}>
        {isLoading ? (
          <ModelSelectorSkelton />
        )
          : <Button
            variant="outline"
            className="w-fit max-w-xs justify-between h-auto p-1.5 focus-within:bg-transparent bg-none outline-hidden border-none shadow-none"
            onClick={() => setOpen(!open)}
          >
            {selectedModel && (
              <div key={selectedModel.id} className="flex items-center space-x-3">
                <div className="shrink-0">
                  {SelectedModelIcon && <SelectedModelIcon size={28} />}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-medium text-sm">{selectedModel.name}</div>
                </div>
              </div>
            )}
          </Button>
        }
      </PopoverTrigger>

      <PopoverContent className="w-100 p-0" align="start">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10  outline-0 border-0 shadow-none  focus:border-0 focus:outline-0 focus-within:border-0 focus-within:outline-hidden "
            />
          </div>
        </div>

        <ScrollArea className="h-75 overflow-auto">
          <div className="p-2">
            {filteredModels && filteredModels?.length > 0 ? (
              filteredModels.map((model) => {
                const Icon = ModelIcons[model.type];
                return (
                  <button
                    type="button"
                    key={model.id}
                    disabled={model.isPremium || false}
                    className={cn(
                      "flex items-start w-full gap-2 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:bg-none ",
                      selectedModel?.id === model.id && "bg-muted/30",
                    )}
                    onClick={() => handleModelSelect(model)}
                    tabIndex={0}
                    aria-label={`Select ${model.name} `}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleModelSelect(model);
                      }
                    }}
                  >
                    <div className="shrink-0 ">
                      {<Icon size={18} />}
                    </div>
                    <div className="flex min-w-0">
                      <div className="font-medium text-sm">{model.name}</div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No models found matching your search.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
