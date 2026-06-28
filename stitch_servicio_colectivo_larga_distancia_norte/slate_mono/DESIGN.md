---
name: Slate & Mono
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#45474c'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#131514'
  on-tertiary: '#ffffff'
  tertiary-container: '#272929'
  on-tertiary-container: '#8f908f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c7c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Roboto Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Roboto Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin: 24px
---

# Design System: Slate & Mono

## Visual Identity
The Slate & Mono system is built for technical precision and professional clarity. By combining the readability of **Inter** headlines with the functional, rhythmic feel of **Roboto Mono** for body content, the system creates an environment that feels like a high-end tool. The aesthetic is modern and minimalist, utilizing a sophisticated palette of deep slates and stone neutrals with vibrant functional accents.

## Colors
The color strategy focuses on a high-contrast "Slate on Stone" approach with strong accenting.
- **Primary:** #1e293b (Slate 800) – Used for typography, primary icons, and major UI actions.
- **Secondary:** #f97316 (Orange) – Used for primary call-to-actions, focus states, and highlighting key interactive elements.
- **Tertiary:** #fafaf9 (Stone) – Used for page backgrounds and main content surfaces to provide a soft, low-strain backdrop.
- **Neutral:** #334155 (Slate 700) – Used for secondary UI elements, structural borders, and subtle interaction states.
- **Background:** Page backgrounds use the Tertiary Stone tint (#fafaf9) to ensure a professional, clean canvas.

## Typography
The system uses a technical typographic scale.
- **Headlines (Inter):** Bold, clean, and professional. Scaled from 32px (Large) to 18px (Small).
- **Body & Data (Roboto Mono):** Monospaced for all body text, lists, and labels. This ensures that numbers and text align vertically, which is crucial for data-heavy layouts.
- **Weight:** Uses Medium (500) for labels and Regular (400) for body copy.

## Layout & Spacing
A rigorous 8px grid system governs all spacing.
- **Base Unit:** 8px.
- **Standard Padding:** 16px (MD) for most containers.
- **Layout:** A 12-column grid system for desktop, collapsing to 4 columns on mobile. Margins are fixed at 24px on desktop and 16px on mobile to maintain a tight, efficient look.

## Elevation & Depth
Depth is created through structural containment rather than physical metaphor.
- **Borders:** 1px solid lines using the Neutral Slate (#334155) at various opacities define most components.
- **Layering:** Different surface levels (e.g., a white or stone card on a soft stone background) communicate hierarchy.
- **Shadows:** Only used for floating elements like modals, featuring a very soft, diffused Slate tint.

## Shapes
The system uses a "Rounded" (Level 2) profile.
- **Corners:** Standard buttons and inputs have an 8px (0.5rem) radius.
- **Large Elements:** Cards and section containers use a 16px (1rem) radius.
- This creates a balance between the rigid monospaced typography and a friendly, modern interface.

## Components
- **Buttons:** High-contrast Primary (Slate) or Secondary (Orange) backgrounds with monospaced text.
- **Inputs:** Clear 1px borders with 8px corner radii, using Roboto Mono for user input to maintain the technical feel.
- **Cards:** Clean Stone surfaces with subtle 1px borders; shadows are avoided in favor of tonal separation.
- **Status Indicators:** Use the orange accent color (#f97316) to draw attention to changes, system alerts, or critical user focus.