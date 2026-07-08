# Shopify Skill sources reviewed

This repository is an aggregation and adaptation layer for a Shopify Growth Operator Agent. We reviewed public Shopify-related Skill repositories and use them as references rather than copying proprietary or license-unclear code wholesale.

## Primary sources

| Source | License observed | What we learned / how it informs this repo |
| --- | --- | --- |
| [Shopify/agent-skills](https://github.com/Shopify/agent-skills) | No explicit repo license found via GitHub API at review time | Official Shopify-generated agent Skills. Most important pattern: split by Shopify surface (`shopify-admin`, Storefront GraphQL, Customer Account API, Liquid, Hydrogen, Functions, Polaris extensions), require documentation search, and validate generated GraphQL/code before returning it. We reference the structure and link to the source; we do not vendor the generated assets. |
| [lvsao/shopify-skill-hub](https://github.com/lvsao/shopify-skill-hub) | MIT | Strong operator-oriented precedent: shared local env file, preview-first writes, approval-based workflows, Admin API access paths, and merchant tasks such as SEO, alt text, translation, GMC audit, theme/app detection, image downloading. |
| [dragnoir/Shopify-agent-skills](https://github.com/dragnoir/Shopify-agent-skills) | MIT | Broad Shopify development skill taxonomy: themes, Liquid, app development, Hydrogen, checkout, Functions, GraphQL APIs, CLI tooling. Useful as a catalog reference. |
| [baslefeber/shopify-skills](https://github.com/baslefeber/shopify-skills) | MIT | Production-grade Shopify theme judgment: CRO, performance, SEO structured data, accessibility, metafields, section building, Liquid review. Useful future extension for theme-side Skills. |
| [veyralabsgroup/shopify-suite](https://github.com/veyralabsgroup/shopify-suite) | No explicit repo license found via GitHub API at review time | Useful two-mode idea: developer Skill + merchant/store auditor Skill; MCP-connected real store mode vs public storefront extraction mode. |

## Integration decision

For ClawMama's `Shopify Growth Operator Agent`, the missing core is not another copywriting Skill. It is a safe, documented Shopify API connection layer:

1. authenticate through a Shopify app / Admin API token;
2. request only the scopes each Skill actually needs;
3. read store signals through Admin GraphQL first;
4. generate preview plans and approval requests before writes;
5. use dedicated Skills for higher-level jobs such as diagnostics, SEO, content, inbox triage, and daily digests.

## Search round — 2026-07-08 (operator-gap review)

We re-searched GitHub from the user's ("what does a real store owner need every day?") perspective before adding the operator Skill set. Queries run via `gh search repos`:

```text
shopify agent skills
shopify mcp server
shopify ai agent
ecommerce ai agent
shopify flow automation
shopify admin graphql
generative engine optimization
org:Shopify mcp
storeclaw
shopify inventory alert
shopify claude skill
shopify daily report / shopify seo audit
```

### Integration candidates found

| Source | Stars / license | Relevance |
| --- | --- | --- |
| [Cesarjoquin/shopify-mcp](https://github.com/Cesarjoquin/shopify-mcp) | 152★, license not declared via GitHub API at review time | Most-starred community Shopify MCP server (products, customers, orders) for Claude Desktop/Code and MCP clients. Best candidate if we want MCP-based store access instead of (or alongside) our `scripts/shopify-admin-graphql.mjs` helper, but do not vendor code unless license is confirmed. |
| [callobuzz/cob-shopify-mcp](https://github.com/callobuzz/cob-shopify-mcp) | 14★, license not declared via GitHub API at review time | Production-grade MCP server + CLI, 49+ Admin GraphQL tools, YAML-extensible, dual auth. Strong reference for scope planning and tool naming in our connector Skill; integration requires license review. |
| [coupler-io/shopify-mcp](https://github.com/coupler-io/shopify-mcp) | license not declared via GitHub API at review time | Data/reporting-oriented Shopify MCP that targets MCP-compatible clients; relevant for digest/diagnostics data pulls. |
| [onvoyage-ai/gtm-engineer-skills](https://github.com/onvoyage-ai/gtm-engineer-skills) | 1253★, license not declared via GitHub API at review time | AEO/GEO Claude Code skill. Informs our `ai-search-readiness-audit` checks (answerability, structure, JSON-LD), but its site-wide GTM framing is broader than our conservative product-page scope; learn from taxonomy, do not copy code unless license is confirmed. |
| [Auriti-Labs/geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) | 569★, license not declared via GitHub API at review time | Open AEO/GEO audit toolkit; useful check taxonomy. We deliberately do not adopt any visibility/ranking claims; integration requires license review. |
| [indran-jediteck/shopify-skill](https://github.com/indran-jediteck/shopify-skill) | 1★, license not declared via GitHub API at review time | Claude Code Skill wrapping Shopify Admin GraphQL (products, orders, customers, inventory, discounts). Overlaps our connector Skill; useful cross-check for query patterns. |
| [Shopify/dev-mcp-gemini-cli](https://github.com/Shopify/dev-mcp-gemini-cli) | 30★, license not declared via GitHub API at review time | Official Shopify MCP surface is developer-docs oriented, not merchant-operations oriented — confirms the operator gap this repo fills. |
| [ishandutta2007/Awesome-Ecommerce-AI-Agents](https://github.com/ishandutta2007/Awesome-Ecommerce-AI-Agents) | 4★ | Curated list around StoreClaw-style ecommerce agents; market-scan reference. |

### Gaps confirmed (nothing solid to integrate → build ourselves)

- **Daily operations checklist**: no maintained open-source "Shopify morning checklist" agent skill found; only zero-star autogenerated stubs. → built `daily-ops-checklist`.
- **Inventory/fulfillment risk → refund/review chain**: inventory alert repos exist but are standalone notification apps (email/WhatsApp pingers), not judgment layers that connect stock, fulfillment aging, complaints, and campaign exposure. → built `inventory-fulfillment-risk-monitor`.
- **Inbox as product feedback loop**: support-bot repos answer customers; none cluster tickets into product-page fixes for the owner. → built `inbox-product-feedback-loop`.
- **Flow vs agent routing**: "shopify flow automation" results are near-empty; nobody publishes a deterministic-vs-judgment automation planner. → built `flow-vs-agent-planner`.
- **Approval policy as reusable artifact**: MCP servers expose write tools with at most a "be careful" note; none ship an owner-approval policy layer. → built `references/owner-approval-policy.md` as the single source of truth all Skills link to.
- **GEO for merchants, honestly scoped**: existing GEO tools are marketing-site oriented and often promise visibility. We built `ai-search-readiness-audit` limited to extractability/structure audits with an explicit no-ranking-claims section.

## Attribution rule

If this repo later vendors any MIT-licensed Skill files or scripts from public repositories, keep their original license headers where present and add a source note in the copied file plus this reference page. For source repositories without an explicit license, link and learn from them, but do not copy implementation files.
