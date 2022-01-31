import {Module, forwardRef} from '@nestjs/common';
import {DBModule} from '../db/db.module';
import {MoviesModule} from '../movies/movies.module';
import {ActorsResolver} from './actors.resolver';
import {ActorsService} from './actors.service';


@Module({
    controllers: [],
    providers: [ActorsResolver, ActorsService],
    imports: [DBModule, forwardRef(() => MoviesModule)],
    exports: [ActorsResolver, ActorsService]
})
export class ActorsModule {}
