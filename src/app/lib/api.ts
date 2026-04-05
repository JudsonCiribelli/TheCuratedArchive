const api_url = process.env.NEXT_PUBLIC_API_URL as string;

export function getApiUrl() {
  return api_url;
}

interface FetchOptions extends RequestInit {
  token?: string;

  cache?: "force-cache" | "no-store";

  next?: {
    revalidate?: false | number | 0;
    tags?: string[];
  };
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(fetchOptions.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${api_url}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Error HTTP: " + response.status,
    }));
    throw new Error(error.error || "Error HTTP: " + response.status);
  }

  return response.json();
}
