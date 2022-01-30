import {Injectable} from '@nestjs/common';
import Nano from 'nano';
import {Movie, moviesArgs} from '../movies/movies.type';
import {Director, directorArgs} from '../directors/directors.type';
import {Actor, actorArgs} from '../actors/actors.type';


@Injectable()
export class DBService {
    private static _login: string = process.env.DB_USERNAME || '';
    private static _password: string = process.env.DB_PASSWORD || '';
    private static _protocol: string = process.env.DB_PROTOCOL || 'http';
    private static _host: string = process.env.DB_HOST || 'localhost';
    private static _port: number =Number(process.env.DB_PORT) || 5984;
    private static _db: Nano.ServerScope | null = null;

    constructor() {
        if(!DBService._db) {
            DBService._login = process.env.DB_USERNAME || '';
            DBService._password = process.env.DB_PASSWORD || '';
            DBService._protocol = process.env.DB_PROTOCOL || '';
            DBService._host = process.env.DB_HOST || '';
            DBService._port = Number(process.env.DB_PORT) || 5984;
            DBService._db = Nano(`${DBService._protocol}://${DBService._login}:${DBService._password}@${DBService._host}:${DBService._port}`);
        }
    }

    public async getMovie(id: string): Promise<Movie | null> {
        if(DBService._db) {
            const moviesDB = DBService._db.use('movies');
            const res = await moviesDB.find({
                selector: {
                    year: {'$gte': 0},
                    _id: {'$eq': id}
                },
                fields: [
                    '_id',
                    'title',
                    'director',
                    'actors',
                    'year'
                ],
                sort: ['year'],
                use_index: 'moviesIndex'
            });
            const docsRes = res.docs as unknown;
            const docs = docsRes as Movie[];
            return docs.length > 0 ? docs[0] : null;
        }
        else {
            throw new Error('db is not exist');
        }
    }

    public async getMovies(options: moviesArgs): Promise<Movie[]> {
        if(DBService._db) {
            const moviesDB = DBService._db.use('movies');
            const {
                num,
                offset,
                title,
                director,
                actor,
                year
            } = options;
            let limit: number;
            let skip: number;
            let selector: Nano.MangoSelector = {
                year: {'$gte': 0}
            }
            if(typeof num === 'number' && typeof offset === 'number') {
                limit = num;
                skip = offset;
            }
            else {
                const moviesList = await moviesDB.list();
                limit = moviesList.rows.length;
                skip = 0;
            }
            if(title) {
                selector = {
                    ...selector,
                    title: {'$eq': title}
                }
            }
            if(director) {
                selector = {
                    ...selector,
                    director: {'$eq': director}
                }
            }
            if(actor) {
                selector = {
                    ...selector,
                    actors: {'$elemMatch': {
                        "$eq": actor
                    }}
                }
            }
            if(year) {
                selector = {
                    ...selector,
                    year: {'$eq': year}
                }
            }

            const res = await moviesDB.find({
                selector,
                fields: [
                    '_id',
                    'title',
                    'director',
                    'actors',
                    'year'
                ],
                skip,
                limit,
                sort: ['year'],
                use_index: 'moviesIndex'
            });
            const docs = res.docs as unknown;
            return docs as Movie[];
        }
        else {
            throw new Error('db is not exist');
        }
    }

    public async getDirector(id: string): Promise<Director | null> {
        if(DBService._db) {
            const directorsDB = DBService._db.use('directors');
            const res = await directorsDB.find({
                selector: {
                    _id: {'$eq': id}
                },
                fields: [
                    '_id',
                    'name',
                    'movies',
                ],
            });
            const docsRes = res.docs as unknown;
            const docs = docsRes as Director[];
            return docs.length > 0 ? docs[0] : null;
        }
        else {
            throw new Error('db is not exist');
        }
    }

    public async getDirectors(options: directorArgs): Promise<Director[]> {
        if(DBService._db) {
            const directorsDB = DBService._db.use('directors');
            const {
                num,
                offset,
                name, 
                movie
            } = options;
            let limit: number;
            let skip: number;
            let selector: Nano.MangoSelector = {};

            if(typeof num === 'number' && typeof offset === 'number') {
                limit = num;
                skip = offset;
            }
            else {
                const directorsList = await directorsDB.list();
                limit = directorsList.rows.length;
                skip = 0;
            }
            if(name) {
                selector = {
                    ...selector,
                    name: {'$eq': name}
                }
            }
            if(movie) {
                selector = {
                    ...selector,
                    movies: {'$elemMatch': {
                        "$eq": movie
                    }}
                }
            }

            const res = await directorsDB.find({
                selector,
                fields: [
                    '_id',
                    'name',
                    'movies',
                ],
                skip,
                limit
            });
            const docs = res.docs as unknown;
            return docs as Director[];
        }
        else {
            throw new Error('db is not exist');
        }
    }

    public async getActor(id: string): Promise<Actor | null> {
        if(DBService._db) {
            const actorsDB = DBService._db.use('actors');
            const res = await actorsDB.find({
                selector: {
                    _id: {'$eq': id}
                },
                fields: [
                    '_id',
                    'name',
                    'movies',
                ],
            });
            const docsRes = res.docs as unknown;
            const docs = docsRes as Actor[];
            return docs.length > 0 ? docs[0] : null;
        }
        else {
            throw new Error('db is not exist');
        }
    }

    public async getActors(options: actorArgs): Promise<Director[]> {
        if(DBService._db) {
            const actorsDB = DBService._db.use('actors');
            const {
                num,
                offset,
                name, 
                movie
            } = options;
            let limit: number;
            let skip: number;
            let selector: Nano.MangoSelector = {};

            if(typeof num === 'number' && typeof offset === 'number') {
                limit = num;
                skip = offset;
            }
            else {
                const actorsList = await actorsDB.list();
                limit = actorsList.rows.length;
                skip = 0;
            }
            if(name) {
                selector = {
                    ...selector,
                    name: {'$eq': name}
                }
            }
            if(movie) {
                selector = {
                    ...selector,
                    movies: {'$elemMatch': {
                        "$eq": movie
                    }}
                }
            }

            const res = await actorsDB.find({
                selector,
                fields: [
                    '_id',
                    'name',
                    'movies',
                ],
                skip,
                limit
            });
            const docs = res.docs as unknown;
            return docs as Actor[];
        }
        else {
            throw new Error('db is not exist');
        }
    }
}

