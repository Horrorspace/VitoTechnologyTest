import {Module} from '@nestjs/common';
import {MoviesResolver} from './movies.resolver';
import {MoviesService} from './movies.service';
import {DBModule} from '../db/db.module';


@Module({
    controllers: [],
    providers: [MoviesResolver, MoviesService],
    imports: [DBModule],
    exports: [MoviesResolver, MoviesService]
})
export class MoviesModule {}
