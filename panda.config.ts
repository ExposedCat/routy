import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  presets: ['@shadow-panda/preset'],
  // Whether to use css reset
  preflight: true,

  jsxFramework: 'react',

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },
  emitPackage: true,
  // The output directory for your css system
  outdir: "styled-system",
});
