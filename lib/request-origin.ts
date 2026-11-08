/**
 * Returns the public origin for a request running behind a reverse proxy.
 * Render forwards the browser's host/protocol in these headers while the
 * request URL itself can point at its internal localhost:10000 service.
 */
export function getRequestOrigin(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost?.split(",")[0]?.trim() || request.headers.get("host");
  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProtocol?.split(",")[0]?.trim() || new URL(request.url).protocol.replace(":", "");

  return `${protocol}://${host || new URL(request.url).host}`;
}
