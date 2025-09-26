'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { cn } from '@/lib/utils';
import { pricingPath, signInPath, signUpPath } from '@/paths';
import { getActivePath } from '@/utils/get-active-path';
import { navItems } from '../constants';
import { SidebarItem } from './sidebar-item';

// Note: I don't really like this whole sidebar implementation. But I'll leave it as is to continue with the course.
export function Sidebar() {
  const { user, isFetched } = useAuth();

  const pathName = usePathname();

  const { activeIndex } = getActivePath(
    pathName,
    navItems.map((navItem) => navItem.href),
    [signInPath(), signUpPath(), pricingPath()]
  );

  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  if (!isFetched || !user) {
    return <div className="w-[68px] bg-secondary/20" />;
  }

  return (
    <nav
      className={cn(
        'animate-sidebar-from-left',
        'h-screen border-r pt-24',
        isTransition && 'duration-200',
        isOpen ? 'md:w-60 w-[78px]' : 'w-[68px]'
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
              isActive={index === activeIndex}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
}
