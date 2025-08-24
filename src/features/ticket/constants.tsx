import { LucideCircleCheck, LucideFileText, LucidePencil } from 'lucide-react';

export const TICKET_ICONS = {
  OPEN: <LucideFileText size={18} />,
  IN_PROGRESS: <LucidePencil size={18} />,
  DONE: <LucideCircleCheck size={18} />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};
