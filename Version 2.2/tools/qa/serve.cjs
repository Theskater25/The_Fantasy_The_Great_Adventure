/* Petit serveur local pour tester le jeu dans un navigateur. */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const types = {
  ".js": "text/javascript; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".mp3": "audio/mpeg",
};

http
  .createServer((req, res) => {
    let file = decodeURIComponent(req.url.split("?")[0]);
    if (file === "/") file = "/index.html";
    const full = path.join(root, file);
    if (!full.startsWith(root)) { res.writeHead(403); res.end("403"); return; }
    fs.readFile(full, (err, data) => {
      if (err) { res.writeHead(404); res.end("404"); return; }
      res.writeHead(200, { "Content-Type": types[path.extname(full)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(8123, () => console.log("serveur pret sur http://localhost:8123"));
