export const homePath = () => '/';

export const ticketsPath = () => '/tickets';
export const ticketPathFor = (id: string) => `${ticketsPath()}/${id}`;
export const ticketEditPathFor = (id: string) => `${ticketPathFor(id)}/edit`;

export const signUpPath = () => '/sign-up';
export const signInPath = () => '/sign-in';
export const passwordForgetPath = () => '/password-forget';
export const passwordResetPath = () => '/password-reset';
export const emailVerificationPath = () => '/email-verification';

export const onboardingPath = () => '/onboarding';

export const organizationsPath = () => '/organization';

export const accountProfilePath = () => '/account/profile';
export const accountPasswordPath = () => '/account/password';
