import * as express from 'express';

export function log(req: express.Request, res: express.Request, next: Function) {
    console.log(req);
}
