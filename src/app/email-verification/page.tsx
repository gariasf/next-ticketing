import { CardCompact } from '@/components/card-compact';
import { EmailVerificationForm } from '@/features/auth/components/email-verification-form';
import { EmailVerificationResendForm } from '@/features/auth/components/email-verification-resend-form';

export default function EmailVerificationPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Email Verification"
        description="Verify your email address"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={
          <div className="flex flex-col gap-y-2">
            <EmailVerificationForm />
            <EmailVerificationResendForm />
          </div>
        }
      />
    </div>
  );
}
