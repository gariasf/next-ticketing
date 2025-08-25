import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { getAuth } from '@/features/auth/actions/get-auth';
import { signInPath } from '@/paths';

export default async function AuthenticatedLayout({
  children,
}: PropsWithChildren) {
  // Bit of a naïve approach because this does not guarantee security and also opts all children out of static rendering.
  // But it's convenient and works for now.
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath());
  }

  return <>{children}</>;
}
