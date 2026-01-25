import { Search } from "lucide-react";
import Form from "next/form";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  searchParams?: string;
  className?: string;
}

export default function SearchInput({
  searchTerm,
  setSearchTerm,
  placeholder,
  searchParams,
  className,
}: SearchProps) {
  const handleSearch = useDebouncedCallback((search: string) => {
    setSearchTerm(search);
  }, 500);
  return (
    <div className="flex w-full items-center space-x-2 rounded-md  bg-card shadow-none">
      <Form action={""} className="relative w-full">
        <Search className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-500" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          name={searchParams}
          onChange={(e) => handleSearch(e.target.value)}
          className={cn("pl-8", className)}
        />
      </Form>
    </div>
  );
}
