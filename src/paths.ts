export const homePath = () => '/';

export const ticketsPath = () => '/tickets';
export const ticketPathFor = (id: string) => `${ticketsPath()}/${id}`;
export const ticketEditPathFor = (id: string) => `${ticketPathFor(id)}/edit`;
