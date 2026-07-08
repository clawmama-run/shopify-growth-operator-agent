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

## Attribution rule

If this repo later vendors any MIT-licensed Skill files or scripts from public repositories, keep their original license headers where present and add a source note in the copied file plus this reference page. For source repositories without an explicit license, link and learn from them, but do not copy implementation files.
