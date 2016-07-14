import * as express from 'express';
import * as fs from 'fs';
import * as config from './config';

import * as glob from 'glob';

var port: number = process.env.PORT || 9000;
var app: express.Application = express();
//register global middleware first, then all sub apps

bootstrap(app, config);
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.info('listening on ', host, port);
});


function bootstrap(app: express.Application, config) {
    //middleware
    console.info('loading middleware');
    registerModules(app, config.globalMiddlewareDir);

    //routers
    console.info('loading routers');
    registerModules(app, config.modules);
}

function registerModules(app: express.Application, path: string) {
    console.info(path);
    var fileNames: Array<string> = glob.sync(path);
    console.info(fileNames);
    for (var fileName of fileNames) {
        console.info(fileName);

        //where is es6 dynamic module loading :(?
        //TODO: research if possible to use ES6 imports here
        var module = require(fileName).default;
        console.info(module);
        app.use(module);
    }
}
