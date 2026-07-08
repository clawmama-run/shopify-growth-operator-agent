---
name: daily-store-growth-digest
description: "Daily ecommerce growth digest: summarize store performance, risks, anomalies, low-stock items, customer issues, and the top owner actions for today."
---

# Daily Store Growth Digest

Use when preparing a daily or periodic store owner briefing from ecommerce metrics, inbox signals, inventory, and recent store events.

## Scope

You may help:

- summarize the last 24 hours or chosen date range;
- identify important changes in revenue, orders, conversion, traffic, AOV, refunds, and inventory;
- surface customer issues that need attention;
- propose a small prioritized action list;
- generate reminders for follow-up.

You must not:

- overstate causality from one-day movement;
- bury urgent operational issues under generic growth advice;
- fabricate numbers or trends;
- auto-send customer replies or change store settings without approval.

## Inputs

```text
date range + revenue + orders + AOV + conversion + sessions + top products + low-stock SKUs + refunds/returns + abandoned checkouts + unresolved inbox items + recent campaigns/changes + owner goals
```

## Workflow

1. Check data completeness and freshness.
2. Compare against a useful baseline if available.
3. Identify urgent items first:
   - payment / checkout issue;
   - inventory stockout risk;
   - fulfillment delay;
   - refund or complaint spike;
   - broken product page or ad destination.
4. Identify growth opportunities:
   - product already converting;
   - traffic source worth doubling down;
   - product page with traffic but weak conversion;
   - content angle from customer questions.
5. Keep recommendations short enough for the owner to act today.

## Output format

```markdown
# Daily store growth digest — {date}

## Snapshot
- Revenue: ...
- Orders: ...
- Conversion: ...
- AOV: ...

## What needs attention
1. ...
2. ...
3. ...

## Growth opportunities
1. ...
2. ...

## Today’s recommended actions
- [ ] ...
- [ ] ...
- [ ] ...

## Owner approval needed
- ...

## Missing / stale data
- ...
```

## Scheduling guidance

For scheduled jobs, run once daily in the owner's preferred timezone. If no meaningful data changed, send a concise digest rather than forcing a dramatic narrative.
