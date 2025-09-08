'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export type SortSelectOption = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  value: SortObject;
  onChangeAction: (sort: SortObject) => void;
  options: SortSelectOption[];
};

export function SortSelect({
  value,
  onChangeAction,
  options,
}: SortSelectProps) {
  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split('_');

    onChangeAction({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select
      onValueChange={handleSort}
      defaultValue={value.sortKey + '_' + value.sortValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + '_' + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
