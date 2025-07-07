export interface userType {
    user_id: string,
    name: string,
    email: string,
    created_at: number
}

export interface projectType {
    id: string,
    owner_id: string,
    name: string,
    description: string,
    created_at: number,
    updated_at: number,
    thumbnail_url: string | null,
}


export interface endpointType {
    id: string,
    project_id: string,
    url: string,
    active: boolean,
    created_at: number,
    updated_at: number
}

export interface apiLog {
    id: string,
    project_id: string,
    url: string,
    timestamp: number,
    status_code: number,
}