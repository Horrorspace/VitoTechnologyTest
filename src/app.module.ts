import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {DBModule} from './db/db.module';
import {MoviesModule} from './movies/movies.module';
import {DirectorsModule} from './directors/directors.module';
import {ActorsModule} from './actors/actors.module';



@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'build/schema.gql'),
        }),
        DBModule,
        MoviesModule,
        DirectorsModule,
        ActorsModule
    ],
    exports: []
})
export class AppModule {}