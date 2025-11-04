"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function DeviceSearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value.trim()) params.set("q", value.trim());
    else params.delete("q");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative w-1/3">
      <Input
        value={query}
        onChange={handleSearchChange}
        placeholder="جستجو دستگاه / نوع / شناسه"
      />
      <SearchIcon className="absolute right-2 top-2" />
    </div>
  );
}
