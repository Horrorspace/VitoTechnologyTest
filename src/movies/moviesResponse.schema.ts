import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Director} from '../directors/directors.schema';
import {Actor} from '../actors/actors.schema';
import {Director as DirectorType} from '../directors/directors.type'; 
import {Actor as ActorType} from '../actors/actors.type';


@ObjectType()
export class MovieResponse {
    @Field(type => String, {
        description: 'Unique identificator'
    })
    _id!: string;

    @Field(type => String, {
        description: 'Movie title'
    })
    title!: string;

    @Field(type => Director, {
        description: "Movie's director data object"
    })
    director!: DirectorType;

    @Field(type => [Actor], {
        description: "Movie's actors data objects array"
    })
    actors!: ActorType[];

    @Field(type => Int, {
        description: 'Release year'
    })
    year!: number;
}