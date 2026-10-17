import net from "node:net";
import fs from "node:fs";


// Can be create like this
//  cosnt socket = new net.Socket();
// clinet.connect(port, host, () => {});

const client = net.createConnection({ port: 3000, host: '127.0.0.1' }, () => {
  console.log('connected');
  client.write('file:number.txt');
});

client.on('data', (data) => {

  console.log("data", data.toString());
  data = data.toString();

  if(data.startsWith('file:number.txt')) {
    const file = fs.createWriteStream('./aaa.txt');
    client.pipe(file);
    client.end();
  }else {
    console.log('received:', data.toString())
    client.end();
  }
});

client.on('end', () => console.log('disconnected'));
client.on('error', console.error);