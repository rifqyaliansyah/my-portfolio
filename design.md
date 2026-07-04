# Portfolio Design System & Specifications

This document outlines the design specifications, spacing rules, typography, and color hierarchy for the portfolio website. It also provides the mapping for Tailwind CSS v4.

---

## 1. Color Palette & Hierarchy

To ensure a premium, minimalist, and modern aesthetic, we establish the following color hierarchy based on your Figma design:

### A. Primary Color (Brand & Main Headings)
*   **Hex:** `#252525` (Charcoal Black)
*   **Role:** **Primary Text & Brand Identity**
*   **Usage:** Logo text ("Hola!"), section titles, primary headings (`h1`, `h2`), and high-importance UI elements.
*   **Description:** A deep, soft black that provides excellent contrast without the harshness of pure black (`#000000`).

### B. Secondary Color (Body Text & Muted Elements)
*   **Hex:** `#4A4A4A` (Slate Grey)
*   **Role:** **Secondary Text & Secondary Actions**
*   **Usage:** Menu links ("About", "Project", "UI Kit"), paragraph text, icons, and base border strokes.
*   **Description:** A refined mid-dark grey that creates visual hierarchy by drawing less attention than the primary text.

### C. Background Colors
*   **Page Background (HTML):** `#D9D9D9` (Light Clay Grey)
*   **Main Container Background:** `#FFFFFF` (Pure White)

### D. Borders & Opacity
*   **Container Border:** `#4A4A4A` with **20% opacity** (`rgba(74, 74, 74, 0.2)`), thickness `1px`.
*   **Theme Toggle Button Border:** `#4A4A4A` with **40% opacity** (`rgba(74, 74, 74, 0.4)`), thickness `1px`.

---

## 2. Light vs. Dark Mode Mapping

To keep the theme toggle function consistent, here is the proposed mapping for Dark Mode:

| Style Element | Light Mode (Figma Specs) | Proposed Dark Mode Counterpart |
| :--- | :--- | :--- |
| **HTML Page Background** | `#D9D9D9` (Light Grey) | `#0B0B0B` (Deep Black/Grey) |
| **Container Background** | `#FFFFFF` (White) | `#161616` (Dark Charcoal) |
| **Primary Text (e.g. "Hola!")** | `#252525` (Charcoal Black) | `#F5F5F5` (Off-White) |
| **Secondary Text (Menu links)** | `#4A4A4A` (Slate Grey) | `#9E9E9E` (Muted Grey) |
| **Container Border** | `#4A4A4A` @ 20% opacity | `#FFFFFF` @ 10% opacity |
| **Theme Toggle Border** | `#4A4A4A` @ 40% opacity | `#FFFFFF` @ 25% opacity |

---

## 3. Typography (Inter Font Family)

The project utilizes the **Inter** font family. The rules for typography are:

*   **Logo ("Hola!"):**
    *   **Font Size:** `24px` (`text-2xl` or `font-[24px]`)
    *   **Weight:** Semibold (`font-semibold` / `600`)
    *   **Color:** `#252525` (Primary)
*   **Menu Links ("About", "Project", "UI Kit"):**
    *   **Font Size:** `16px` (`text-base` or `font-[16px]`)
    *   **Weight:** Regular (`font-normal` / `400`)
    *   **Color:** `#4A4A4A` (Secondary)
    *   **Interaction:** Add a smooth transition hover effect changing color to `#252525`.

---

## 4. Layout & Spacing (Container)

The main structure of the page is a centered container:

*   **Outer HTML Background:** `#D9D9D9` (min-h-screen)
*   **Container Width:** Max width of `1120px` (`max-w-[1120px]`)
*   **Container Height:** Auto (adapts to content height)
*   **Container Margins:**
    *   **Top/Bottom:** `64px` (`my-16`)
    *   **Left/Right:** Centered (`mx-auto`)
*   **Container Background:** `#FFFFFF`
*   **Container Border Radius:** `64px` (`rounded-[64px]`)
*   **Container Border:** `1px solid rgba(74, 74, 74, 0.2)`
*   **Container Internal Padding:** `80px` (`p-20` / `80px` on top, bottom, left, right)

---

## 5. Header Component Structure

The Header lies at the top of the container content. It is a flex row with three main groups:

1.  **Left Group (Logo):**
    *   Text: "Hola!"
2.  **Center Group (Navigation Menu):**
    *   Links: "About", "Project", "UI Kit"
    *   Gap between items: `24px` (`gap-6`)
    *   Alignment: Horizontally centered or placed next to the logo/button as per design flow.
3.  **Right Group (Theme Toggle):**
    *   Shape: Perfect circle of size `48px` x `48px` (`w-12 h-12`)
    *   Border: `1px solid rgba(74, 74, 74, 0.4)`
    *   Background: Transparent/flexible
    *   Content: Moon icon (`lucide-react` or similar) perfectly centered inside.
    *   Gap between Menu and Toggle: `32px` (`ml-8` or `gap-8`)

---

## 6. Hero Component Structure

The Hero section sits `64px` below the Header inside the container. All content is **left-aligned**.

### A. Profile Row (Avatar + Name)
*   **Layout:** Horizontal flex row, vertically centered, gap `24px`.
*   **Avatar Container:**
    *   Size: `80px` × `80px`
    *   Background: `#F2F0EF` at **20% opacity** (`rgba(242, 240, 239, 0.2)`)
    *   Border Radius: `12px`
    *   Shadow: `0 4px 16px rgba(0, 0, 0, 0.08)`
*   **Profile Photo (inside container):**
    *   Size: `70px` × `70px`
    *   Border Radius: `12px`
    *   Object Fit: `cover`
*   **Name Text ("Rifqy Aliansyah"):**
    *   Font Size: `32px`
    *   Weight: Semibold (`600`)
    *   Color: `#252525` (Primary)

### B. Tagline
*   **Margin Top:** `24px` below the profile row.
*   **Text:**
    ```
    Design Engineer who ships products,
    not just mockups. Part of
    Google Indonesia
    ```
*   **Font Size:** `24px`
*   **Weight:** Medium (`500`)
*   **Line Height:** `32px`
*   **Color:** `#252525` (Primary)
*   **Exception:** "Google Indonesia" uses `#4A4A4A` (Secondary)

### C. CTA Button ("Discuss a project")
*   **Margin Top:** `24px` below the tagline.
*   **Width:** `150px`, **Height:** `40px`
*   **Padding:** Top/Bottom `4px`
*   **Border Radius:** `8px`
*   **Background:** Linear gradient, bottom to top:
    *   `#252525` at 0% → `#252525` at 85% → `#4A4A4A` at 100%
    *   (Dominant dark, subtle lighter at the very top)
*   **Text Style:**
    *   Font Size: `12px`
    *   Weight: Semibold (`600`)
    *   Color: `#F2F0EF` (Cream White)
    *   Line Height: `32px`

### D. Dark Mode Hero Adaptations

| Element | Light Mode | Dark Mode |
| :--- | :--- | :--- |
| **Name Text** | `#252525` | `#F5F5F5` |
| **Tagline Text** | `#252525` | `#F5F5F5` |
| **"Google Indonesia"** | `#4A4A4A` | `#9E9E9E` |
| **Avatar Box Background** | `rgba(242, 240, 239, 0.2)` | `rgba(242, 240, 239, 0.08)` |
| **Avatar Box Shadow** | `0 4px 16px rgba(0,0,0,0.08)` | `0 4px 16px rgba(0,0,0,0.3)` |
| **CTA Button Gradient** | `#252525` → `#4A4A4A` | `#F5F5F5` → `#C0C0C0` |
| **CTA Button Text** | `#F2F0EF` | `#161616` |

---

## 7. Additional Color Tokens

### E. Surface / Subtle Background
*   **Hex:** `#F2F0EF` (Cream White)
*   **Role:** Subtle surface fills, avatar containers, button text on dark backgrounds.
*   **Dark Mode:** Same hex but used at lower opacity (`8%` vs `20%`).

---

## 8. Tailwind CSS v4 Configuration Example

In Tailwind v4, custom theme tokens are added inline in `globals.css`. You can register the custom colors and spacing like this:

```css
@import "tailwindcss";

@theme inline {
  /* Brand Colors */
  --color-brand-primary: #252525;
  --color-brand-secondary: #4A4A4A;
  
  /* Backgrounds */
  --color-bg-page: #D9D9D9;
  --color-bg-container: #ffffff;
  
  /* Surface */
  --color-surface: #F2F0EF;
  
  /* Font Family */
  --font-inter: "Inter", sans-serif;
}
```

