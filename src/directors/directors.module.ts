import {Module} from '@nestjs/common';
import {DBModule} from '../db/db.module';
import {DirectorsResolver} from './directors.resolver';
import {DirectorsService} from './directors.service';


@Module({
    controllers: [],
    providers: [DirectorsResolver, DirectorsService],
    imports: [DBModule],
    exports: [DirectorsResolver, DirectorsService]
})
export class DirectorsModule {}
