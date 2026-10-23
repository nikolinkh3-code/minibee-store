// Serves product photos from Pinduoduo's image CDN through this site, cached by Cloudflare.
// /img/<path> -> https://img.pddpic.com/<path>
export async function onRequest({ request, params, waitUntil }) {
  const cache = caches.default;
  const cached = await cache.match(request);
  if (cached) return cached;

  const path = [].concat(params.path || []).join("/");
  const upstream = await fetch(`https://img.pddpic.com/${path}`, {
    cf: { cacheEverything: true, cacheTtl: 31536000 },
  });
  if (!upstream.ok) return new Response("Image not found", { status: 404 });

  const response = new Response(upstream.body, upstream);
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  waitUntil(cache.put(request, response.clone()));
  return response;
}
