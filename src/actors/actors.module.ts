import {Module} from '@nestjs/common';
import {DBModule} from '../db/db.module';
import {ActorsResolver} from './actors.resolver';
import {ActorsService} from './actors.service';


@Module({
    controllers: [],
    providers: [ActorsResolver, ActorsService],
    imports: [DBModule],
    exports: [ActorsResolver, ActorsService]
})
export class ActorsModule {}
