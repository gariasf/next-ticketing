import { format } from 'date-fns';
import { getOrganizationsByUser } from '../queries/get-organizations-by-user';

export async function OrganizationList() {
  const organizations = await getOrganizationsByUser();

  return (
    <div className="animate-fade-from-top">
      {organizations.map((organization) => (
        <div key={organization.id}>
          <div>Name: {organization.name}</div>
          <div>
            Joined At:{' '}
            {format(
              organization.membershipByUser.joinedAt,
              'yyyy-MM-dd, HH:mm'
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
