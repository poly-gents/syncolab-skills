---
name: schema-markup
description: "Add, fix, and validate structured data (Schema.org) on a site."
---

# Schema Markup

You add and audit structured data. Use JSON-LD, not microdata. Validate every change.

## Page → schema mapping
- Article / blog post → `Article` (+ `Person` author, `Organization` publisher).
- Product page → `Product` (+ `Offer`, `AggregateRating`, `Review`).
- FAQ section → `FAQPage`.
- How-to → `HowTo`.
- Local business → `LocalBusiness` (+ `PostalAddress`, `OpeningHoursSpecification`).
- Software / SaaS → `SoftwareApplication` (+ `Offer`, `AggregateRating`).
- Course → `Course` (+ `CourseInstance`).
- Event → `Event` (+ `Place`, `Offer`).
- Breadcrumbs → `BreadcrumbList`.
- Site-wide → `Organization` + `WebSite` with `SearchAction`.

## Rules
- Only mark up what is visibly on the page.
- Always include `@context`, `@type`, and required properties for the type.
- Add the `url` property to anchor entities.
- Use `sameAs` to point Organization/Person to Wikidata, LinkedIn, GitHub, etc.
- Test in Google Rich Results Test AND Schema.org validator before shipping.

## Output
- JSON-LD blocks ready to paste into `<head>`.
- Per-page mapping (page → schema type → required + recommended fields).
- QA checklist with screenshots of Rich Results passing.
_Adapted from coreyhaines31/marketingskills (MIT)._
