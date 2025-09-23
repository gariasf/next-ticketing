export const homePath = () => '/';

export const ticketsPath = () => '/tickets';
export const ticketsByOrganizationPath = () => '/tickets/organization';
export const ticketPathFor = (id: string) => `${ticketsPath()}/${id}`;
export const ticketEditPathFor = (id: string) => `${ticketPathFor(id)}/edit`;

export const signUpPath = () => '/sign-up';
export const signInPath = () => '/sign-in';
export const passwordForgetPath = () => '/password-forget';
export const passwordResetPath = () => '/password-reset';
export const emailVerificationPath = () => '/email-verification';
export const emailInvitationPath = () => '/email-invitation';

export const onboardingPath = () => '/onboarding';
export const selectActiveOrganizationPath = () =>
  '/onboarding/select-active-organization';

export const organizationsPath = () => '/organization';
export const organizationCreatePath = () => '/organization/create';

export const membershipsPathFor = (organizationId: string) =>
  `/organization/${organizationId}/memberships`;
export const invitationsPath = (organizationId: string) =>
  `/organization/${organizationId}/invitations`;

export const accountProfilePath = () => '/account/profile';
export const accountPasswordPath = () => '/account/password';
