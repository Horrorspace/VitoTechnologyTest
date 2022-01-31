import Nano from 'nano';
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


nano.db.destroy('movies');
nano.db.destroy('directors');
nano.db.destroy('actors');