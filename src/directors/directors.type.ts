export interface Director {
    _id: string;
    name: string;
    movies: string[];
}

export interface directorArgs {
    num: number;
    offset: number;
    name: string;
    movie: string;
}
