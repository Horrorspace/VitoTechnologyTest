import {Module, forwardRef} from '@nestjs/common';
import {DBModule} from '../db/db.module';
import {MoviesModule} from '../movies/movies.module';
import {DirectorsResolver} from './directors.resolver';
import {DirectorsService} from './directors.service';


@Module({
    controllers: [],
    providers: [DirectorsResolver, DirectorsService],
    imports: [DBModule, forwardRef(() => MoviesModule)],
    exports: [DirectorsResolver, DirectorsService]
})
export class DirectorsModule {}
