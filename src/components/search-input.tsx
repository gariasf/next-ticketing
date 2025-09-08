'use client';

import { useDebouncedCallback } from 'use-debounce';
import { Input } from './ui/input';

type SearchInput = {
  value: string;
  onChangeAction: (value: string) => void;
  placeholder: string;
};

export function SearchInput({
  value,
  onChangeAction,
  placeholder,
}: SearchInput) {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAction(event.target.value);
    },
    250
  );

  return (
    <Input
      defaultValue={value}
      onChange={handleSearch}
      placeholder={placeholder}
    />
  );
}
