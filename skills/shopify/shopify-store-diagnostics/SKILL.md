---
name: shopify-store-diagnostics
description: "Shopify store diagnostics: review orders, inventory, conversion, refunds, traffic, and customer signals; identify likely issues; recommend owner-approved next actions."
---

# Shopify Store Diagnostics

Use when a Shopify store owner asks what changed, what is wrong, what needs attention, or what to do next for store performance.

## Scope

You may help the owner:

- review Shopify store metrics: orders, revenue, AOV, conversion rate, sessions, refunds, stock, abandoned checkouts;
- identify anomalies and likely causes;
- prioritize operational and growth issues;
- draft safe next actions for product pages, promotions, inventory, customer replies, or support workflows;
- prepare an owner approval request before any external change.

You must not:

- claim certainty from incomplete or stale metrics;
- invent Shopify data, order status, inventory, policy, or customer history;
- execute refunds, cancellations, address changes, inventory changes, campaign changes, or page publishing without explicit owner approval;
- treat the owner's Telegram/WhatsApp/agent runtime as a public customer support channel.

## Input checklist

Ask for or load as available:

```text
store name + date range + revenue/orders/AOV + sessions/conversion + top products + low stock + refunds/returns + abandoned checkouts + traffic sources + recent changes + owner goal
```

If tool access exists, prefer direct reads over user memory. If no connector is available, accept CSV/JSON exports or pasted summaries and mark the analysis as based on provided data.

## Diagnostic workflow

1. Establish baseline: compare the current period against previous period and same weekday/seasonality when available.
2. Detect anomalies:
   - revenue/order drop;
   - conversion drop with stable traffic;
   - traffic drop with stable conversion;
   - AOV change;
   - low stock / out of stock;
   - refund spike;
   - abandoned checkout spike;
   - customer complaint cluster;
   - top product page underperformance.
3. Separate symptoms from likely causes.
4. Rank by owner impact:
   - urgent revenue leak;
   - customer harm / trust issue;
   - inventory or fulfillment risk;
   - growth opportunity;
   - nice-to-have optimization.
5. Recommend 1–3 next actions.
6. If an action changes an external system, produce an owner approval request instead of executing.

## Output format

Use this structure:

```markdown
## Store diagnostic

### What changed
- ...

### Likely causes
1. ... — confidence: high/medium/low
2. ... — confidence: high/medium/low

### Priority actions
1. ...
2. ...
3. ...

### Needs owner approval
- Action: ...
- Reason: ...
- Risk: ...

### Missing data
- ...
```

## Tool expectations

Potential connector/tool functions:

```text
get_shopify_orders(date_range)
get_shopify_products()
get_shopify_inventory()
get_shopify_analytics(date_range)
get_abandoned_checkouts(date_range)
get_refunds(date_range)
get_customer_threads(date_range)
create_owner_approval_request(action, payload)
```

If the tools are unavailable, do not pretend they ran. Ask for an export or analyze the pasted data.

## References

- `templates/daily-store-digest.md`
- `templates/owner-approval-request.md`
- `templates/low-stock-alert.md`
