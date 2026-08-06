// Vercel Serverless — proxy same-origin para a MockAPI
const UPSTREAM = "https://68f458d8b16eb6f46834542c.mockapi.io/Rexord/Galeria";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    // Sem query string — MockAPI retorna 404 com parâmetros desconhecidos
    const upstream = await fetch(UPSTREAM, {
      headers: { Accept: "application/json" },
      cache: "no-store"
    });
    const text = await upstream.text();
    res.statusCode = upstream.status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(text);
  } catch (err) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: "Falha ao consultar a API",
      detail: String(err && err.message || err)
    }));
  }
};
