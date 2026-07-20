# Shopify Growth Operator Agent

Reusable ecommerce operator Skills for a **Shopify Growth Operator Agent**.

This repository packages the public Skill kit for an owner-controlled Shopify AI operator: it reads store signals, diagnoses what changed, drafts the next action, and asks the owner before anything risky happens.

The Skills are intentionally split into reusable modules, but this repository is Shopify-first. If we add Amazon, WooCommerce, Etsy, or multichannel variants later, the repository can be renamed then.

## Try the ready-to-use Agent

These Skills are designed to power the **Shopify Growth Operator Agent** on ClawMama.

Try the live Agent:

https://app.clawmama.run/agents/x356xc

## Skills

### Shopify-first bundle

| Skill | What it does |
| --- | --- |
| [`api-graphql`](./skills/external/api-graphql/SKILL.md) | Connects to Shopify Admin/Storefront GraphQL, with ClawMama's local helper, minimum-scope setup, preview-first writes, and owner approval boundaries layered onto the selected upstream Skill. |
| [`shopify-store-diagnostics`](./skills/shopify/shopify-store-diagnostics/SKILL.md) | Reviews orders, inventory, conversion, refunds, and traffic signals; produces likely causes and next actions. |
| [`daily-store-growth-digest`](./skills/core/daily-store-growth-digest/SKILL.md) | Turns store metrics and events into a daily owner briefing with priorities. |
| [`product-page-optimizer`](./skills/core/product-page-optimizer/SKILL.md) | Audits product pages and drafts better title, bullets, FAQ, SEO meta, and offer angles. |
| [`customer-inbox-triage`](./skills/core/customer-inbox-triage/SKILL.md) | Classifies customer messages, extracts order context, drafts replies, and flags approval needs. |
| [`social-content-engine`](./skills/core/social-content-engine/SKILL.md) | Creates social post angles, short video scripts, carousel copy, and UGC briefs from product/store context. |

### Operator bundle (new)

| Skill | What it does |
| --- | --- |
| [`daily-ops-checklist`](./skills/core/daily-ops-checklist/SKILL.md) | Morning operations checklist: what to handle first today, ordered by damage-if-ignored, with time estimates and carried-over items. |
| [`inventory-fulfillment-risk-monitor`](./skills/core/inventory-fulfillment-risk-monitor/SKILL.md) | Detects stockout/oversell risk, aging unfulfilled orders, and delay-complaint clusters before they become refunds and bad reviews. |
| [`inbox-product-feedback-loop`](./skills/core/inbox-product-feedback-loop/SKILL.md) | Clusters repeated customer questions over time and maps each theme to the product-page or policy gap that causes it, with fix drafts. |
| [`flow-vs-agent-planner`](./skills/core/flow-vs-agent-planner/SKILL.md) | Routes each recurring task to Shopify Flow (deterministic), the agent (judgment), agent + approval (high-risk), or manual — with Flow recipes and job specs. |

All Skills share one approval boundary: [`references/owner-approval-policy.md`](./references/owner-approval-policy.md) is the single source of truth for which actions always require owner approval.

### External Skills copied into this repo

These optional Skills were copied from MIT-licensed upstream repositories with source notes and upstream license files preserved in each directory. They are not treated as ClawMama-native approval logic; review each one against [`references/owner-approval-policy.md`](./references/owner-approval-policy.md) before wiring it into a live store workflow.

| External Skill | Upstream | Why it is included |
| --- | --- | --- |
| [`api-graphql`](./skills/external/api-graphql/SKILL.md) | [`dragnoir/Shopify-agent-skills`](https://github.com/dragnoir/Shopify-agent-skills) | Selected over the overlapping local connector because its licensed upstream has the stronger star count (45★ vs 0★); adapted locally with the executable helper and owner-approval policy. |
| [`shopify-product-serp-optimizer`](./skills/external/shopify-product-serp-optimizer/SKILL.md) | [`lvsao/shopify-skill-hub`](https://github.com/lvsao/shopify-skill-hub) | Merchant-oriented SERP metadata workflow with approval-bundle framing. |
| [`shopify-gmc-misrepresentation-auditor`](./skills/external/shopify-gmc-misrepresentation-auditor/SKILL.md) | [`lvsao/shopify-skill-hub`](https://github.com/lvsao/shopify-skill-hub) | Google Merchant Center misrepresentation audit coverage, useful for suspended or pre-launch stores. |
| [`shopify-markets-localization-auditor`](./skills/external/shopify-markets-localization-auditor/SKILL.md) | [`lvsao/shopify-skill-hub`](https://github.com/lvsao/shopify-skill-hub) | Shopify Markets/localization audit for cross-border growth. |
| [`shopify-cro-audit`](./skills/external/shopify-cro-audit/SKILL.md) | [`baslefeber/shopify-skills`](https://github.com/baslefeber/shopify-skills) | Storefront conversion audit that complements product-page optimizer. |
| [`shopify-performance-audit`](./skills/external/shopify-performance-audit/SKILL.md) | [`baslefeber/shopify-skills`](https://github.com/baslefeber/shopify-skills) | Core Web Vitals and theme performance audit coverage. |
| [`shopify-seo-structured-data`](./skills/external/shopify-seo-structured-data/SKILL.md) | [`baslefeber/shopify-skills`](https://github.com/baslefeber/shopify-skills) | Technical SEO / JSON-LD checks that support rich results and AI-search readiness. |
| [`audit-website-aeo`](./skills/external/audit-website-aeo/SKILL.md) | [`onvoyage-ai/gtm-engineer-skills`](https://github.com/onvoyage-ai/gtm-engineer-skills) | Selected as the single AEO/GEO audit because its upstream leads the overlap set by a wide margin (1,252★ vs 0★); Shopify-specific remediation remains a downstream operator task. |

Each copied Skill contains a `SOURCE.md` and `LICENSE.upstream`. Repositories without a clear upstream `LICENSE` file remain references only and were not copied.

### Shared workflow templates

- [`templates/daily-store-digest.md`](./templates/daily-store-digest.md)
- [`templates/owner-approval-request.md`](./templates/owner-approval-request.md)
- [`templates/product-page-audit.md`](./templates/product-page-audit.md)
- [`templates/customer-reply-draft.md`](./templates/customer-reply-draft.md)
- [`templates/low-stock-alert.md`](./templates/low-stock-alert.md)
- [`templates/daily-ops-checklist.md`](./templates/daily-ops-checklist.md)
- [`templates/flow-vs-agent-decision.md`](./templates/flow-vs-agent-decision.md)
- [`templates/shopify-env.example`](./templates/shopify-env.example)

## Skill map from user jobs

The kit is organized around what a store owner actually asks during a day, not around AI features:

| Owner job (what they actually say) | Skill | Cadence |
| --- | --- | --- |
| "今天先处理什么？" / What do I handle first this morning? | `daily-ops-checklist` | Scheduled, daily |
| What changed in my store, and why? | `shopify-store-diagnostics` | On demand |
| Give me the daily story with priorities. | `daily-store-growth-digest` | Scheduled, daily |
| Is anything about to run out or ship late? | `inventory-fulfillment-risk-monitor` | Scheduled + before campaigns |
| Handle this customer message safely. | `customer-inbox-triage` | Per message |
| Why do customers keep asking the same thing? | `inbox-product-feedback-loop` | Weekly |
| Make this product page better. | `product-page-optimizer` | On demand |
| Can AI assistants get accurate answers from my pages? | `audit-website-aeo` | On demand / pre-launch |
| Which of my chores should be automated, and how? | `flow-vs-agent-planner` | On demand |
| Give me content angles for what's already working. | `social-content-engine` | On demand |
| Connect to my store safely in the first place. | `api-graphql` | Setup |

### What is still missing from a real Shopify operator?

Honest gaps we have not covered yet (candidates for the next round):

- **Webhook-driven monitoring** — today the Skills read on schedule; real-time reaction to `orders/create`, `inventory_levels/update` needs a webhook receiver service.
- **Ads/traffic connectors** — Meta/Google/TikTok spend and ROAS are referenced in diagnostics but there is no connector Skill yet.
- **Review platforms** — review monitoring (Judge.me, Loox, Google) is only reachable via pasted exports.
- **Multi-store / multi-location** — current Skills assume one store, one primary location.
- **Executed-action audit log** — approvals are requested per action, but there is no standard ledger artifact of what was approved and executed when.

### Integrated vs built

From the GitHub review in [`references/github-shopify-skill-sources.md`](./references/github-shopify-skill-sources.md):

- **Integrate / reference**: Shopify Admin API access has solid open candidates — community MCP servers ([Cesarjoquin/shopify-mcp](https://github.com/Cesarjoquin/shopify-mcp), [callobuzz/cob-shopify-mcp](https://github.com/callobuzz/cob-shopify-mcp)) can replace or complement our `scripts/shopify-admin-graphql.mjs` helper if their license and deployment fit the project. `api-graphql` is the selected GraphQL Skill; `audit-website-aeo` is the selected AEO/GEO Skill.
- **Built ourselves**: the operator judgment layer had no reusable open-source equivalent — daily ops checklist, inventory→refund risk chain, inbox-as-feedback-loop, Flow-vs-agent routing, and the owner-approval policy were all written for this repo because GitHub search found only notification pingers, customer-facing chatbots, or autogenerated stubs in those niches.

## Positioning

This is not a generic ecommerce chatbot. The operating model is:

```text
authenticate → connect store context → monitor signals → diagnose issues → draft actions → ask owner approval when needed → execute/verify
```

Owner-facing chat channels such as Telegram or WhatsApp are for the store owner or team. Customer input should arrive through approved external systems such as email inboxes, Shopify, helpdesk tools, forms, or future customer gateways.

## Suggested Agent shape

**Shopify Growth Operator Agent**

- Store diagnostics
- Daily growth digest
- Product page optimization
- Customer inbox triage
- Social content planning
- Owner approval before risky changes

Example owner prompts:

```text
What changed in my store today?
Which products need attention first?
Draft a better product page for this SKU.
Turn this customer complaint into a safe reply draft.
Give me five TikTok angles for the product that is already converting.
```

## Install / use

```bash
npx skills add clawmama-run/shopify-growth-operator-agent --skill api-graphql -y
npx skills add clawmama-run/shopify-growth-operator-agent --skill shopify-store-diagnostics -y
npx skills add clawmama-run/shopify-growth-operator-agent --skill daily-store-growth-digest -y
npx skills add clawmama-run/shopify-growth-operator-agent --skill product-page-optimizer -y
npx skills add clawmama-run/shopify-growth-operator-agent --skill customer-inbox-triage -y
npx skills add clawmama-run/shopify-growth-operator-agent --skill social-content-engine -y
npx skills add clawmama-run/shopify-growth-operator-agent --skill daily-ops-checklist -y
npx skills add clawmama-run/shopify-growth-operator-agent --skill inventory-fulfillment-risk-monitor -y
npx skills add clawmama-run/shopify-growth-operator-agent --skill inbox-product-feedback-loop -y
npx skills add clawmama-run/shopify-growth-operator-agent --skill flow-vs-agent-planner -y
```

## Validate the repo locally

No tokens or network needed:

```bash
npm run validate
# or
node scripts/validate-repo.mjs
```

Checks: every `SKILL.md` has `name`/`description` frontmatter matching its directory, README links and listed Skills resolve to real files, example JSON fixtures parse, required references/templates exist, and no Skill text claims autonomous execution of approval-gated actions.

## Shopify API connection layer

The most important first capability is not copywriting. It is connecting to Shopify safely. This repo now includes a connector Skill and a small Admin GraphQL helper:

```bash
cp templates/shopify-env.example .shopify.env
node scripts/shopify-admin-graphql.mjs check --env .shopify.env
node scripts/shopify-admin-graphql.mjs products --first 10 --env .shopify.env
node scripts/shopify-admin-graphql.mjs orders --first 10 --env .shopify.env
```

Required local env values:

```text
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ADMIN_API_ACCESS_TOKEN=your-admin-api-access-token
SHOPIFY_API_VERSION=2026-07
```

Do not commit real tokens. Start with read scopes (`read_products`, `read_orders`, `read_inventory`) and add write scopes only for Skills that have preview-first, owner-approved execution paths.

See:

- [`skills/external/api-graphql/SKILL.md`](./skills/external/api-graphql/SKILL.md)
- [`references/shopify-api-auth.md`](./references/shopify-api-auth.md)

## Sources and attribution

This repo acts as an aggregation and adaptation layer. We reviewed public Shopify Skill repositories and official Shopify docs before adding the connector layer. See [`references/github-shopify-skill-sources.md`](./references/github-shopify-skill-sources.md) for source links, observed licenses, and what we learned from each project.

Key references include:

- [Shopify/agent-skills](https://github.com/Shopify/agent-skills) — official Shopify-generated agent Skills for Shopify development surfaces.
- [lvsao/shopify-skill-hub](https://github.com/lvsao/shopify-skill-hub) — MIT-licensed merchant/operator-oriented Shopify Skill hub.
- [dragnoir/Shopify-agent-skills](https://github.com/dragnoir/Shopify-agent-skills) — MIT-licensed broad Shopify agent Skill taxonomy.
- [baslefeber/shopify-skills](https://github.com/baslefeber/shopify-skills) — MIT-licensed production-grade Shopify theme Skills.

## Demo workflow

Use the sample store snapshot:

```text
examples/shopify-demo/sample-store-snapshot.json
examples/shopify-demo/sample-inbox-messages.json
```

Try these prompts with the Agent or with a local Skill-aware client:

```text
Use the Shopify Store Diagnostics and Daily Store Growth Digest Skills.
Analyze examples/shopify-demo/sample-store-snapshot.json and give me today's store digest.
```

Expected shape:

```markdown
# Daily store growth digest — 2026-07-08

## Snapshot
- Revenue: $3,820
- Orders: 42
- AOV: $90.95
- Conversion: 1.35%

## Needs attention
1. Starter Kit A is below reorder point.
2. Three customer messages mention delayed delivery.
3. Short-video traffic is up, but product-page conversion is below last week.

## Recommended actions today
- [ ] Check Starter Kit A replenishment timing.
- [ ] Draft a shipping-delay reply for affected customers.
- [ ] Audit the short-video landing product page before scaling traffic.
```

Then continue:

```text
Use Product Page Optimizer. Draft a product page audit for Starter Kit A based on the low-stock and traffic signals.
```

And for owner approval:

```text
Prepare an owner approval request before changing inventory messaging or sending customer replies.
```

## Roadmap

1. Add OAuth app service example and webhook-based monitoring.
2. Add richer sample JSON/CSV fixtures and Admin GraphQL query examples.
3. Add Amazon → DTC Skills:
   - `amazon-to-dtc-planner`
   - `amazon-listing-to-shopify-product-page`
   - `amazon-review-intel`
4. Add multichannel operator bundle.

## License

MIT — see [`LICENSE`](./LICENSE).

## Safety and approval boundaries

The full policy lives in [`references/owner-approval-policy.md`](./references/owner-approval-policy.md) — every Skill links to it rather than restating its own rules. Summary:

- Do not issue refunds, cancel orders, change addresses, change inventory, change prices, issue discounts, publish pages, change shipping settings, launch campaigns, or send customer replies without explicit owner approval.
- Treat metrics as signals, not proof. State assumptions and missing data.
- Do not invent policy, stock, shipping, or order details. If data is missing, ask or mark as unknown.
- Customer-facing replies should be drafts unless a trusted external workflow has owner-approved auto-send rules.
