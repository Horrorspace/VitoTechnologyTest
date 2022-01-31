import {Inject} from '@nestjs/common';
import {Resolver, Query, Args, Int} from '@nestjs/graphql';
import {MoviesService} from './movies.service';
import {MovieResponse as schema} from './moviesResponse.schema';
import {moviesArgs, MovieResponse} from './movies.type';



@Resolver(() => schema)
export class MoviesResolver {
    constructor(
        @Inject(MoviesService) private readonly moviesService: MoviesService
    ) {}


    @Query(() => schema, {nullable: true})
    public async movie(
        @Args('id', {type: () => String, description: 'Unique identificator of the movie'}) id: string
    ): Promise<MovieResponse | null> {
        return await this.moviesService.getMovieByIdResponse(id);
    }

    @Query(() => [schema])
    public async movies(
        @Args('number', {type: () => Int, nullable: true, description: 'number of getting entries'}) num: number,
        @Args('offset', {type: () => Int, nullable: true, description: 'number of skiping entries'}) offset: number,
        @Args('title', {type: () => String, nullable: true, description: 'title of movie, which entry have to be got'}) title: string,
        @Args('director', {type: () => String, nullable: true, description: 'name of director, whose movies entries have to be got'}) director: string,
        @Args('actor', {type: () => String, nullable: true, description: 'name of actor, whose movies entries have to be got'}) actor: string,
        @Args('year', {type: () => Int, nullable: true, description: 'Release yearб according to which movies have to be got'}) year: number
    ): Promise<MovieResponse[]> {
        const options: moviesArgs = {
            num,
            offset,
            title,
            director,
            actor,
            year
        }
        return await this.moviesService.getMoviesResponse(options);
    }
}
