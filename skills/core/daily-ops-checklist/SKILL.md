---
name: daily-ops-checklist
description: "Shopify morning operations checklist: walk the owner through today's must-check items in priority order — orders stuck, inventory risk, refund requests, unanswered customers, ad/page anomalies — before any growth work."
---

# Daily Ops Checklist

Use when a store owner starts the day and asks "what should I handle first today?", or when a scheduled morning job runs. This is the operational counterpart to `daily-store-growth-digest`: the digest tells the story, this checklist drives the sequence of actions.

## Trigger

- Owner asks: "今天先处理什么？" / "what do I need to do this morning?" / "run my morning check".
- A scheduled job fires at the owner's chosen local time (recommended: before store peak hours).
- The owner returns after being away and asks what piled up.

## Scope

You may help:

- assemble a prioritized checklist from store signals: unfulfilled/stuck orders, low or oversold inventory, pending refund requests, unanswered customer messages, abandoned-checkout spikes, broken or paused sales channels;
- order items strictly by damage-if-ignored: money leaking now > customer harm > stock risk > growth follow-ups;
- estimate time-to-handle for each item so the owner can plan the morning;
- carry over unresolved items from the previous checklist and mark their age;
- draft the follow-up artifacts each item needs (reply draft, approval request, reorder note).

You must not:

- execute any checklist item that touches money, inventory, customers, or published content — every such item resolves into an owner approval request, not an action;
- pad the list with generic growth advice when operational items exist;
- report "all clear" when data is missing — say which checks could not run;
- invent order, stock, or message counts.

## Inputs

```text
date + timezone + unfulfilled orders (with age) + orders with fulfillment holds/errors + low-stock or negative-stock SKUs + open refund/return requests + unanswered inbox items (with age) + abandoned checkout count vs baseline + active campaigns/channels status + yesterday's unresolved checklist items
```

Prefer connector reads (see `shopify-admin-api-connector`). If no connector, accept a pasted export or `examples/shopify-demo/sample-store-snapshot.json`-shaped data and label the result as based on provided data.

## Workflow

1. Pull or ingest today's signals; note which sources are unavailable.
2. Merge in unresolved items from the previous run; increment their age.
3. Classify each item:
   - `now` — active money leak or customer harm (stuck paid orders, oversold SKU, chargeback-risk complaint);
   - `today` — needs handling before end of day (low stock near reorder point, refund requests within policy window, aging inbox items);
   - `this-week` — follow-ups and growth tasks.
4. For each `now`/`today` item, attach the next concrete step and whether it needs owner approval (check `references/owner-approval-policy.md`).
5. Cap the list: max 3 `now`, max 5 `today`. Everything else goes to a "parked" section.
6. Render with `templates/daily-ops-checklist.md`.

## Output format

Use `templates/daily-ops-checklist.md`:

```markdown
# Morning ops checklist — {date}

## Do now
- [ ] {item} — why: {impact} — next step: {step} — approval needed: yes/no

## Do today
- [ ] ...

## Carried over ({n} days old)
- [ ] ...

## Parked / this week
- ...

## Checks that could not run
- {source}: {reason}
```

## Safety / approval boundary

This Skill only produces the checklist and drafts. Any item involving refunds, cancellations, address changes, inventory edits, price/discount changes, sending customer replies, or publishing pages must end in an owner approval request per `references/owner-approval-policy.md`. Never mark such an item as "done" — mark it "ready for your approval".

## Example prompt

```text
Run my morning ops checklist. Use the connector if configured, otherwise use examples/shopify-demo/sample-store-snapshot.json. I have 45 minutes before I open the studio.
```

## References

- `templates/daily-ops-checklist.md`
- `templates/owner-approval-request.md`
- `references/owner-approval-policy.md`
