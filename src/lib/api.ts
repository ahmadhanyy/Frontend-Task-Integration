const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

interface ApiOptions extends RequestInit {
    json?: boolean;
}

export async function api<T>(
    endpoint: string,
    options: ApiOptions = {}
): Promise<T> {
    const { json = true, headers, ...rest } = options;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
        ...(json ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
    },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'API request failed');
    }

    return res.json();
}
