const developmentApiBaseUrl = "http://127.0.0.1:8000";

export const apiBaseUrl =
  process.env.NODE_ENV === "development"
    ? developmentApiBaseUrl
    : "";

export async function apiGet(path: `/${string}`, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}
