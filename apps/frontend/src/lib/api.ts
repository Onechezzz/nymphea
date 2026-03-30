const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
    
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const data = await this.request<any>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.tokens.accessToken);
    return data;
  }

  async logout() {
    this.setToken(null);
  }

  async getMe() {
    return this.request<any>('/api/auth/me');
  }

  // Aromas
  async getAromas(params?: { search?: string; gender?: string }) {
    const filtered: Record<string, string> = {};
    if (params?.search) filtered.search = params.search;
    if (params?.gender) filtered.gender = params.gender;
    const query = new URLSearchParams(filtered).toString();
    return this.request<any[]>(`/api/aromas${query ? `?${query}` : ''}`);
  }

  async getAroma(id: string) {
    return this.request<any>(`/api/aromas/${id}`);
  }

  async createAroma(data: any) {
    return this.request<any>('/api/aromas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAroma(id: string, data: any) {
    return this.request<any>(`/api/aromas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAroma(id: string) {
    return this.request<any>(`/api/aromas/${id}`, {
      method: 'DELETE',
    });
  }

  async importAromas(aromas: any[]) {
    return this.request<any>('/api/aromas/import', {
      method: 'POST',
      body: JSON.stringify(aromas),
    });
  }

  async exportAromas() {
    const response = await fetch(`${this.baseUrl}/api/aromas/export/json`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  }

  // Public
  async getSnapshot() {
    return this.request<any>('/api/public/snapshot');
  }

  async submitQuiz(data: any) {
    return this.request<any>('/api/public/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
