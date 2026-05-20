import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';
import { shadcnPlugin } from './shadcn-plugin';

export const shadcnPresent = {
  content: [], // This should be set at tailwind.config.ts
  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;
