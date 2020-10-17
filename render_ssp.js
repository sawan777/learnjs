let fs = require('fs');

function renderSspPage(sspFile, data) {
    let html = '';
    let content = fs.readFileSync(sspFile).toString();
    // when you find a key, get the of liveScore[key]
    // also eat up {{ and }}
    for(let i=0;i< content.length;i++){
        let ch=content[i];
        let ch2=content[i+1];
        
        if(ch=='{' && ch2=='{'){
            let key = '';
            i += 2;
            for(let j = i; content[j] !== '}'; j++){
                key += content[j];
                i++;
            }
            html += data[key];
            i++;
        }
        else{
            html+=ch;
        }
    }     
    return html;
}


function renderSsp(res, q){
    const filename = "." + q.pathname;
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(renderSspPage(filename, q.query));
    res.end();
}

exports.renderSspPage = renderSspPage;
exports.renderSsp = renderSsp;