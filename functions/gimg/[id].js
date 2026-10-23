// Serves photos uploaded from /admin (stored in Google Drive) through this site, cached by Cloudflare.
// /gimg/<drive-file-id> -> Google Drive thumbnail of that file
export async function onRequest({ request, params, waitUntil }) {
  const cache = caches.default;
  const cached = await cache.match(request);
  if (cached) return cached;

  const id = String(params.id || "");
  if (!/^[\w-]{10,}$/.test(id)) return new Response("Bad photo id", { status: 400 });

  const upstream = await fetch(`https://drive.google.com/thumbnail?id=${id}&sz=w1600`, {
    cf: { cacheEverything: true, cacheTtl: 31536000 },
  });
  const type = upstream.headers.get("Content-Type") || "";
  if (!upstream.ok || !type.startsWith("image/")) return new Response("Photo not found", { status: 404 });

  const response = new Response(upstream.body, upstream);
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  waitUntil(cache.put(request, response.clone()));
  return response;
}
