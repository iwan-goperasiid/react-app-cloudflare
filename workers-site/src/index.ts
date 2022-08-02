/* eslint-disable no-restricted-globals */
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { handleEvent } from "./handle";

// import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

// const handleEvent = async (event: any) => {
//   const { request } = event;
//   try {
//     return await getAssetFromKV(event);
//   } catch (e) {
//     let pathname = new URL(request.url).pathname;
//     return new Response(`${pathname} Not Found`, {
//       status: 404,
//       statusText: "Not Found",
//     });
//   }
// };

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleEvent(event));
});

// export default {
//   async fetch(
//     request: Request,
//     event: FetchEvent,
//     env: Env,
//     ctx: ExecutionContext
//   ): Promise<Response> {
//     return await getAssetFromKV(event);
//   },
// };
