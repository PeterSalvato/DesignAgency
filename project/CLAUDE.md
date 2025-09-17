# Design Team Demo Project

This is the example/demo project that showcases the design team capabilities.

## For Integration Into Your Project

If you want to add these capabilities to your own project, **don't use this demo**. Instead:

```bash
# In your project directory:
git clone https://github.com/username/design-team ./design-team
cd design-team && npm run integrate
```

This will properly integrate the design team into your existing Claude Code project.

## Demo Usage

This demo shows how the design team works:

```bash
cd project
npm install
npm run dev
```

Then in Claude Code, try:
- `/visual-review`
- `/design-iterate src/components/Button.tsx`
- `/accessibility-audit`

## Demo Structure

```
project/
├── src/components/     # Example components showing design patterns
├── config/            # Demo configuration files
├── tests/             # Example visual tests
└── context/           # Demo design guidelines
```

This demonstrates how the design team integrates with a real Next.js project.