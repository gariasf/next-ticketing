import Link from 'next/link';
import { CardCompact } from '@/components/card-compact';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { passwordResetPath, signUpPath } from '@/paths';

export default function SignInPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<SignInForm />}
        footer={
          <div className="flex-1 flex justify-between">
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No account yet?
            </Link>

            <Link
              className="text-sm text-muted-foreground"
              href={passwordResetPath()}
            >
              Forgot Password?
            </Link>
          </div>
        }
      />
    </div>
  );
}
