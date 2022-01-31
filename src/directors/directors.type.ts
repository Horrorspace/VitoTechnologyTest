import {Movie} from '../movies/movies.type';


export interface Director {
    _id: string;
    name: string;
    movies: string[];
}

export interface DirectorResponse {
    _id: string;
    name: string;
    movies: Movie[];
}

export interface directorArgs {
    num?: number;
    offset?: number;
    name?: string;
    movie?: string;
}
