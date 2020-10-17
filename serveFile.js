
let fs = require('fs');

function serveFile(res, q){
    const filename = "." + q.pathname;
    fs.readFile(filename, function (err, data) {
        if (err) {
            return file_not_found(res);
        }
        res.writeHead(200, { 'content-type': q.pathname.endsWith('.jpg') ? 'image/jpeg' : 'text/html' });
        res.write(data);
        return res.end();
    });
}


function file_not_found(res) {
    res.writeHead(404, { 'content-type': 'text/html' });
    return res.end("404 not found");
}
module.exports.file_not_found=file_not_found;
module.exports.serveFile=serveFile;