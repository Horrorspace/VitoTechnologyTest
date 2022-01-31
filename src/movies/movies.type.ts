import {Director} from '../directors/directors.type';
import {Actor} from '../actors/actors.type';


export interface Movie {
    _id: string;
    title: string;
    director: string;
    actors: string[];
    year: number;
}

export interface MovieResponse {
    _id: string;
    title: string;
    director: Director;
    actors: Actor[];
    year: number;
}

export interface moviesArgs {
    num?: number;
    offset?: number;
    title?: string;
    director?: string;
    actor?: string;
    year?: number;
}