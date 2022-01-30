import {Field, ObjectType} from '@nestjs/graphql';


@ObjectType()
export class Actor {
    @Field(type => String)
    _id!: string;

    @Field(type => String)
    name!: string;

    @Field(type => [String])
    movies!: string[];
}