import {Field, Int, ObjectType} from '@nestjs/graphql';


@ObjectType()
export class Movie {
    @Field(type => String)
    _id!: string;

    @Field(type => String)
    title!: string;

    @Field(type => String)
    director!: string;

    @Field(type => [String])
    actors!: string[];

    @Field(type => Int)
    year!: number;
}