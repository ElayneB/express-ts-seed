import * as express from 'express';
import * as fs from 'fs';
import * as config from './config';

import * as glob from 'glob';

var port: number = process.env.PORT || 9000;
var app: express.Application = express();
//register global middleware first, then all sub apps

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening on ', host, port);
});

function loadModules(app, config) {
    registerModules(app, config.globalMiddlewareDir);
    registerModules(app, config.modules);
}

function registerModules(app: express.Application, path: string, grep: RegExp=null) {
    var fileNames: Array<string> = glob.sync(path);
    for (var fileName of fileNames) {
        if (!grep || grep.test(fileName)) {
            //where is es6 dynamic module loading :(?
            var module = require(config.clientDir + '/' + fileName);
            module(app);
        }
    }
}
