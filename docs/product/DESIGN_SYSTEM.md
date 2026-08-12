# SolveSprint design system

## Principles

SolveSprint uses editorial hierarchy for public pages and operational clarity for authenticated workspaces. Photography is reserved for public and authentication surfaces. Workspaces rely on typography, rules, status language, tables, and explicit actions.

## Semantic tokens

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--color-canvas` | `#fffaf3` | Public and workspace page background |
| `--color-surface` | `#ffffff` | Form and data surfaces |
| `--color-surface-muted` | `#f8f1e7` | Quiet editorial section |
| `--color-inverted` | `#111827` | Inverted header/operational emphasis |
| `--color-text` | `#111827` | Primary text |
| `--color-text-secondary` | `#4f5c70` | Body text |
| `--color-text-muted` | `#667085` | Metadata |
| `--color-border` | `rgba(17, 24, 39, .18)` | Normal rules |
| `--color-border-strong` | `#111827` | High hierarchy rules |
| `--color-accent` | `#c86420` | Primary accent |
| `--color-accent-hover` | `#9a4f19` | Interactive hover |
| `--color-accent-subtle` | `#fdba74` | Restrained accent surface |
| `--color-info` | `#0369a1` | Informational state |
| `--color-success` | `#166534` | Success state |
| `--color-warning` | `#92400e` | Warning state |
| `--color-danger` | `#b91c1c` | Destructive/error state |
| `--color-focus` | `rgba(56, 189, 248, .55)` | Focus outline |

State text is never communicated through color alone.

### Typography

The primary family is Inter/system sans. No new display or monospaced family is introduced.

- Display: `clamp(3.1rem, 7vw, 6rem)`, 0.94–1.0 line height
- Page title: `clamp(2.5rem, 4.5vw, 4rem)`
- Section title: `clamp(1.9rem, 3vw, 2.75rem)`
- Card/row title: `1.2rem–1.55rem`
- Body large: `1.05rem–1.2rem`, 1.6 line height
- Body: `0.94rem–1rem`, 1.6 line height
- Body small: `0.8rem–0.88rem`
- Label: `0.82rem`, 700–800
- Eyebrow/metadata: `0.68rem–0.76rem`, uppercase only for functional labels
- Numeric emphasis: tabular numerals, strong size hierarchy

### Spacing

The primary scale is 4px based: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120.

### Layout

- Public maximum width: 1200px
- Application maximum width: 1240px
- Narrow reading width: 760px
- Form width: 680px
- Mobile gutter: 16px
- Tablet gutter: 24px
- Desktop gutter: 32px
- Public header: 70px
- Workspace header: 64px
- Breakpoints: 640, 768, 1024, 1100, 1280

### Corners and elevation

- Small radius: 4px
- Control radius: 6px
- Surface radius: 8px
- Media radius: 8px
- No capsule buttons except where a compact token truly acts as a tag
- Shadows are reserved for menus or dialogs; normal cards use borders

### Motion

Transitions are 160–220ms and limited to color, disclosure, focus, and 2–3px arrow movement. All nonessential motion is disabled with `prefers-reduced-motion`.

## Interface families

- Public editorial: public navigation, large but controlled headings, warm canvas, photography when informative, grouped footer
- Authentication: simplified header, split visual at desktop, focused form, short steps
- Student workspace: compact app header, next action, deadlines, team state, private-by-default copy
- Organization workspace: operational rows/tables, owned-record checks, review status, controlled challenge actions
- Administration: dense queue/table presentation, no photography, reasons and audit context

## Shared primitives

`DashboardShell`, `Card`, `Button`, `ButtonLink`, `Badge`, `Notice`, `EmptyState`, `FormField`, `TextAreaField`, `SelectField`, and `CheckboxField` are the shared application primitives. They use semantic tokens and avoid pastel-card variants.
