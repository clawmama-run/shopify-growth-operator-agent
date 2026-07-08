# Ecommerce Growth Operator Skills

Reusable ecommerce operator Skills for ClawMama / OpenClaw-style agents.

This repository packages the first public proof artifact for a **Shopify Growth Operator Agent**: an owner-controlled AI operator that can diagnose store issues, draft product-page improvements, triage customer inbox items, plan social content, and send daily growth notes.

The Skills are intentionally split into reusable modules. Shopify is the first clear vertical entry point; Amazon, Amazon → DTC, WooCommerce, Etsy, and multichannel variants can reuse the same core playbooks later.

## Try the ready-to-use Agent

These Skills are designed to power the **Shopify Growth Operator Agent** on ClawMama.

Try the live Agent:

https://app.clawmama.run/agents/x356xc

## Skills

### Shopify-first bundle

| Skill | What it does |
| --- | --- |
| [`shopify-store-diagnostics`](./skills/shopify/shopify-store-diagnostics/SKILL.md) | Reviews orders, inventory, conversion, refunds, and traffic signals; produces likely causes and next actions. |
| [`daily-store-growth-digest`](./skills/core/daily-store-growth-digest/SKILL.md) | Turns store metrics and events into a daily owner briefing with priorities. |
| [`product-page-optimizer`](./skills/core/product-page-optimizer/SKILL.md) | Audits product pages and drafts better title, bullets, FAQ, SEO meta, and offer angles. |
| [`customer-inbox-triage`](./skills/core/customer-inbox-triage/SKILL.md) | Classifies customer messages, extracts order context, drafts replies, and flags approval needs. |
| [`social-content-engine`](./skills/core/social-content-engine/SKILL.md) | Creates social post angles, short video scripts, carousel copy, and UGC briefs from product/store context. |

### Shared workflow templates

- [`templates/daily-store-digest.md`](./templates/daily-store-digest.md)
- [`templates/owner-approval-request.md`](./templates/owner-approval-request.md)
- [`templates/product-page-audit.md`](./templates/product-page-audit.md)
- [`templates/customer-reply-draft.md`](./templates/customer-reply-draft.md)
- [`templates/low-stock-alert.md`](./templates/low-stock-alert.md)

## Positioning

This is not a generic ecommerce chatbot. The operating model is:

```text
connect store context → monitor signals → diagnose issues → draft actions → ask owner approval when needed → learn from outcomes
```

Owner-facing runtime channels such as Telegram or WhatsApp are for the store owner or team. Customer input should arrive through approved external systems such as email inboxes, Shopify, helpdesk tools, forms, or future customer gateways.

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
npx skills add clawmama-run/ecommerce-growth-operator-skills --skill shopify-store-diagnostics -y
npx skills add clawmama-run/ecommerce-growth-operator-skills --skill daily-store-growth-digest -y
npx skills add clawmama-run/ecommerce-growth-operator-skills --skill product-page-optimizer -y
npx skills add clawmama-run/ecommerce-growth-operator-skills --skill customer-inbox-triage -y
npx skills add clawmama-run/ecommerce-growth-operator-skills --skill social-content-engine -y
```

## Demo workflow

Use the sample store snapshot:

```text
examples/shopify-demo/sample-store-snapshot.json
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

1. Add Shopify connector examples and richer sample JSON/CSV fixtures.
2. Add Amazon → DTC Skills:
   - `amazon-to-dtc-planner`
   - `amazon-listing-to-shopify-product-page`
   - `amazon-review-intel`
4. Add multichannel operator bundle.

## Safety and approval boundaries

- Do not issue refunds, cancel orders, change addresses, change inventory, publish pages, launch campaigns, or send customer replies without explicit owner approval.
- Treat metrics as signals, not proof. State assumptions and missing data.
- Do not invent policy, stock, shipping, or order details. If data is missing, ask or mark as unknown.
- Customer-facing replies should be drafts unless a trusted external workflow has owner-approved auto-send rules.
