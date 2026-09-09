# UI/UX Pro Max — Mandatory Design Enforcement

> This rule applies to ALL frontend work in this project, no exceptions.

## When Building or Modifying Any Frontend Component

Before writing or editing any `.jsx`, `.tsx`, `.css`, or `.html` file, you **MUST**:

1. **Read the `ui-ux-pro-max` skill** (`SKILL.md`) and follow its full workflow.
2. **Run the design system generator** for the relevant product context:
   ```bash
   python3 .agents/skills/ui-ux-pro-max/scripts/search.py "agritech commodity marketplace fintech dashboard" --design-system -p "AgriMart"
   ```
3. **Apply the Pre-Delivery Checklist** from the skill before considering any UI work complete.

## Mandatory Standards (Always Apply)

- **No emoji icons.** Use SVG icons from Lucide, Heroicons, or Simple Icons.
- **No default browser fonts.** Use Google Fonts (Inter, Outfit, Space Grotesk, or design-system recommendation).
- **All clickable elements** must have `cursor: pointer` and visible hover/focus states.
- **Transitions** between 150–300ms. No instant state changes, no >500ms sluggish animations.
- **Light/dark mode contrast** must meet 4.5:1 minimum ratio.
- **Responsive** at 375px, 768px, 1024px, 1440px. No horizontal scroll on mobile.
- **No layout shift on hover.** Use opacity/color transitions, not scale transforms that push siblings.

## Supplementary Skills (Use When Relevant)

These skills in `.agents/skills/` are available and should be consulted for their specific domains:

| Skill | When to Use |
|-------|------------|
| `design-taste-frontend` | Landing pages, portfolios, redesigns |
| `high-end-visual-design` | Premium card structures, spacing, shadows |
| `image-to-code` | Converting mockups/images to implementation |
| `redesign-existing-projects` | Upgrading existing UI to premium quality |
| `gpt-taste` | GSAP animations, editorial typography, bento grids |
| `web-design-guidelines` | Accessibility and UX audits |
| `minimalist-ui` | Clean editorial layouts |
| `industrial-brutalist-ui` | Data-heavy dashboards, terminal aesthetics |

## Anti-Patterns (Hard Bans)

- ❌ Generic flat cards with no depth or hover state
- ❌ Plain red/blue/green default colors
- ❌ System fonts (Arial, Times New Roman, sans-serif fallback only)
- ❌ Placeholder images (`via.placeholder.com`, gray boxes)
- ❌ Inline styles without design-system backing
- ❌ Missing `aria-label` on icon-only buttons
- ❌ Hardcoded pixel widths that break mobile
