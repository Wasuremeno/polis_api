export type * from './auth';


export interface Article {
    id: number;
    title: string;
    content: string;
    created_at: string;
    comments?: Comment[];
}

export interface Comment {
    id: number;
    author_name: string;
    content: string;
    created_at: string;
}

export interface PageProps {
    [key: string]: unknown;
}