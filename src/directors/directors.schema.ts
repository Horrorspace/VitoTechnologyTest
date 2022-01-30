import {Field, ObjectType} from '@nestjs/graphql';


@ObjectType()
export class Director {
    @Field(type => String)
    _id!: string;

    @Field(type => String)
    name!: string;

    @Field(type => [String])
    movies!: string[];
}