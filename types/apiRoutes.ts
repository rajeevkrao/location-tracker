export interface ApiResponse {
    status: string;
    message?: string;
    obj?: any;
}

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';