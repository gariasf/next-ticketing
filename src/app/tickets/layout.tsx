import { PropsWithChildren } from 'react';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';

export default async function AuthenticatedLayout({
  children,
}: PropsWithChildren) {
  // Bit of a naïve approach because this does not guarantee security and also opts all children out of static rendering.
  // But it's convenient and works for now.
  await getAuthOrRedirect();

  return <>{children}</>;
}
