import {Injectable, Inject} from '@nestjs/common';
import {Movie, moviesArgs} from './movies.type';
import {DBService} from '../db/db.service';


@Injectable()
export class MoviesService {
    constructor(
        @Inject(DBService) private readonly dbService: DBService
    ) {}

    public async getMovieById(id: string): Promise<Movie | null> {
        return await this.dbService.getMovie(id);
    }

    public async getMovies(options: moviesArgs): Promise<Movie[]> {
        return await this.dbService.getMovies(options);
    }
}

