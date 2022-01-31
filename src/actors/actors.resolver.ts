import {Inject} from '@nestjs/common';
import {Resolver, Query, Args, Int} from '@nestjs/graphql';
import {ActorResponse, actorArgs} from './actors.type';
import {ActorResponse as schema} from './actorsResponse.schema';
import {ActorsService} from './actors.service';


@Resolver(() => schema)
export class ActorsResolver {
    constructor(
        @Inject(ActorsService) private readonly actorsService: ActorsService
    ) {}

    
    @Query(() => schema, {nullable: true})
    public async actor(
        @Args('id', {type: () => String, description: 'Unique identificator of the director'}) id: string
    ): Promise<ActorResponse | null> {
        return await this.actorsService.getActorByIdResponse(id);
    }

    @Query(() => [schema])
    public async actors(
        @Args('number', {type: () => Int, nullable: true, description: 'number of getting entries'}) num: number,
        @Args('offset', {type: () => Int, nullable: true, description: 'number of skiping entries'}) offset: number,
        @Args('name', {type: () => String, nullable: true, description: 'name of actor, which entry have to be got'}) name: string,
        @Args('movie', {type: () => String, nullable: true, description: 'title of movie, which actors entries have to be got'}) movie: string,
    ): Promise<ActorResponse[]> {
        const options: actorArgs = {
            num,
            offset,
            name,
            movie
        }
        return await this.actorsService.getActorsResponse(options);
    }
}
