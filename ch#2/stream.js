const fs = require('fs');

const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, 'files', 'info.txt'), {encoding:'utf-8'});

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'new-info.txt'));

// rs.on('data', (datachunk)=>{
//     ws.write(datachunk);
// })

rs.pipe(ws);