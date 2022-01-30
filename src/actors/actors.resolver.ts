import {Inject} from '@nestjs/common';
import {Resolver, Query, Args, Int} from '@nestjs/graphql';
import {Actor, actorArgs} from './actors.type';
import {Actor as schema} from './actors.schema';
import {ActorsService} from './actors.service';



@Resolver(() => schema)
export class ActorsResolver {
    constructor(
        @Inject(ActorsService) private readonly actorsService: ActorsService
    ) {}

    
    @Query(() => schema, {nullable: true})
    public async actor(@Args('id', {type: () => String}) id: string): Promise<Actor | null> {
        return await this.actorsService.getActorById(id);
    }

    @Query(() => [schema])
    public async actors(
        @Args('number', {type: () => Int, nullable: true}) num: number,
        @Args('offset', {type: () => Int, nullable: true}) offset: number,
        @Args('name', {type: () => String, nullable: true}) name: string,
        @Args('movie', {type: () => String, nullable: true}) movie: string,
    ): Promise<Actor[]> {
        const options: actorArgs = {
            num,
            offset,
            name,
            movie
        }
        return await this.actorsService.getActors(options);
    }
}
