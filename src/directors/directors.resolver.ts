import {Inject} from '@nestjs/common';
import {Resolver, Query, Args, Int} from '@nestjs/graphql';
import {directorArgs, DirectorResponse} from './directors.type';
import {DirectorResponse as schema} from './directorsResponse.schema';
import {DirectorsService} from './directors.service';



@Resolver(() => schema)
export class DirectorsResolver {
    constructor(
        @Inject(DirectorsService) private readonly directorsService: DirectorsService
    ) {}

    
    @Query(() => schema, {nullable: true})
    public async director(
        @Args('id', {type: () => String, description: 'Unique identificator of the director'}) id: string
    ): Promise<DirectorResponse | null> {
        return await this.directorsService.getDirectorByIdResponse(id);
    }

    @Query(() => [schema])
    public async directors(
        @Args('number', {type: () => Int, nullable: true, description: 'number of getting entries'}) num: number,
        @Args('offset', {type: () => Int, nullable: true, description: 'number of skiping entries'}) offset: number,
        @Args('name', {type: () => String, nullable: true, description: 'name of director, which entry have to be got'}) name: string,
        @Args('movie', {type: () => String, nullable: true, description: 'title of movie, which director entry have to be got'}) movie: string,
    ): Promise<DirectorResponse[]> {
        const options: directorArgs = {
            num,
            offset,
            name,
            movie
        }
        return await this.directorsService.getDirectorsResponse(options);
    }
}
