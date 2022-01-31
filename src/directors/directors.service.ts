import {Injectable, Inject, forwardRef} from '@nestjs/common';
import {DBService} from '../db/db.service';
import {MoviesService} from '../movies/movies.service';
import {Director, directorArgs, DirectorResponse} from './directors.type';
import {Movie} from '../movies/movies.type';


@Injectable()
export class DirectorsService {
    constructor(
        @Inject(DBService) private readonly dbService: DBService,
        @Inject(forwardRef(() => MoviesService)) private readonly moviesService: MoviesService
    ) {}

    public async getDirectorById(id: string): Promise<Director | null> {
        return await this.dbService.getDirector(id);
    }

    public async getDirectors(options: directorArgs): Promise<Director[]> {
        return await this.dbService.getDirectors(options);
    }

    public async getDirectorByIdResponse(id: string): Promise<DirectorResponse | null> {
        const directorsData = await this.dbService.getDirector(id);

        if(directorsData) {
            let movies: Movie[] = [];
            const moviesData = directorsData.movies;

            for(let i in moviesData) {
                const movie = (await this.moviesService.getMovies({title: moviesData[i]}))[0];
                movies.push(movie);
            }

            return {
                ...directorsData,
                movies
            }
        }
        else {
            return null;
        }
    }

    public async getDirectorsResponse(options: directorArgs): Promise<DirectorResponse[]> {
        const directorsData = await this.dbService.getDirectors(options);
        const moviesDBData = await this.moviesService.getMovies({});

        let directors: DirectorResponse[] = [];

        for(let i in directorsData) {
            let movies: Movie[] = [];
            const moviesData = directorsData[i].movies;

            for(let i in moviesData) {
                const movie = moviesDBData.filter(m => m.title === moviesData[i])[0];
                movies.push(movie);
            }

            const director: DirectorResponse = {
                ...directorsData[i],
                movies
            }
            directors.push(director);
        }

        return directors;
    }
}

