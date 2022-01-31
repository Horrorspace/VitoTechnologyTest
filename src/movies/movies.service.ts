import {Injectable, Inject} from '@nestjs/common';
import {Movie, moviesArgs, MovieResponse} from './movies.type';
import {Director} from '../directors/directors.type';
import {DBService} from '../db/db.service';
import {DirectorsService} from '../directors/directors.service';
import {ActorsService} from '../actors/actors.service';
import { Actor } from 'actors/actors.type';


@Injectable()
export class MoviesService {
    constructor(
        @Inject(DBService) private readonly dbService: DBService,
        @Inject(DirectorsService) private readonly directorsService: DirectorsService,
        @Inject(ActorsService) private readonly actorsService: ActorsService
    ) {}

    public async getMovieById(id: string): Promise<Movie | null> {
        return await this.dbService.getMovie(id);
    }

    public async getMovies(options: moviesArgs): Promise<Movie[]> {
        return await this.dbService.getMovies(options);
    }

    public async getMovieByIdResponse(id: string): Promise<MovieResponse | null> {
        const movieData = await this.dbService.getMovie(id);

        if(movieData) {
            let actors: Actor[] = [];
            const director: Director = (await this.directorsService.getDirectors({name: movieData.director}))[0];
            const actorsData = movieData.actors;

            for(let i in actorsData) {
                const actor = (await this.actorsService.getActors({name: actorsData[i]}))[0];
                actors.push(actor);
            }

            return {
                ...movieData,
                director,
                actors
            }
        }
        else {
            return null;
        }
    }

    public async getMoviesResponse(options: moviesArgs): Promise<MovieResponse[]> {
        const movieData = await this.dbService.getMovies(options);
        const directorsDBData = await this.directorsService.getDirectors({});
        const actorsDBData = await this.actorsService.getActors({});

        let movies: MovieResponse[] = [];

        for(let i in movieData) {
            let actors: Actor[] = [];
            const director: Director = directorsDBData.filter(d => d.name === movieData[i].director)[0];
            const actorsData = movieData[i].actors;

            for(let i in actorsData) {
                const actor = actorsDBData.filter(a => a.name === actorsData[i])[0];
                actors.push(actor);
            }

            const movie: MovieResponse = {
                ...movieData[i],
                director,
                actors
            }
            movies.push(movie);
        }

        return movies;
    }
}

