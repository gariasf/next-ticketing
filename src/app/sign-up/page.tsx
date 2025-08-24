import Link from 'next/link';
import { CardCompact } from '@/components/card-compact';
import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { signInPath } from '@/paths';

export default function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign Up"
        description="Create a new account"
        className="w-full max-w-[480px]"
        content={<SignUpForm />}
        footer={
          <Link href={signInPath()} className="text-sm text-muted-foreground">
            Already have an account? Sign in
          </Link>
        }
      />
    </div>
  );
}
