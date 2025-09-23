'use client';

import { Placeholder } from '@/components/placeholder';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex-1 flex justify-center">
      <Placeholder label={error.message || 'An unknown error occurred'} />
    </div>
  );
}
