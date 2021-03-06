import {Field, ObjectType} from '@nestjs/graphql';


@ObjectType()
export class Director {
    @Field(type => String, {
        description: 'Unique identificator'
    })
    _id!: string;

    @Field(type => String, {
        description: `Director's name`
    })
    name!: string;

    @Field(type => [String], {
        description: "Array of movies titles, which directed by the director"
    })
    movies!: string[];
}