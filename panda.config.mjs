import { defineGlobalStyles, defineConfig, definePreset } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
  '*': {
    boxSizing: 'border-box',
    fontFamily: 'body',
  },
  'html, body': {
    margin: 0,
    padding: 0,
  },
  '#root': {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
});

export const pandaPreset = definePreset({
  presets: ['@shadow-panda/preset'],
  globalCss,
  staticCss: {
    recipes: {
      // Load toast variant styles since it cannot be statically analyzed
      toast: [{ variant: ['*'] }],
      button: [{ variant: ['*'], size: ['*'] }],
    },
  },
  theme: {
    extend: {
      tokens: {
        colors: {
          hover: {
            light: {
              success: { value: '#ECFDF3d9' },
              warning: { value: '#FFFAEBd9' },
              error: { value: '#FEF3F2d9' },
              active: { value: '#DCEFFCd9' },
              gray: { value: '#F2F4F7d9' },
            },
            dark: {
              success: { value: '#12B76Ad9' },
              warning: { value: '#DC6803d9' },
              error: { value: '#F04438d9' },
              active: { value: '#4c4ff1d9' },
              gray: { value: '#667085d9' },
            },
          },
          light: {
            success: { value: '#ECFDF3' },
            warning: { value: '#FFFAEB' },
            error: { value: '#FEF3F2' },
            active: { value: '#DCEFFC' },
            gray: { value: '#F2F4F7' },
          },
          dark: {
            success: { value: '#12B76A' },
            warning: { value: '#DC6803' },
            error: { value: '#F04438' },
            active: { value: '#4c4ff1' },
            gray: { value: '#667085' },
          },
          text: {
            normal: { value: '#1D2939' },
            label: { value: '#475467' },
            light: { value: '#667085' },
            success: { value: '#027A48' },
            warning: { value: '#B54708' },
            error: { value: '#B42318' },
            active: { value: '#5724e8' },
            gray: { value: '#344054' },
          },
          decoration: {
            success: { value: '#6CE9A6' },
            warning: { value: '#FEC84B' },
            error: { value: '#FDA29B' },
            active: { value: '#8da4f4' },
            gray: { value: '#D0D5DD' },
          },
        },
        fonts: {
          body: { value: 'Inter' },
          mono: { value: 'JetBrainsMono' },
        },
        fontSizes: {
          xxs: { value: '10px' },
          xs: { value: '12px' },
          sm: { value: '14px' },
          primary: { value: '16px' },
          md: { value: '20px' },
          lg: { value: '24px' },
          xl: { value: '32px' },
        },
        fontWeights: {
          primary: { value: '400' },
          md: { value: '500' },
          lg: { value: '600' },
          xl: { value: '800' },
        },
        radii: {
          common: { value: '6px' },
        },
        spacing: {
          'xxs': { value: '6px' },
          'xs': { value: '8px' },
          'sm': { value: '16px' },
          '3xs': { value: '24px' },
          'md': { value: '32px' },
          'lg': { value: '64px' },
        },
        shadows: {
          xs: { value: '0px 1px 2px rgba(16, 24, 40, 0.05)' },
          sm: { value: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' },
          md: { value: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)' },
          lg: { value: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)' },
        },
        borders: {
          border: {
            base: { value: '1px solid {colors.decoration.gray}' },
            error: { value: '1px solid {colors.decoration.error}' },
            success: { value: '1px solid {colors.decoration.success}' },
            active: { value: '1px solid {colors.decoration.active}' },
          },
        },
      },
    },
  },
});

export default defineConfig({
  presets: ['@shadow-panda/preset', pandaPreset],
  preflight: true,
  include: ['./src/**/*.{ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'public/styled-system',
  forceConsistentTypeExtension: true,
});
