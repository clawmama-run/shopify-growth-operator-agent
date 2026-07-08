#!/usr/bin/env node
// Local repo validation — no network, no secrets required.
// Usage: node scripts/validate-repo.mjs  (or: npm run validate)

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const ok = [];

function check(label, pass, detail = "") {
  (pass ? ok : errors).push(pass ? label : `${label}${detail ? ` — ${detail}` : ""}`);
}

// 1. Every SKILL.md has name/description frontmatter, and name matches its directory.
function findSkillFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...findSkillFiles(p));
    else if (entry === "SKILL.md") out.push(p);
  }
  return out;
}

const skillFiles = findSkillFiles(join(root, "skills"));
check("skills/ contains SKILL.md files", skillFiles.length > 0);
for (const file of skillFiles) {
  const rel = relative(root, file);
  const text = readFileSync(file, "utf8");
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) {
    check(`${rel}: frontmatter`, false, "no --- frontmatter block");
    continue;
  }
  const name = fm[1].match(/^name:\s*(\S+)/m)?.[1];
  const description = fm[1].match(/^description:\s*(.+)/m)?.[1];
  check(`${rel}: frontmatter has name`, Boolean(name));
  check(`${rel}: frontmatter has description`, Boolean(description?.trim()));
  const dirName = rel.split("/").at(-2);
  check(`${rel}: name matches directory`, name === dirName, `name="${name}" dir="${dirName}"`);
}

// 2. Key Skills listed in README exist on disk, and README links resolve.
const readme = readFileSync(join(root, "README.md"), "utf8");
const requiredSkills = [
  "skills/shopify/shopify-admin-api-connector/SKILL.md",
  "skills/shopify/shopify-store-diagnostics/SKILL.md",
  "skills/core/daily-store-growth-digest/SKILL.md",
  "skills/core/product-page-optimizer/SKILL.md",
  "skills/core/customer-inbox-triage/SKILL.md",
  "skills/core/social-content-engine/SKILL.md",
  "skills/core/daily-ops-checklist/SKILL.md",
  "skills/core/inventory-fulfillment-risk-monitor/SKILL.md",
  "skills/core/inbox-product-feedback-loop/SKILL.md",
  "skills/core/flow-vs-agent-planner/SKILL.md",
  "skills/core/ai-search-readiness-audit/SKILL.md",
];
for (const p of requiredSkills) {
  check(`README skill exists: ${p}`, existsSync(join(root, p)));
  check(`README references ${p}`, readme.includes(p));
}

const localLinks = [...readme.matchAll(/\]\(\.\/([^)#]+)\)/g)].map((m) => m[1]);
for (const link of new Set(localLinks)) {
  check(`README link resolves: ${link}`, existsSync(join(root, link)));
}

// 3. All example JSON files parse.
function findJsonFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...findJsonFiles(p));
    else if (entry.endsWith(".json")) out.push(p);
  }
  return out;
}
const jsonFiles = findJsonFiles(join(root, "examples"));
check("examples/ contains JSON fixtures", jsonFiles.length > 0);
for (const file of jsonFiles) {
  const rel = relative(root, file);
  try {
    JSON.parse(readFileSync(file, "utf8"));
    check(`${rel}: valid JSON`, true);
  } catch (e) {
    check(`${rel}: valid JSON`, false, e.message);
  }
}

// 4. Required references and templates exist.
const requiredFiles = [
  "references/shopify-api-auth.md",
  "references/github-shopify-skill-sources.md",
  "references/owner-approval-policy.md",
  "templates/daily-store-digest.md",
  "templates/owner-approval-request.md",
  "templates/product-page-audit.md",
  "templates/customer-reply-draft.md",
  "templates/low-stock-alert.md",
  "templates/daily-ops-checklist.md",
  "templates/ai-search-readiness-report.md",
  "templates/flow-vs-agent-decision.md",
  "templates/shopify-env.example",
];
for (const p of requiredFiles) {
  check(`file exists: ${p}`, existsSync(join(root, p)));
}

// 5. Skills that reference the approval policy point at a real file (already covered),
//    and no Skill claims autonomous execution of Tier 1 actions.
const forbiddenClaims = [/auto[- ]?refund/i, /automatically (send|reply to) customers/i, /auto[- ]?publish/i];
for (const file of skillFiles) {
  const rel = relative(root, file);
  const text = readFileSync(file, "utf8");
  for (const re of forbiddenClaims) {
    check(`${rel}: no overreach claim ${re}`, !re.test(text));
  }
}

console.log(`Checks passed: ${ok.length}`);
if (errors.length) {
  console.error(`\nChecks FAILED: ${errors.length}`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("All repo validation checks passed.");
