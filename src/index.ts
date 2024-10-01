import http from 'http';

const PORT: number = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, TypeScript with Node.js!\n');
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
