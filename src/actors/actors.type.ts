import {Movie} from '../movies/movies.type';


export interface Actor {
    _id: string;
    name: string;
    movies: string[];
}

export interface ActorResponse {
    _id: string;
    name: string;
    movies: Movie[];
}

export interface actorArgs {
    num?: number;
    offset?: number;
    name?: string;
    movie?: string;
}
