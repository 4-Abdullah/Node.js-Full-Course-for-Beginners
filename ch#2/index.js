const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const fileOps = async()=>{
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'bio.txt'), 'utf8')
        console.log(data);
        await fsPromises.unlink(path.join(__dirname,'files','bio.txt'));
        await fsPromises.writeFile(path.join(__dirname,'files','promiseWrite.txt'),data);
        await fsPromises.appendFile(path.join(__dirname,'files','promiseWrite.txt'),'\n\nNice to meet you.');
        await fsPromises.rename(path.join(__dirname,'files','promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'),'utf8')
        console.log(newData); 
    }
    catch (err) {
         console.log(err)   
    }
}
fileOps();
// instead of data.toString() 'utf8' defines encoding
// instead of using './files/bio.txt' use path 
// fs.readFile(path.join(__dirname, 'files', 'bio.txt'),'utf8',(err,data)=>{
// if(err) throw err
// console.log(data)
// })


// don't need to specify utf8 that is by default in this
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you.',(err)=>{
//     if(err) throw err
//     console.log('write complete');

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is.',(err)=>{
//         if(err) throw err
//         console.log('Append complete')

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newreply.txt'),(err)=>{
//             if(err) throw err
//             console.log('rename complete')
//         })
//     })
// })


// exit on uncaught errors
process.on('uncaughtException', err=>{
    console.log(`There was an uncaught error: ${err}`);
    process.exit(1);
})