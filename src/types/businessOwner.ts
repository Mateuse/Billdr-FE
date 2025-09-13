

export interface BusinessOwner {
  id: string;
  company_name: string;
  [key: string]: unknown;
}

export interface CreateBusinessOwnerRequest {
  company_name: string;
}

export type UpdateBusinessOwnerRequest = Partial<CreateBusinessOwnerRequest>;
