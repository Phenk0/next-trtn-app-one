"use client";

import { Input } from "@/components/ui/input";

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => Promise<URLSearchParams>;
};

const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={handleSearchChange}
    />
  );
};

export { SearchInput };
