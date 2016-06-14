import * as express from 'express';
export default function(app: express.Application) {
    app.get('/', root);
}

function root(req: express.Request, res: express.Response) {
    console.log('you hit renderIndex');
    res.send('I am a string');
}
