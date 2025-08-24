'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { consumeCookiedByKey } from '@/actions/cookies';

export function RedirectToast() {
  const pathname = usePathname();

  useEffect(() => {
    const showCookieToast = async () => {
      const message = await consumeCookiedByKey('toast');

      if (message) {
        toast.success(message);
      }
    };

    showCookieToast();
    // Note: The template.tsx file does not re-render reliably on every route change. This is a known bug in Next.js. These issues can be followed the issue here and here.
    // As a workaround, we use the pathname here to trigger its effect on every route change.
  }, [pathname]);

  return null;
}
