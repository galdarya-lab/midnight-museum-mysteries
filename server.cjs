const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname,'dist');
if(!fs.existsSync(path.join(root,'index.html'))){console.error('Build the V2 game first: npm run build');process.exit(1);}
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.json':'application/json; charset=utf-8'};
const server=http.createServer((req,res)=>{
  let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
  if(name==='/')name='/index.html';
  const file=path.resolve(root,'.'+name);
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);});
});
server.listen(Number(process.env.PORT)||8080,'127.0.0.1',()=>console.log('Midnight Museum: http://127.0.0.1:'+server.address().port));
