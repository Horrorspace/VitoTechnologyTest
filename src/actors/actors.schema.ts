import {Field, ObjectType} from '@nestjs/graphql';


@ObjectType()
export class Actor {
    @Field(type => String, {
        description: 'Unique identificator'
    })
    _id!: string;

    @Field(type => String, {
        description: `Actor's name`
    })
    name!: string;

    @Field(type => [String], {
        description: "Array of movies titles, the actor has been played in"
    })
    movies!: string[];
}