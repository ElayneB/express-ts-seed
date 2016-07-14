import * as express from 'express';

export default log
function log(req: express.Request, res: express.Response, next: Function) {
    console.log(req);
    next();
}
