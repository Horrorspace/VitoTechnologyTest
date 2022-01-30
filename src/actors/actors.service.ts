import {Injectable, Inject} from '@nestjs/common';
import {DBService} from '../db/db.service';
import {Actor, actorArgs} from './actors.type';


@Injectable()
export class ActorsService {
    constructor(
        @Inject(DBService) private readonly dbService: DBService
    ) {}

    public async getActorById(id: string): Promise<Actor | null> {
        return await this.dbService.getActor(id);
    }

    public async getActors(options: actorArgs): Promise<Actor[]> {
        return await this.dbService.getActors(options);
    }
}

