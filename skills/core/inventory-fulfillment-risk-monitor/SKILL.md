---
name: inventory-fulfillment-risk-monitor
description: "Shopify inventory and fulfillment risk monitor: detect stockout/oversell risk, aging unfulfilled orders, and delivery-delay clusters before they turn into refunds and bad reviews; propose owner-approved mitigations."
---

# Inventory & Fulfillment Risk Monitor

Use when checking whether inventory or fulfillment problems are about to become customer-facing problems. The chain this Skill exists to break: stockout or slow fulfillment → delayed delivery → refund request → bad review. Catching it at step one is cheap; at step four it costs trust.

## Trigger

- Owner asks: "库存有没有风险？" / "anything going to run out?" / "why are refunds up?"
- A scheduled inventory/fulfillment check runs (recommended: daily, plus before planned traffic spikes such as a campaign launch).
- `shopify-store-diagnostics` or `daily-ops-checklist` flags a stock or fulfillment anomaly and hands off here for depth.

## Scope

You may help:

- compute days-of-cover per SKU from current inventory and recent sales velocity, flagging SKUs below reorder point or below lead-time cover;
- detect oversell exposure: negative available inventory, or active campaigns pointed at low-stock SKUs;
- list unfulfilled orders by age and flag those past the store's stated handling time;
- correlate delivery-delay complaints in the inbox with specific SKUs, fulfillment locations, or carriers;
- draft mitigations: reorder note with quantity math shown, campaign pause suggestion, product-page delivery-expectation copy, proactive delay-notice reply drafts;
- estimate refund/review exposure ("N orders at risk, roughly $X") clearly labeled as an estimate.

You must not:

- change inventory quantities, pause products or campaigns, alter shipping settings, or send customer notices — all of these are draft + owner approval only;
- guess supplier lead times, incoming purchase orders, or carrier performance when not provided — ask or mark unknown;
- present velocity-based projections as certainty; always state the window used and its assumptions.

## Inputs

```text
per-SKU: inventory available + committed + incoming (if known) + reorder point + sales last 7/14/30 days + supplier lead time (if known)
orders: unfulfilled orders with created_at and payment status + stated handling time
signals: delivery-related inbox messages + refund requests with reasons + active/planned campaigns and their target SKUs
```

## Workflow

1. Compute sales velocity per SKU (7-day preferred; fall back to 14/30-day and say so).
2. Days of cover = available inventory / daily velocity. Flag: `stockout-imminent` (< lead time or < 7 days if lead time unknown), `below-reorder-point`, `oversold` (negative available).
3. Cross-reference flagged SKUs against active or planned campaigns — traffic pointed at a dying SKU is the most expensive kind of ad spend.
4. Scan unfulfilled orders: bucket by age; flag those past stated handling time.
5. Match inbox delay complaints to orders/SKUs to find the cluster's root (SKU stockout, location backlog, carrier).
6. For each risk, draft one mitigation and route it: reorder note (owner FYI), campaign pause / page copy change / customer notice (approval request).

## Output format

```markdown
## Inventory & fulfillment risk report — {date}

### Stockout / oversell risks
| SKU | Available | Daily velocity ({window}) | Days of cover | Flag | Campaign exposure |
| --- | --- | --- | --- | --- | --- |

### Fulfillment aging
- {n} orders unfulfilled > {handling time}; oldest: {order}, {age}

### Delay-complaint cluster
- Likely root: ... — confidence: high/medium/low

### Proposed mitigations
1. {mitigation} — needs approval: yes/no

### Estimated exposure
- ~{n} orders / ~${x} at refund risk (estimate; assumptions: ...)

### Missing data
- ...
```

## Safety / approval boundary

Read-and-recommend only. Inventory adjustments, price/discount changes, campaign pauses, shipping-setting changes, and any customer-facing message require an owner approval request per `references/owner-approval-policy.md`. Reorder suggestions are notes for the owner, never purchase actions.

## Example prompt

```text
Check inventory and fulfillment risk before I scale the short-video campaign tomorrow. Target SKU is KIT-A. Use the sample snapshot if the connector is not configured.
```

## References

- `templates/low-stock-alert.md`
- `templates/owner-approval-request.md`
- `references/owner-approval-policy.md`
