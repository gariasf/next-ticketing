import {
  LucideBook,
  LucideCircleUser,
  LucideLibrary,
  LucideUsers,
} from 'lucide-react';
import {
  accountProfilePath,
  homePath,
  organizationsPath,
  ticketsPath,
} from '@/paths';
import { NavItem } from './types';

export const navItems: NavItem[] = [
  {
    title: 'All Tickets',
    icon: <LucideLibrary className="size-5" />,
    href: homePath(),
  },
  {
    title: 'My Tickets',
    icon: <LucideBook className="size-5" />,
    href: ticketsPath(),
  },
  {
    separator: true,
    title: 'Account',
    icon: <LucideCircleUser className="size-5" />,
    href: accountProfilePath(),
  },
  {
    title: 'Organization',
    icon: <LucideUsers className="size-5" />,
    href: organizationsPath(),
  },
];

export const closedClassName =
  'text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100';
