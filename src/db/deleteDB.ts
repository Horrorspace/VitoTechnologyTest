import Nano from 'nano';


const nano = Nano('http://admin:968574@localhost:5984');


nano.db.destroy('movies');
nano.db.destroy('directors');
nano.db.destroy('actors');