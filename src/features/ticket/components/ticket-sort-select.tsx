'use client';

import { useQueryStates } from 'nuqs';
import { SortSelect, SortSelectOption } from '@/components/sort-select';
import { sortOptions, sortParser } from '../search-params';

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

export function TicketSortSelect({ options }: TicketSortSelectProps) {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return <SortSelect value={sort} onChangeAction={setSort} options={options} />;
}
