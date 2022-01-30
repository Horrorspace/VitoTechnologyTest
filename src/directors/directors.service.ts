import {Injectable, Inject} from '@nestjs/common';
import {DBService} from '../db/db.service';
import {Director, directorArgs} from './directors.type';


@Injectable()
export class DirectorsService {
    constructor(
        @Inject(DBService) private readonly dbService: DBService
    ) {}

    public async getDirectorById(id: string): Promise<Director | null> {
        return await this.dbService.getDirector(id);
    }

    public async getDirectors(options: directorArgs): Promise<Director[]> {
        return await this.dbService.getDirectors(options);
    }
}

