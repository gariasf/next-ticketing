import { LucideLoaderCircle } from 'lucide-react';

export function Spinner() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center self-center">
      <LucideLoaderCircle className="animate-spin" />
    </div>
  );
}
