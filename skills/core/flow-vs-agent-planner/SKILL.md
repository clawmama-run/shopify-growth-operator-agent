---
name: flow-vs-agent-planner
description: "Decide what belongs in Shopify Flow vs what needs agent judgment vs what must stay manual: audit a store's repetitive tasks and produce an automation plan with explicit approval boundaries."
---

# Flow vs Agent Automation Planner

Use when the owner asks "can this be automated?" or wants an automation plan. Shopify Flow is deterministic trigger→condition→action automation inside Shopify; an agent adds judgment (reading context, weighing tradeoffs, drafting language) but must not silently take high-risk actions. This Skill routes each task to the right layer instead of overpromising agent autonomy.

## Trigger

- Owner asks: "这个能自动化吗？" / "what should I automate first?" / "should this be a Flow or should you handle it?"
- After `daily-ops-checklist` or `inventory-fulfillment-risk-monitor` reveals a recurring manual task.
- Owner is evaluating a paid automation app and wants to know what Flow + agent already cover.

## The routing model

```text
Deterministic + low-risk + data inside Shopify        → Shopify Flow
Needs judgment/drafting + low-risk output              → Agent, runs autonomously (output = draft/report)
Needs judgment + high-risk action                      → Agent drafts → owner approves → then execute
Ambiguous, legal, brand-critical, or one-off           → Manual, agent may assist with context
```

High-risk actions (always the approval path, regardless of layer): refunds, order cancellation, address changes, inventory edits, price changes, issuing discounts, sending customer replies, publishing product pages, shipping-setting changes. See `references/owner-approval-policy.md`.

## Scope

You may help:

- inventory the owner's recurring tasks and classify each with the routing model above;
- draft Shopify Flow recipes in plain trigger/condition/action terms the owner can build in the Flow editor (e.g. "Trigger: inventory quantity changed; Condition: available < reorder point; Action: tag product 'low-stock' + internal email");
- define agent scheduled jobs: what to read, what to produce, where the output goes (owner's Telegram/WhatsApp/team channel — never a customer channel);
- specify the approval gate for each hybrid task: what the agent prepares, what the owner sees, what happens on approve/reject;
- flag tasks that should not be automated and say why.

You must not:

- claim the agent will refund, reply to customers, adjust inventory, or publish pages on its own — these are always draft + approval;
- create or modify actual Flow workflows in the store (Flow setup is done by the owner in Shopify admin; you provide the recipe);
- recommend automating around Shopify platform rules or notification requirements;
- present Flow and agent as competitors — the plan should usually combine both.

## Inputs

```text
list of recurring tasks (or let the Skill propose candidates from recent checklists/digests) + current Flow workflows if any + team size/roles + owner's risk tolerance notes + channels the owner uses for alerts and approvals
```

## Workflow

1. Collect candidate tasks; if the owner has none listed, derive candidates from recent digests, checklists, and inbox patterns.
2. For each task, determine: deterministic? data fully inside Shopify? requires drafting or judgment? touches a high-risk action?
3. Route with the model above; when in doubt between "agent autonomous" and "agent + approval," choose approval.
4. For Flow items: write the recipe (trigger / condition / action) and note required apps or Shopify plan features if relevant.
5. For agent items: define schedule, inputs, output artifact, and delivery channel.
6. Sequence the plan: quick wins first (existing Flow triggers, read-only agent jobs), approval-gated items second.

## Output format

```markdown
## Automation plan — {store}, {date}

| Task | Layer | Why | Approval gate |
| --- | --- | --- | --- |

### Shopify Flow recipes
1. {name}: Trigger ... / Condition ... / Action ...

### Agent scheduled jobs
1. {name}: reads ..., produces ..., delivered to {owner channel}, schedule ...

### Keep manual
- {task} — reason

### Rollout order
1. ...
```

## Safety / approval boundary

This Skill produces a plan; it changes nothing. Every hybrid task in the plan must name its approval gate explicitly. If a proposed automation would let a customer-facing or money-touching action happen without an owner decision, the plan is wrong — fix the routing, do not weaken the gate.

## Example prompt

```text
Here are the five things I do manually every day: check stuck orders, answer "where is my order" emails, watch low stock, pause ads on out-of-stock items, and post a daily sales note to the team. Which should be Shopify Flow, which should the agent do, and where do I stay in the loop?
```

## References

- `references/owner-approval-policy.md`
- `skills/core/daily-ops-checklist/SKILL.md`
- `templates/flow-vs-agent-decision.md`
