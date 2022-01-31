import Nano from 'nano';
import moviesData from '../data/movies.json';
import {Movie} from '../movies/movies.type';
import {Director} from '../directors/directors.type';
import {Actor} from '../actors/actors.type';
import {config} from 'dotenv';
import {resolve} from 'path';


config({
    path: resolve(process.cwd(), `.${process.env.NODE_ENV}.env`)
});

const login: string = process.env.DB_USERNAME || '';
const password: string = process.env.DB_PASSWORD || '';
const protocol: string = process.env.DB_PROTOCOL || 'http';
const host: string = process.env.DB_HOST || 'localhost';
const port: number = Number(process.env.DB_PORT) || 5984; 

const nano = Nano(`${protocol}://${login}:${password}@${host}:${port}`);


interface moviesData {
    movies: Movie[];
}

moviesData as moviesData;


const moviesList = moviesData.movies;

async function start(): Promise<void> {
    await nano.db.create('movies');
    await nano.db.create('directors');
    await nano.db.create('actors');

    const moviesDB = nano.use('movies');
    const directorsDB = nano.use('directors');
    const actorsDB = nano.use('actors');

    await moviesDB.createIndex({
        name: 'moviesIndex',
        index: {
            fields: [
                'year'
            ]
        }
    });

    let directorsList: string[] = [];
    let actorsList: string[] = [];
    
    for(let i in moviesList) {
        await moviesDB.insert(moviesList[i]);

        const {director, actors} = moviesList[i];

        if(directorsList.indexOf(director) < 0) {
            directorsList.push(director);
        }

        actors.forEach(actor => {
            if(actorsList.indexOf(actor) < 0) {
                actorsList.push(actor);
            }
        });
    }

    const moviesData = await moviesDB.list();
    const limit = moviesData.rows.length;

    let k = 1;
    for(let i in directorsList) {
        const res = await moviesDB.find({
            selector: {
                year: {'$gte': 0},
                director: {'$eq': directorsList[i]}
            },
            fields: [
                '_id',
                'title',
                'director',
                'actors',
                'year'
            ],
            limit,
            sort: ['year'],
            use_index: 'moviesIndex'
        });
        const docs = res.docs as unknown;
        const moviesData = docs as Movie[];
        const movies: string[] = moviesData.map(m => m.title);

        const doc: Director = {
            _id: `${k}`,
            name: directorsList[i],
            movies
        }
        
        await directorsDB.insert(doc);
        k++;
    }

    k = 1;
    for(let i in actorsList) {
        const res = await moviesDB.find({
            selector: {
                year: {'$gte': 0},
                actors: {'$elemMatch': {
                    "$eq": actorsList[i]
                }}
            },
            fields: [
                '_id',
                'title',
                'director',
                'actors',
                'year'
            ],
            limit,
            sort: ['year'],
            use_index: 'moviesIndex'
        });
        const docs = res.docs as unknown;
        const moviesData = docs as Movie[];
        const movies: string[] = moviesData.map(m => m.title);

        const doc: Actor = {
            _id: `${k}`,
            name: actorsList[i],
            movies
        }
        
        await actorsDB.insert(doc);
        k++;
    }
}

start();