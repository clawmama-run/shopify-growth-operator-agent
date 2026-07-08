# Ecommerce Growth Operator Skills

Reusable ecommerce operator Skills for ClawMama / OpenClaw-style agents.

This repository packages the first public proof artifact for a **Shopify Growth Operator Agent**: an owner-controlled AI operator that can diagnose store issues, draft product-page improvements, triage customer inbox items, plan social content, and send daily growth notes.

The Skills are intentionally split into reusable modules. Shopify is the first clear vertical entry point; Amazon, Amazon → DTC, WooCommerce, Etsy, and multichannel variants can reuse the same core playbooks later.

## Try the ready-to-use Agent

These Skills are designed to power the **Shopify Growth Operator Agent** on ClawMama.

> Agent link placeholder: `https://app.clawmama.run/agents/shopify-growth-operator`

Once the public Agent is published, replace the placeholder above with the live Agent URL.

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

## Roadmap

1. Publish Shopify Growth Operator Agent.
2. Add Shopify connector examples and sample JSON/CSV fixtures.
3. Add Amazon → DTC Skills:
   - `amazon-to-dtc-planner`
   - `amazon-listing-to-shopify-product-page`
   - `amazon-review-intel`
4. Add multichannel operator bundle.

## Safety and approval boundaries

- Do not issue refunds, cancel orders, change addresses, change inventory, publish pages, launch campaigns, or send customer replies without explicit owner approval.
- Treat metrics as signals, not proof. State assumptions and missing data.
- Do not invent policy, stock, shipping, or order details. If data is missing, ask or mark as unknown.
- Customer-facing replies should be drafts unless a trusted external workflow has owner-approved auto-send rules.
