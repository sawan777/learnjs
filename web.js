let http = require('http');
let url = require('url');
let render_ssp = require('./render_ssp');
let serveFile = require('./serveFile');
let score = require('./score');
let todo = require('./todo/js/todo');

function handler(req, res) {
    // console.log('request.headers:', req.headers);
    let q = url.parse(req.url, true);
    if (q.pathname.endsWith('.ssp')) {
        render_ssp.renderSsp(res, q);
    }
    else if (q.pathname.startsWith('/todo/')) {
        todo.route(req, res, q);
    }
    else if (q.pathname == '/score') {
        score.score(res);
    }
    else if (q.pathname == '/score_api') {
        score.score_json(res);
    }
    
    else if (q.pathname == '/updatescore') {
        score.updatescore(res, q);
    }
    else if (q.pathname.startsWith('/static/')) {
        serveFile.serveFile(res, q);
    }
    else {
        return serveFile.file_not_found(res);
    }
}

//create a server object:
http.createServer(handler).listen(8080); //the serve
console.log('Server started..');