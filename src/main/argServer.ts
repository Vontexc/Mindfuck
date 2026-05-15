// ARG Webhook Listener — Ending F.
//
// On a successful out-of-game puzzle (e.g. visiting a specific URL),
// a small local server can flip the `arg_code_found` flag in the save.
// This is OPT-IN and only started when the player explicitly enables ARG
// participation in the in-game settings (privacy-friendly).

import http from 'node:http';

let server: http.Server | null = null;

export function startArgServer(onCodeFound: (code: string) => void): void {
  if (server) return;
  server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = new URL(req.url ?? '/', 'http://localhost');
    if (url.pathname === '/signal') {
      const code = url.searchParams.get('code') ?? '';
      if (code === 'SIGNAL//NULL//RETURN') {
        onCodeFound(code);
        res.statusCode = 200;
        res.end('ACK');
        return;
      }
    }
    res.statusCode = 404;
    res.end();
  });
  server.listen(34917, '127.0.0.1');
}

export function stopArgServer(): void {
  server?.close();
  server = null;
}
