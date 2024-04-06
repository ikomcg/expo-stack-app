type RequestApi = {
  abortController?: AbortController;
  token: string;
  signal?: AbortSignal;
  params?: { [key: string]: string | number };
  limit?: number;
  page?: number;
  endPoint?: string;
  data?: { [key: string]: unknown };
  cancelToken?: unknown;
};

type LogKeys = {
  username: string;
  password: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
};

type List<T, F = object> = {
  filters?: F;
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
};

type SchoolDomainType = {
  name: string;
  domains: {
    domain: string;
  }[];
};
