import {Inject} from '@nestjs/common';
import {Resolver, Query, Args, Int} from '@nestjs/graphql';
import {MoviesService} from './movies.service';
import {Movie as schema} from './movies.schema';
import {Movie, moviesArgs} from './movies.type';



@Resolver(() => schema)
export class MoviesResolver {
    constructor(
        @Inject(MoviesService) private readonly moviesService: MoviesService
    ) {}


    @Query(() => schema, {nullable: true})
    public async movie(@Args('id', {type: () => String}) id: string): Promise<Movie | null> {
        return await this.moviesService.getMovieById(id);
    }

    @Query(() => [schema])
    public async movies(
        @Args('number', {type: () => Int, nullable: true}) num: number,
        @Args('offset', {type: () => Int, nullable: true}) offset: number,
        @Args('title', {type: () => String, nullable: true}) title: string,
        @Args('director', {type: () => String, nullable: true}) director: string,
        @Args('actor', {type: () => String, nullable: true}) actor: string,
        @Args('year', {type: () => Int, nullable: true}) year: number
    ): Promise<Movie[]> {
        const options: moviesArgs = {
            num,
            offset,
            title,
            director,
            actor,
            year
        }
        return await this.moviesService.getMovies(options);
    }
}
