import autocannon from 'autocannon';
import {
    PassThrough
} from 'stream';

function run(url) {
    const buf = [];
    const outpoutStream = new PassThrough();
    const inst = autocannon({
        url,
        connections: 100,
        duration: 20,
    });
    autocannon.track(inst, {
        outputStream: outpoutStream
    });
    outpoutStream.on('data', (chunk) => {
        buf.push(chunk);
    });
    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf));
    });
}

console.log('Running benchmark...');

run('http://localhost:8080/info');