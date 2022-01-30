import {Inject} from '@nestjs/common';
import {Resolver, Query, Args, Int} from '@nestjs/graphql';
import {Director, directorArgs} from './directors.type';
import {Director as schema} from './directors.schema';
import {DirectorsService} from './directors.service';



@Resolver(() => schema)
export class DirectorsResolver {
    constructor(
        @Inject(DirectorsService) private readonly directorsService: DirectorsService
    ) {}

    
    @Query(() => schema, {nullable: true})
    public async director(@Args('id', {type: () => String}) id: string): Promise<Director | null> {
        return await this.directorsService.getDirectorById(id);
    }

    @Query(() => [schema])
    public async directors(
        @Args('number', {type: () => Int, nullable: true}) num: number,
        @Args('offset', {type: () => Int, nullable: true}) offset: number,
        @Args('name', {type: () => String, nullable: true}) name: string,
        @Args('movie', {type: () => String, nullable: true}) movie: string,
    ): Promise<Director[]> {
        const options: directorArgs = {
            num,
            offset,
            name,
            movie
        }
        return await this.directorsService.getDirectors(options);
    }
}
