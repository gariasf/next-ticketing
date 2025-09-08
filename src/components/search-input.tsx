'use client';

import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';
import { searchParser } from '@/features/ticket/search-params';
import { Input } from './ui/input';

type SearchInput = {
  placeholder: string;
};

export function SearchInput({ placeholder }: SearchInput) {
  const [search, setSearch] = useQueryState('search', searchParser);

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250
  );

  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={search}
    />
  );
}
