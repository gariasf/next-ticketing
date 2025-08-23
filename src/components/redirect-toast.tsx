'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { consumeCookiedByKey } from '@/actions/cookies';

export function RedirectToast() {
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await consumeCookiedByKey('toast');

      if (message) {
        toast.success(message);
      }
    };

    showCookieToast();
  }, []);

  return null;
}
