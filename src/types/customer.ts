

export interface Customer {
  id: string;
  name: string;
  email: string;
  [key: string]: unknown;
}

export interface CreateCustomerRequest {
  name: string;
  email: string;
}

export type UpdateCustomerRequest = Partial<CreateCustomerRequest>;
