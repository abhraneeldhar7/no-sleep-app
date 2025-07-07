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