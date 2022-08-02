import {
  getAssetFromKV,
  mapRequestToAsset,
} from "@cloudflare/kv-asset-handler";

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

const handleEvent = async (event: any) => {
  const { request } = event;
  let options = {};

  try {
    return await getAssetFromKV(event);
  } catch (e) {
    let pathname = new URL(request.url).pathname;
    return new Response(`${pathname} Not Found`, {
      status: 404,
      statusText: "Not Found",
    });
  }
};

const handlePrefix = (prefix: any) => {
  return (request: any) => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request);
    let url = new URL(defaultAssetKey.url);

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, "/");

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey);
  };
};

export { handleEvent, handlePrefix };
