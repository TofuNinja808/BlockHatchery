import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../docs/',import.meta.url));
const port=Number(process.env.PORT||4173);
http.createServer(async(req,res)=>{try{let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(path.startsWith('/BlockHatchery/'))path=path.slice('/BlockHatchery'.length);if(path.endsWith('/'))path+='index.html';const target=resolve(root,'.'+path);if(!target.startsWith(root)){res.writeHead(403);return res.end('Forbidden');}const data=await readFile(target);res.writeHead(200,{'Content-Type':({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.md':'text/plain; charset=utf-8'})[extname(target)]||'application/octet-stream'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}}).listen(port,'0.0.0.0',()=>console.log(`Preview ready on port ${port}`));
