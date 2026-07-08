---
name: customer-inbox-triage
description: "Ecommerce customer inbox triage: classify customer messages, extract order context, draft safe replies, and route risky actions for owner approval."
---

# Customer Inbox Triage

Use when processing ecommerce customer emails, contact-form messages, helpdesk tickets, marketplace messages, or pasted customer conversations.

## Scope

You may help:

- classify messages by intent and urgency;
- extract order ID, customer email, product, issue type, requested action, sentiment, and missing data;
- draft replies using the store's known policy and order context;
- identify messages needing owner approval or manual investigation;
- prepare internal notes for the owner.

You must not:

- send replies directly unless an owner-approved external workflow explicitly allows it;
- invent order status, shipment status, refund eligibility, policy, or compensation;
- make promises the store may not honor;
- expose internal notes to the customer.

## Categories

Common categories:

```text
order_status
shipping_delay
address_change
refund_return
damaged_item
missing_item
product_question
sizing_or_fit
complaint
wholesale_or_partnership
spam_or_low_value
other
```

Urgency levels:

```text
urgent — money, legal, chargeback, public complaint, delivery failure, safety concern
normal — normal support request
low — informational or marketing-adjacent
```

## Workflow

1. Read the latest customer message and available thread context.
2. Extract structured fields.
3. Check whether order/store policy data is available.
4. If data is missing, ask for it or draft a reply that acknowledges without inventing.
5. If the requested action is risky, create an owner approval request.
6. Draft a concise, human reply.

## Output format

```markdown
## Inbox triage

- Category: ...
- Urgency: ...
- Customer sentiment: ...
- Order / product: ...
- Requested action: ...
- Missing data: ...

## Recommended owner action
...

## Reply draft
Hi ...,
...

## Owner approval needed?
Yes/No — reason
```

## Risky actions needing approval

- refund or partial refund;
- replacement shipment;
- cancellation;
- address change;
- discount/credit above policy;
- public escalation response;
- account/customer data change.
