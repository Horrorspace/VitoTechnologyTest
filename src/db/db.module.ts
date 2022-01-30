import {Module} from '@nestjs/common';
import {DBService} from './db.service';


@Module({
    controllers: [],
    providers: [DBService],
    imports: [],
    exports: [DBService]
})
export class DBModule {}
