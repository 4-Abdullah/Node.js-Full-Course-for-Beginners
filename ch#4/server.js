const http = require('http');
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const EventEmitter = require('events');
const logEvents = require('./logEvents');
const { resolve } = require('url');
class Emitter extends EventEmitter {};
// initialize object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const serveFile = async (filepath, contentType, response) => {
    console.log(`Trying to serve: ${filepath}`); 

    try{
        const data = await fsPromises.readFile(filepath, 'utf8');
        response.writeHead(200, {'Content-Type': contentType });
        response.end(data);        
    }catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
} 

const server = http.createServer((req,res) => {
    console.log(req.url, req.method);

    const extension = path.extname(req.url);
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType =  'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    // let filepath = 
    //     contentType === 'text/html' && req.url === '/'
    //     ? path.join(__dirname, 'views', 'index.html')
    //     : contentType === 'text/html' && req.url.slice(-1) === '/'
    //         ? path.join(__dirname, 'views', req.url, 'index.html')
    //         :contentType === 'text/html'
    //             ? path.join(__dirname, 'views', req.url)
    //             : path.join(__dirname, req.url);

    // if (!extension && req.url.slice(-1) !== '/') filepath += '.html';

    // const fileExists = fs.existsSync(filepath);

    // if(fileExists){
    //    serveFile(filepath, contentType, res);
    // }else{
    //     //404
    //     //301
    //     switch(path.parse(filepath).base){
    //         case 'old-page.html':
    //             res.writeHead(301, { 'Location' : '/new-page.html' });
    //                 res.end();
    //                 break;
    //         case 'www-page.html':
    //             res.writeHead(301, {'Location': '/'});
    //             res.end();
    //             break;        
    //         default:
    //             // serve a 404 response
    //                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);     
    //     }
    // }
    // let filepath = path.join(__dirname, 'views', req.url);
    let filepath = 
        contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
            :contentType === 'text/html'
                ? path.join(__dirname, 'views', req.url)
                : path.join(__dirname, req.url);
if (!extension && req.url.slice(-1) !== '/') filepath += '.html';

// Normalize the path to avoid directory traversal issues
// filepath = path.resolve(filepath);
// Check if the file exists
const fileExists = fs.existsSync(filepath);

if (fileExists) {
    const fileStat = fs.statSync(filepath);
    if (fileStat.isDirectory()) {
        // If it's a directory, try serving `index.html`
        filepath = path.join(filepath, 'index.html');
    }

    serveFile(filepath, contentType, res);
} else {
    // 404 or Redirect
    switch (path.parse(filepath).base) {
        case 'old-page.html':
            res.writeHead(301, { 'Location': '/new-page.html' });
            res.end();
            break;
        case 'www-page.html':
            res.writeHead(301, { 'Location': '/' });
            res.end();
            break;
        default:
            // Serve a 404 page
            serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
}

    // let filepath;

    // switch (req, url) {
    //     case '/':
    //         res.statusCode = 200;
    //         path = path.join(__dirname, 'views', 'index.html');
    //         fs.readFile(path, 'utf8', (err, data) => {
    //             res.end(data);
    //         })
    //         break;
    // }


    // if(req.url === '/' || req.url === 'index.html'){
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/html');
    //     filepath = path.join(__dirname, 'views', 'index.html');
    //     fs.readFile(path, 'utf8', (err, data) => {
    //         res.end(data);
    //     }) 
    // }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// add listener for the log event
// myEmitter.on('log', (msg)=> logEvents(msg));


    // Emit event
    // myEmitter.emit('log', 'Log event emitted!');
