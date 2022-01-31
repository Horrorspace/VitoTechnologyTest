import {Field, Int, ObjectType} from '@nestjs/graphql';


@ObjectType()
export class Movie {
    @Field(type => String, {
        description: 'Unique identificator'
    })
    _id!: string;

    @Field(type => String, {
        description: 'Movie title'
    })
    title!: string;

    @Field(type => String, {
        description: "Movie's director name"
    })
    director!: string;

    @Field(type => [String], {
        description: "Movie's actors names array"
    })
    actors!: string[];

    @Field(type => Int, {
        description: 'Release year'
    })
    year!: number;
}