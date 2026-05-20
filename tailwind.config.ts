import { Config } from 'tailwindcss';
import { BaseConfig } from './config/tailwind.config';

const config: Config = {
  // we need to add the content of the other packages here in order for vite to recognize
  // which classes are being used
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [BaseConfig],
};

export default config;
