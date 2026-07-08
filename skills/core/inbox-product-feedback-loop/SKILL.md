---
name: inbox-product-feedback-loop
description: "Turn repeated customer questions and complaints into product-page and policy fixes: cluster inbox themes over time, map each theme to the page/policy gap that causes it, and draft the fix for owner review."
---

# Inbox as Product Feedback Loop

Use when the same customer questions keep arriving. `customer-inbox-triage` handles each message; this Skill looks across messages over time and asks: what page, policy, or listing gap is generating this traffic? A support inbox is the cheapest CRO research a store owner has.

## Trigger

- Owner asks: "为什么老有人问这个？" / "what are customers repeatedly confused about?" / "what should I fix on the page based on support tickets?"
- A scheduled weekly review runs over the period's triaged messages.
- `customer-inbox-triage` notices the same category recurring and hands off here.

## Scope

You may help:

- cluster messages from a chosen period by theme (sizing, materials, delivery time, compatibility, how-to-use, policy confusion, damage pattern);
- count and rank themes by frequency and by cost (pre-sale confusion blocks conversion; post-sale confusion drives refunds);
- map each top theme to its likely source: missing product-page info, unclear photos, absent FAQ entry, vague shipping/returns policy page, listing-copy overpromise;
- draft the fix: FAQ entries, spec-table rows, revised description sections, policy-page clarifications — as drafts for owner review;
- hand page-level drafts to `product-page-optimizer` for full-page work;
- quantify the loop where data allows ("theme X appeared in N messages, ~M% of tickets this month") without inventing counts.

You must not:

- publish page changes, edit policies, or reply to customers — drafts only, owner approval per policy;
- treat one loud complaint as a pattern; state the actual count behind every claimed theme;
- infer product defects from complaints alone — flag possible quality issues as "worth investigating," not as established fact;
- expose customer names/emails in the report; aggregate or anonymize.

## Inputs

```text
period + triaged messages (category, product/SKU, question text or summary) + product page contents for affected SKUs + store policy pages (shipping, returns) + optional: conversion rate of affected pages
```

Works from `customer-inbox-triage` outputs, a helpdesk export, or pasted messages. See `examples/shopify-demo/sample-inbox-messages.json` for the expected shape.

## Workflow

1. Group messages by theme × SKU; drop one-off items unless high-severity.
2. Rank themes: frequency × stage (pre-sale confusion ranks above post-sale annoyance of equal count, because it silently costs conversions).
3. For each top theme (max 5), locate the gap: read the actual product page / policy page section and confirm the information really is missing or unclear — do not assume.
4. Draft the smallest fix that would have prevented the messages.
5. Note expected effect honestly: "should reduce repeat questions about X" — not revenue promises.
6. Package fixes as approval-ready drafts.

## Output format

```markdown
## Inbox → product feedback report — {period}

### Top recurring themes
| Theme | Messages | Stage | Affected SKU/page | Confirmed gap |
| --- | --- | --- | --- | --- |

### Proposed fixes (drafts, need approval to publish)
1. {page/policy}: {draft content}

### Worth investigating (not yet confirmed)
- ...

### Data notes
- Message count analyzed: {n}; period: {period}; sources: ...
```

## Safety / approval boundary

All page and policy edits are drafts requiring owner approval before publishing, per `references/owner-approval-policy.md`. Possible product-quality issues are flagged for owner investigation, never announced to customers. Customer PII stays out of reports.

## Example prompt

```text
Analyze last month's triaged support messages (examples/shopify-demo/sample-inbox-messages.json). What do customers keep asking, which product pages are causing it, and what should I add to fix it?
```

## References

- `skills/core/customer-inbox-triage/SKILL.md`
- `skills/core/product-page-optimizer/SKILL.md`
- `templates/owner-approval-request.md`
- `references/owner-approval-policy.md`
