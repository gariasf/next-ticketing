import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { closedClassName } from '../constants';
import { NavItem } from '../types';

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
  isActive: boolean;
};

export function SidebarItem({ isOpen, navItem, isActive }: SidebarItemProps) {
  return (
    <Link
      href={navItem.href}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'group relative flex h-12 justify-start',
        isActive && 'bg-muted font-bold  hover:bg-muted'
      )}
    >
      {navItem.icon}
      <span
        className={cn(
          'absolute left-12 text-base duration-200',
          isOpen ? 'md:block hidden' : 'w-[68px]',
          !isOpen && closedClassName
        )}
      >
        {navItem.title}
      </span>
    </Link>
  );
}
