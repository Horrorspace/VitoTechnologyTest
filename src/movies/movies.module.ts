import {Module} from '@nestjs/common';
import {MoviesResolver} from './movies.resolver';
import {MoviesService} from './movies.service';
import {DBModule} from '../db/db.module';
import {DirectorsModule} from '../directors/directors.module';
import {ActorsModule} from '../actors/actors.module';


@Module({
    controllers: [],
    providers: [MoviesResolver, MoviesService],
    imports: [DBModule, DirectorsModule, ActorsModule],
    exports: [MoviesResolver, MoviesService]
})
export class MoviesModule {}
