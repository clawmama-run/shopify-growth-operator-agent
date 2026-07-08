---
name: ai-search-readiness-audit
description: "AI-search / GEO readiness audit for Shopify stores: check whether product pages, FAQs, specs, and policy pages are structured so AI assistants can extract accurate answers; draft structural fixes. No ranking or visibility promises."
---

# AI-Search (GEO) Readiness Audit

Use when the owner asks whether their store is "ready for AI search" — ChatGPT, Perplexity, Google AI Overviews and similar assistants that answer shopping questions by extracting from pages. This Skill audits whether the store's pages contain the structured, extractable facts those systems need, and drafts fixes.

**Honesty boundary:** nobody can promise inclusion or ranking in AI answers, and this Skill never does. The claim is narrower and defensible: pages either contain clear, machine-extractable answers to buyer questions, or they don't. This audit finds the gaps. Extraction-readiness is also plain good UX — the same gaps confuse human buyers.

## Trigger

- Owner asks: "AI 搜索能搜到我的店吗？" / "is my store GEO/AEO ready?" / "audit my product page for AI search".
- After `inbox-product-feedback-loop` finds questions the site never answers — unanswered on-page questions are exactly what AI assistants can't extract either.
- Before a product launch, as part of page readiness review.

## Scope

You may help — audit and draft only:

- **Answerability:** does the page directly answer the top buyer questions (what it is, who it's for, size/specs, materials, compatibility, shipping time, return terms) in extractable text rather than only in images or vague copy?
- **Structure:** headings that match real questions, FAQ sections, spec tables, consistent product naming; flag walls of unstructured marketing prose.
- **Structured data:** presence and plausibility of Product/Offer/FAQPage JSON-LD if page source is provided (many Shopify themes emit Product schema; FAQ markup is the common gap). Flag missing/inconsistent fields; do not fabricate what you cannot see.
- **Policy pages:** shipping and returns pages that state concrete terms (days, costs, regions) rather than boilerplate.
- **Consistency:** price/availability/naming contradictions between page copy, specs, and policies.
- Draft fixes: FAQ entries, spec tables, rewritten answer-first sections, policy clarifications — for owner review.

You must not:

- promise or imply improved AI-search visibility, citations, rankings, or traffic;
- recommend keyword stuffing, fake FAQs, review markup for nonexistent reviews, or any markup that misrepresents the product;
- audit "AI visibility" itself (whether assistants currently cite the store) — that requires external probing outside this Skill's scope; if asked, say so;
- publish anything — drafts require owner approval.

## Inputs

```text
product page URL or exported page content (title, description, sections, FAQ, spec fields) + policy page contents + optional: page HTML source for JSON-LD check + optional: top customer questions from inbox-product-feedback-loop
```

Without page content, ask for it — do not audit from imagination.

## Workflow

1. List the 5–8 questions a buyer (or an AI assistant serving one) would need answered before purchase, specific to this product type.
2. For each question, check: answered on page? in extractable text? findable under a sensible heading?
3. Check structural elements: FAQ block, spec table, answer-first opening paragraph, concrete policy links.
4. If HTML provided: check JSON-LD presence and whether fields match visible content. Skip silently otherwise, noting it as unchecked.
5. Check consistency across page and policies.
6. Score each area `ready / partial / missing` and draft the top 3–5 fixes.

## Output format

Use `templates/ai-search-readiness-report.md`:

```markdown
## AI-search readiness audit — {product/page}, {date}

### Buyer questions vs page coverage
| Question | Answered on page? | Extractable? | Fix needed |
| --- | --- | --- | --- |

### Structure
- FAQ block: ready/partial/missing
- Spec table: ...
- Answer-first intro: ...
- Structured data (JSON-LD): ready/partial/missing/not checked

### Policy pages
- Shipping terms concrete: ...
- Returns terms concrete: ...

### Top fixes (drafts, need approval to publish)
1. ...

### What this audit does not claim
This audit measures whether page content is structured and extractable. It does not measure or promise AI-search visibility, citations, or rankings.
```

## Safety / approval boundary

Audit and draft only. Publishing page or policy changes requires owner approval per `references/owner-approval-policy.md`. Keep the "does not claim" section in every report — removing it turns an honest audit into an overpromise.

## Example prompt

```text
Audit the Starter Kit A product page for AI-search readiness. Here is the page content and our shipping/returns policy text. Customers keep asking about material and delivery time — start from those.
```

## References

- `templates/ai-search-readiness-report.md`
- `skills/core/product-page-optimizer/SKILL.md`
- `skills/core/inbox-product-feedback-loop/SKILL.md`
- `references/owner-approval-policy.md`
