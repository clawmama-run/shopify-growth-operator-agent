# Shopify API and authentication model for operator Agents

This note summarizes the Shopify API surfaces and auth paths that matter for a Shopify Growth Operator Agent.

## Shopify API surfaces

| Surface | Use in this Agent | Notes |
| --- | --- | --- |
| Admin GraphQL API | Primary integration for store diagnostics, products, orders, customers, inventory, metafields, discounts, draft updates, and approved writes. | Requires a valid Admin access token and scopes. Requests go to `https://{shop}.myshopify.com/admin/api/{version}/graphql.json` with `X-Shopify-Access-Token`. |
| Storefront API | Public/headless storefront reads, product availability, published catalog experiences. | Useful for checking customer-visible state, but not enough for operations. |
| Customer Account API | Customer-facing account data and extensions. | Not the first integration for an owner-facing growth operator. |
| Partner API | Partner dashboard/app management. | Useful for agencies/app developers, not store-owner daily ops. |
| Webhooks | Event-driven monitoring for orders, products, inventory, refunds, app uninstall, etc. | Needed when moving from manual runs to always-on scheduled/event workflows. |
| Bulk Operations | Large catalog/order exports via Admin GraphQL. | Use for stores with many products/orders instead of paginating one small request at a time. |
| Liquid / Theme / Hydrogen / Functions / UI Extensions | Storefront and app development surfaces. | Useful future Skill packs, but separate from the first API connector. |

## Recommended auth paths

### Path A — Dev Dashboard app / Shopify CLI app (recommended for new apps)

Use this for a real reusable ClawMama connector or merchant-installed app.

1. Create a Shopify Partner account / Dev Dashboard app.
2. Configure app URL and redirect URLs.
3. Request only the required Admin API scopes.
4. Install on the merchant store through Shopify's app install flow.
5. Store the resulting offline access token securely server-side.
6. Use that token for Admin GraphQL requests.

For embedded apps and modern Shopify app templates, prefer Shopify's official app templates and managed installation/token exchange instead of hand-rolling OAuth.

### Path B — Existing/admin-created custom app token (legacy / single-store testing)

Use this for a local demo or a merchant-owned private workflow when the store already has a custom app/token.

1. In Shopify Admin, create/install a custom app if available for the store.
2. Assign limited Admin API scopes.
3. Copy the Admin API access token once.
4. Store it in a local uncommitted env file.

Shopify docs note that new custom apps should be created through the Dev Dashboard or Shopify CLI; admin-created custom apps are legacy but existing ones continue to work.

### Path C — Public storefront extraction (no token)

Use only for public audits: theme/app detection, public SEO checks, product page copy review, and competitor research. Do not offer authenticated writes in this mode.

## Minimal environment shape

Use one private local env file. Do not commit it and do not paste token values into chat.

```text
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ADMIN_API_ACCESS_TOKEN=shpat_or_offline_token
SHOPIFY_API_VERSION=2026-07
```

Optional app/OAuth values for a connector service:

```text
SHOPIFY_CLIENT_ID=...
SHOPIFY_CLIENT_SECRET=...
SHOPIFY_REDIRECT_URI=https://your-service.example.com/shopify/callback
SHOPIFY_SCOPES=read_products,read_orders,read_inventory
```

## Scope planning

Start read-only. Add write scopes only when a Skill has a clear approved write path.

| Capability | Typical scopes |
| --- | --- |
| Store/product diagnostics | `read_products`, `read_inventory`, `read_orders`, `read_customers` where needed |
| Product page SEO draft + approved update | `read_products`, optionally `write_products` |
| Customer inbox/order-context triage | `read_orders`, `read_customers` |
| Fulfillment/shipping issue review | `read_orders`, `read_fulfillments`, `read_assigned_fulfillment_orders` as needed |
| Discount/campaign draft | `read_discounts`, and only later `write_discounts` with approval |
| Content/blog/page draft | `read_content`, optionally `write_content` if using Online Store content APIs |
| Webhook monitoring | relevant read scopes plus webhook registration capability through the app |

## Request pattern

```bash
curl -sS -X POST \
  "https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION:-2026-07}/graphql.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Access-Token: ${SHOPIFY_ADMIN_API_ACCESS_TOKEN}" \
  -d '{"query":"query { shop { name myshopifyDomain } }"}'
```

## Safety boundaries

- Never store or print raw tokens.
- Verify the `.myshopify.com` domain; do not accept arbitrary URLs as API hosts.
- Use versioned API URLs and review Shopify quarterly deprecations.
- Treat GraphQL `userErrors` as first-class failure signals.
- Separate read, preview, and execute modes in scripts.
- Default writes to preview-only. Execute only after explicit owner approval.
- Risky actions needing approval: refunds, cancellations, address changes, inventory edits, price changes, discount launch, customer replies, product/page publishing, app/settings changes.

## First connector milestone

A credible Shopify Agent should prove these before promising autonomy:

1. connection check: `shop { name myshopifyDomain }`;
2. product read: product IDs, handles, status, inventory summary, SEO fields;
3. order read: recent orders with totals, financial/fulfillment status, line items;
4. diagnostic summary: identify low-stock, traffic/conversion mismatch, refund/shipping clusters;
5. preview write bundle: show exactly what would change;
6. owner approval gate; then execute and verify.
