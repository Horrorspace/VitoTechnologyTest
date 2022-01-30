export interface Actor {
    _id: string;
    name: string;
    movies: string[];
}

export interface actorArgs {
    num: number;
    offset: number;
    name: string;
    movie: string;
}
