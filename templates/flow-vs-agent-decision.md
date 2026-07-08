# Automation plan — {{store}} — {{date}}

## Task routing
| Task | Layer | Why | Approval gate |
| --- | --- | --- | --- |
| {{task}} | Shopify Flow / Agent (autonomous) / Agent + approval / Manual | {{reason}} | {{gate_or_none}} |

## Shopify Flow recipes (owner builds these in the Flow editor)
1. **{{recipe_name}}**
   - Trigger: {{trigger}}
   - Condition: {{condition}}
   - Action: {{action}}
   - Notes: {{plan_or_app_requirements}}

## Agent scheduled jobs (output goes to owner channels only)
1. **{{job_name}}**
   - Reads: {{inputs}}
   - Produces: {{artifact}}
   - Delivered to: {{owner_channel}}
   - Schedule: {{schedule}}

## Agent + approval workflows
1. **{{workflow_name}}**
   - Agent prepares: {{draft_or_payload}}
   - Owner sees: {{approval_request_summary}}
   - On approval: {{execution_step}} → verify in Shopify → report back

## Keep manual
- {{task}} — {{reason}}

## Rollout order
1. {{first_quick_win}}
2. {{next}}
