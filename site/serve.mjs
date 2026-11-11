// Local preview server for `_site`, mounted at the production base path.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { join, resolve, extname, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '_site');
const prefix = '/less-is-more-ui';
const port = Number(process.env.PORT) || 8080;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

createServer(async (request, response) => {
  const url = decodeURIComponent((request.url || '/').split('?')[0]);
  if (url !== prefix && !url.startsWith(`${prefix}/`)) {
    response.writeHead(302, { location: `${prefix}/` });
    response.end();
    return;
  }

  const relative = url.slice(prefix.length) || '/';
  let file = resolve(root, `.${relative}`);

  if (file !== root && !file.startsWith(root + sep)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const info = await stat(file);
    if (info.isDirectory()) file = join(file, 'index.html');
    await stat(file);
    response.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    createReadStream(file).pipe(response);
  } catch (error) {
    response.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    createReadStream(join(root, '404.html')).pipe(response);
  }
}).listen(port, () => {
  console.log(`Serving _site at http://localhost:${port}${prefix}/`);
});
