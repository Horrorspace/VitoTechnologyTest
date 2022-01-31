import {Field, ObjectType} from '@nestjs/graphql';
import {Movie} from '../movies/movies.schema';
import {Movie as MovieType} from '../movies/movies.type'; 


@ObjectType()
export class DirectorResponse {
    @Field(type => String, {
        description: 'Unique identificator'
    })
    _id!: string;

    @Field(type => String, {
        description: `Director's name`
    })
    name!: string;

    @Field(type => [Movie], {
        description: "Array of movies data objects, which directed by the director"
    })
    movies!: MovieType[];
}