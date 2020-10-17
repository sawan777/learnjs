let fs = require('fs');
let render_ssp = require('./render_ssp');

let liveScore = {};
const DATA_FILE = 'data.json';

function recoverScore(){
    // read file and return score
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveScoreToFile(arg) {
    // write to file
    console.log('saving score:', arg);
    fs.writeFile(DATA_FILE, JSON.stringify(arg), (err) => {
        // throws an error, you could also catch it here
        if (err) {
            console.log('Score  NOT saved!');
        }
        else{
            console.log('Score saved!');
        }        
    });
}

function score(res) {
    if(liveScore.team_name === undefined){
        // it seems program just statred, try to recover
        liveScore = recoverScore();
        console.log('liveScore=', liveScore);
    }
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(render_ssp.renderSspPage('./score.ssp', liveScore));
    return res.end();
}

function score_json(res) {
    if(liveScore.team_name === undefined){
        // it seems program/server just statred, try to recover
        liveScore = recoverScore();
        console.log('liveScore=', liveScore);
    }
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(JSON.stringify(liveScore));
    return res.end();
}

exports.updatescore = (res, q) => {
    liveScore = q.query;
    saveScoreToFile(liveScore);
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(render_ssp.renderSspPage('./score.ssp', liveScore));
    return res.end();
}

exports.score = score;
exports.score_json = score_json;
// exports.updatescore = updatescore;