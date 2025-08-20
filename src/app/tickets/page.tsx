import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { TicketList } from '@/features/ticket/components/ticket-list';

export default function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="TicketsPage"
        description="All your tickets in one place"
      />
      <Suspense>
        <TicketList />
      </Suspense>
    </div>
  );
}
