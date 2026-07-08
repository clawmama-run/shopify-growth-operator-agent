#!/usr/bin/env node
import fs from 'node:fs';

function loadEnv(path) {
  if (!path || !fs.existsSync(path)) return;
  const text = fs.readFileSync(path, 'utf8');
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!(key in process.env)) process.env[key] = value;
  }
}

function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

function normalizeShopDomain(input) {
  if (!input) throw new Error('Missing SHOPIFY_STORE_DOMAIN');
  let shop = input.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(shop)) {
    throw new Error('SHOPIFY_STORE_DOMAIN must be the exact *.myshopify.com domain, not a storefront URL');
  }
  return shop.toLowerCase();
}

async function graphql(query, variables = {}) {
  const shop = normalizeShopDomain(process.env.SHOPIFY_STORE_DOMAIN);
  const token = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
  if (!token) throw new Error('Missing SHOPIFY_ADMIN_API_ACCESS_TOKEN');
  const version = process.env.SHOPIFY_API_VERSION || '2026-07';
  const url = `https://${shop}/admin/api/${version}/graphql.json`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.text();
  let json;
  try { json = JSON.parse(body); } catch { json = { raw: body }; }
  return { ok: res.ok, status: res.status, version: res.headers.get('x-shopify-api-version'), json };
}

const envPath = arg('env', '.shopify.env');
loadEnv(envPath);
const command = process.argv[2] || 'help';

const queries = {
  check: `query ShopifyGrowthOperatorConnectionCheck { shop { name myshopifyDomain primaryDomain { url } } }`,
  products: `query ShopifyGrowthOperatorProducts($first: Int!) { products(first: $first, sortKey: UPDATED_AT, reverse: true) { nodes { id title handle status totalInventory seo { title description } updatedAt } } }`,
  orders: `query ShopifyGrowthOperatorOrders($first: Int!) { orders(first: $first, sortKey: CREATED_AT, reverse: true) { nodes { id name createdAt displayFinancialStatus displayFulfillmentStatus currentTotalPriceSet { shopMoney { amount currencyCode } } lineItems(first: 5) { nodes { title quantity } } } } }`,
};

try {
  if (command === 'help' || command === '--help') {
    console.log(`Usage:
  node scripts/shopify-admin-graphql.mjs check --env .shopify.env
  node scripts/shopify-admin-graphql.mjs products --first 10 --env .shopify.env
  node scripts/shopify-admin-graphql.mjs orders --first 10 --env .shopify.env

Required env: SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_API_ACCESS_TOKEN. Optional: SHOPIFY_API_VERSION.`);
    process.exit(0);
  }
  if (!queries[command]) throw new Error(`Unknown command: ${command}`);
  const first = Number(arg('first', '10'));
  const result = await graphql(queries[command], { first });
  // Do not print token or request headers.
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok || result.json.errors) process.exit(1);
} catch (err) {
  console.error(JSON.stringify({ ok: false, error: err.message }, null, 2));
  process.exit(1);
}
