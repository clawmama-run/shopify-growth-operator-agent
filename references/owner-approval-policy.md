# Owner approval policy — single source of truth

Every Skill in this repo routes risky actions through this policy. Skills link here instead of restating the rules, so the boundary lives in exactly one place. If a Skill's text ever conflicts with this file, this file wins.

## The model

The agent is an **owner-facing operator**: it reads, diagnoses, drafts, and reminds. Shopify is the system of record. Telegram / WhatsApp / Discord / WeChat / Feishu are where the owner and team receive results and approve actions — they are not customer-facing runtime channels.

```text
read & diagnose (always allowed) → draft (always allowed) → high-risk action (owner approval, every time)
```

## Tier 1 — always requires explicit owner approval

No Skill, schedule, or prior approval makes these autonomous. Approval is per-action (or per explicitly owner-defined batch), not standing.

| Action | Why it is high-risk |
| --- | --- |
| Issue refund / partial refund | Money leaves the store |
| Cancel order | Irreversible customer impact |
| Change shipping address | Wrong change = lost parcel |
| Change inventory quantities | Corrupts the system of record |
| Change prices | Immediate revenue + trust impact |
| Create/send discount codes | Margin impact, abuse surface |
| Send any customer-facing reply or notice | Speaks for the brand |
| Publish or edit live product pages | Customer-visible content |
| Change shipping/fulfillment settings | Affects every future order |

Each Tier 1 request uses `templates/owner-approval-request.md`: proposed action, reason, data used, risk, exact payload/draft, and approve / edit / reject / ask options.

## Tier 2 — autonomous, output goes to the owner only

Reading store data, computing reports, drafting replies and page copy, clustering inbox themes, building checklists and plans, sending digests/alerts **to owner channels**. These may run on schedules without asking.

## Tier 3 — never do

- Send anything to customers or publish anything public without a Tier 1 approval.
- Present estimates, projections, or drafts as executed actions or confirmed facts.
- Invent order status, stock counts, policy terms, or customer history.
- Interact with end customers directly in the owner's chat channels.
- Promise AI-search rankings, ad performance, or revenue outcomes.

## Approval mechanics

1. The agent prepares the exact payload (refund amount, reply text, page diff) — never a vague "shall I fix it?".
2. The request goes to the owner's channel with approve / approve-with-edits / reject / ask options.
3. No response = no action. Approvals do not carry over to similar future actions.
4. After an approved execution, the agent verifies the result in Shopify and reports back.

## For Skill authors

When adding a Skill: link here from the Skill's safety section; name which Tier 1 actions the Skill can propose; default anything ambiguous to Tier 1. Do not copy the table into the Skill — link it.
