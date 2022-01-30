export interface Movie {
    _id: string;
    title: string;
    director: string;
    actors: string[];
    year: number;
}

export interface moviesArgs {
    num: number;
    offset: number;
    title?: string;
    director?: string;
    actor?: string;
    year?: number;
}