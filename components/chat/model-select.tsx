"use client";
import cookies from "js-cookie";
import { Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import type { Model } from "~/lib/drizzle";

import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ModelIcons } from "~/lib/ai/models";
import { trpc } from "~/lib/backend/trpc/client";
import { cn } from "~/lib/utils";

import { ModelSelectorSkelton } from "../skeletons";

export function ModelSelector() {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>();

  const { data: models, isLoading } = trpc.models.useQuery();

  useEffect(() => {
    if (selectedModel) {
      cookies.set("model.id", selectedModel.id.toString(), {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    }
  }, [selectedModel]);

  useEffect(() => {
    if (models && !selectedModel) {
      const modelId = cookies.get("model.id");
      const cookieModel = modelId ? models.find((m) => m.id === modelId) : null;

      if (cookieModel) {
        setSelectedModel(cookieModel);
      } else {
        const defaultModel = models.find((m) => m.isDefault);
        if (defaultModel) setSelectedModel(defaultModel);
      }
    }
  }, [models, selectedModel]);

  const filteredModels = useMemo(() => {
    return models?.filter((model) => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, models]);

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setOpen(false);
    setSearchQuery("");
  };

  const SelectedModelIcon = selectedModel ? ModelIcons[selectedModel.type] : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={isLoading}>
        {isLoading ? (
          <ModelSelectorSkelton />
        ) : (
          <Button
            variant="outline"
            className="h-auto w-fit max-w-xs justify-between border-none bg-none p-1.5 shadow-none outline-hidden focus-within:bg-transparent"
            onClick={() => setOpen(!open)}
          >
            {selectedModel && (
              <div key={selectedModel.id} className="flex items-center space-x-3">
                <div className="shrink-0">
                  {SelectedModelIcon && <SelectedModelIcon size={28} />}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="text-sm font-medium">{selectedModel.name}</div>
                </div>
              </div>
            )}
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent className="w-100 p-0" align="start">
        <div className="border-b p-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 border-0  pl-10 shadow-none outline-0  focus-within:border-0 focus-within:outline-hidden focus:border-0 focus:outline-0 "
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
                      "flex w-full cursor-pointer items-start gap-2 rounded-lg p-3 transition-colors hover:bg-muted/50 disabled:cursor-not-allowed disabled:bg-none disabled:text-muted-foreground ",
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
                    <div className="shrink-0 ">{<Icon size={18} />}</div>
                    <div className="flex min-w-0">
                      <div className="text-sm font-medium">{model.name}</div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p className="text-sm">No models found matching your search.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
