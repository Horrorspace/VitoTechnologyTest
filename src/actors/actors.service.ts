import {Injectable, Inject, forwardRef} from '@nestjs/common';
import {DBService} from '../db/db.service';
import {MoviesService} from '../movies/movies.service';
import {Actor, actorArgs, ActorResponse} from './actors.type';
import {Movie} from '../movies/movies.type';


@Injectable()
export class ActorsService {
    constructor(
        @Inject(DBService) private readonly dbService: DBService,
        @Inject(forwardRef(() => MoviesService)) private readonly moviesService: MoviesService
    ) {}

    public async getActorById(id: string): Promise<Actor | null> {
        return await this.dbService.getActor(id);
    }

    public async getActors(options: actorArgs): Promise<Actor[]> {
        return await this.dbService.getActors(options);
    }

    public async getActorByIdResponse(id: string): Promise<ActorResponse | null> {
        const actorsData = await this.dbService.getActor(id);

        if(actorsData) {
            let movies: Movie[] = [];
            const moviesData = actorsData.movies;

            for(let i in moviesData) {
                const movie = (await this.moviesService.getMovies({title: moviesData[i]}))[0];
                movies.push(movie);
            }

            return {
                ...actorsData,
                movies
            }
        }
        else {
            return null;
        }
    }

    public async getActorsResponse(options: actorArgs): Promise<ActorResponse[]> {
        const actorsData = await this.dbService.getActors(options);
        const moviesDBData = await this.moviesService.getMovies({});

        let actors: ActorResponse[] = [];

        for(let i in actorsData) {
            let movies: Movie[] = [];
            const moviesData = actorsData[i].movies;

            for(let i in moviesData) {
                const movie = moviesDBData.filter(m => m.title === moviesData[i])[0];
                movies.push(movie);
            }

            const director: ActorResponse = {
                ...actorsData[i],
                movies
            }
            actors.push(director);
        }

        return actors;
    }
}

