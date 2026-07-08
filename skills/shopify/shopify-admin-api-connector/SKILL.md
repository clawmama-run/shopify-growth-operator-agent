---
name: shopify-admin-api-connector
description: "Connect a Shopify Growth Operator Agent to Shopify Admin GraphQL safely: auth paths, env setup, scope planning, connection checks, read queries, preview-first writes, and owner approval boundaries. Use before any Shopify diagnostic, product, order, inventory, SEO, or inbox Skill that needs real store data."
version: 1.0.0
author: ClawMama
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [Shopify, Admin API, GraphQL, OAuth, ecommerce, connector]
    related_skills: [shopify-store-diagnostics, daily-store-growth-digest, product-page-optimizer, customer-inbox-triage]
required_environment_variables:
  - name: SHOPIFY_STORE_DOMAIN
    prompt: "Exact .myshopify.com store domain"
    help: "Use your-store.myshopify.com, not the public storefront URL."
    required_for: "All Admin GraphQL requests."
  - name: SHOPIFY_ADMIN_API_ACCESS_TOKEN
    prompt: "Shopify Admin API access token"
    help: "Create/install a Shopify Dev Dashboard app or existing custom app with the minimum required scopes. Never paste the token into chat or commit it."
    required_for: "Authenticated Shopify Admin API reads/writes."
  - name: SHOPIFY_API_VERSION
    prompt: "Shopify API version"
    help: "Optional. Defaults to 2026-07. Shopify API versions are quarterly and should be reviewed regularly."
    required_for: "Version-pinned Admin GraphQL requests."
---

# Shopify Admin API Connector

## Purpose

Use this Skill before any Shopify operator workflow that needs real store data. Its job is to establish a safe connection model, not to optimize copy by itself.

The connector enables this sequence:

```text
authenticate → verify store → read products/orders/inventory → diagnose → preview changes → owner approval → execute → verify
```

## Read first

- `references/shopify-api-auth.md`
- `references/github-shopify-skill-sources.md`
- `templates/shopify-env.example`

## Connection modes

### Recommended: Dev Dashboard app / Shopify CLI app

Use this for a real reusable connector. Create a Shopify Dev Dashboard app, configure scopes and redirect URLs, install it on the store, and store the offline Admin API access token server-side.

### Single-store testing: existing Admin/custom app token

Use this when the merchant already has a store-specific Admin API token. Store it in a local uncommitted env file.

### Public storefront mode

Use this only for no-token public audits. Do not offer authenticated writes in this mode.

## Env setup

Create a private local env file from the template:

```bash
cp templates/shopify-env.example .shopify.env
```

Fill in:

```text
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ADMIN_API_ACCESS_TOKEN=your-admin-api-access-token
SHOPIFY_API_VERSION=2026-07
```

Never print raw token values. Never commit `.shopify.env`, `skill-hub.env`, or any file containing credentials.

## Minimum scope planning

Start with read scopes. Add write scopes only when a Skill has a preview-and-approval execution path.

| Workflow | Suggested first scopes |
| --- | --- |
| Store diagnostics | `read_products`, `read_inventory`, `read_orders` |
| Daily growth digest | `read_orders`, `read_products`, `read_inventory` |
| Product page optimization | `read_products`; add `write_products` only for approved updates |
| Customer inbox triage with order context | `read_orders`, `read_customers` if required |
| Discount/campaign planning | `read_discounts`; add `write_discounts` only after owner approval |

## Required checks

1. Confirm the store domain is an exact `*.myshopify.com` domain.
2. Confirm the requested scopes match the task.
3. Run a connection check.
4. If the check fails, report the status/error directly; do not continue with invented data.

Use the bundled helper:

```bash
node scripts/shopify-admin-graphql.mjs check --env .shopify.env
node scripts/shopify-admin-graphql.mjs products --first 10 --env .shopify.env
node scripts/shopify-admin-graphql.mjs orders --first 10 --env .shopify.env
```

The helper intentionally prints response data only. It does not print request headers or token values.

## GraphQL request pattern

```bash
curl -sS -X POST \
  "https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION:-2026-07}/graphql.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Access-Token: ${SHOPIFY_ADMIN_API_ACCESS_TOKEN}" \
  -d '{"query":"query { shop { name myshopifyDomain } }"}'
```

When writing GraphQL:

- use Shopify's latest docs for operation names and fields;
- keep selected fields minimal;
- paginate lists;
- check both top-level `errors` and mutation `userErrors`;
- include documentation links in implementation notes when adding a new query/mutation.

## Preview-first write policy

Default every write-capable workflow to preview mode.

Allowed without owner approval:

- read store data;
- produce diagnostic summaries;
- draft product copy, SEO metadata, social content, and customer replies;
- prepare a change bundle.

Requires explicit owner approval:

- refunds;
- order cancellation;
- address change;
- inventory or price change;
- product/page publish;
- discount/campaign launch;
- sending customer replies;
- app/settings changes.

A valid approval request must include:

1. current value / evidence;
2. proposed value;
3. affected product/order/customer IDs;
4. risk and rollback note;
5. exact command or mutation that will run after approval.

## Output contract

For connection work, return:

```markdown
## Shopify connection status
- Store: <shop name/domain or unknown>
- API version: <version/header>
- Mode: Dev Dashboard app / custom token / public storefront
- Scopes needed: <list>
- Checks run: <commands or API calls>
- Result: connected / blocked
- Next safe action: <read/diagnose/preview>
```

If blocked, include the exact missing env var, scope, HTTP status, or Shopify GraphQL error, but never include secrets.
