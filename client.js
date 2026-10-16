import net from "node:net";

// Can be create like this
//  cosnt socket = new net.Socket();
// clinet.connect(port, host, () => {});

const client = net.createConnection({ port: 3000, host: '204.236.244.215' }, () => {
  console.log('connected');
  client.write('hello');
});

client.on('data', (data) => {
  console.log('received:', data.toString());
  client.end();
});

client.on('end', () => console.log('disconnected'));
client.on('error', console.error);