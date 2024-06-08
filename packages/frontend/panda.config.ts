import { defineConfig, defineGlobalStyles, defineKeyframes } from "@pandacss/dev";

 
export const keyframes = defineKeyframes({
  move: {
    '0%': { transform: 'translate3d(-90px, 0, 0)' },
    '100%': { transform: 'translate3d(85px, 0, 0)' }
  }
})

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
  '.timer-wrapper': {
    borderRadius: 'full',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(37,150,190)',
    width: 'container.smaller.xs',
    height: 'container.smaller.xs',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative'
  },
  '.timer-wrapper > div': {
    width: '100%',
  },
  '.timer-wrapper > div > svg': {
    position: 'relative',
    width: '100%',
    height: '15vh',
    transition: 'all',
    marginTop: '100%',
    marginBottom: '-7px',
    minHeight: '30px',
    maxHeight: '45px',
  },
  '.timer-wrapper > div > svg ~ div': {
    height: '100%',
    backgroundColor: 'rgba(37,150,190)',
  },
  '.parallax > use': {
    animationName: 'move',
    animationDuration: '25s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'cubic-bezier(.55,.5,.45,.5)'
  },
  '.parallax > use:nth-child(1)': {
    animationDelay: '-2s',
    animationDuration: '7s',
  },
  '.parallax > use:nth-child(2)': {
    animationDelay: '-3s',
    animationDuration: '10s',
  },
  '.parallax > use:nth-child(3)': {
    animationDelay: '-4s',
    animationDuration: '13s',
  },
  '.parallax > use:nth-child(4)': {
    animationDelay: '-5s',
    animationDuration: '20s',
  },
});

export default defineConfig({
  presets: ['@shadow-panda/preset'],
  preflight: true,
  jsxFramework: 'react',
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
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
      keyframes,
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
        lineHeights: {
          sm: { value: '20px' },
          primary: { value: '24px' },
          md: { value: '32px' },
          lg: { value: '38px' },
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
        sizes: {
          basic: {
            'almost-full': { value: '90%' },
          },
          icon: {
            'xxs': { value: '8px' },
            'xs': { value: '16px' },
            'sm': { value: '20px' },
            'md': { value: '24px' },
            'lg': { value: '32px' },
            'xl': { value: '40px' },
            'xxl': { value: '48px' },
          },
          container: {
            'smaller': {
              'xxxs': { value: '80px' },
              'xxs': { value: '120px' },
              'xs': { value: '290px' },
              'sm': { value: '410px' },
            },
            'bigger': {
              'xs': { value: '380px' },
            },
            'xxs': { value: '150px' },
            'xs': { value: '350px' },
            'sm': { value: '640px' },
            'md': { value: '768px' },
            'lg': { value: '1024px' },
            'xl': { value: '1280px' },
            'xxl': { value: '1440px' },
            'content-xl': { value: '729px' },
            'content-2xl': { value: '829px' },
            'grid': {
              'base-size': { value: '220px' },
              'label-height': { value: '56px' },
              'grid-gap': { value: '28px' },
            },
            'sideBar': {
              'collapsed': { value: '65px' },
              'expanded': { value: '210px' },
            },
          },
          skeleton: {
            'height': { value: '40px' },
            'width': { value: 'full' },
            'button': {
              'width': { value: '150px' },
              'height': { value: '{sizes.skeleton.height}' },
            },
            'input': {
              'width': { value: '230px' },
              'height': { value: '{sizes.skeleton.height}' },
            },
            'textarea': {
              'width': { value: '{sizes.skeleton.width}' },
              'height': { value: '80px' },
            },
            'avatar': {
              'width': { value: '{sizes.skeleton.height}' },
              'height': { value: '{sizes.skeleton.height}' },
            },
            'grid': {
              'width': {
                'xs': { value: '32px' },
                'sm': { value: '64px' },
                'md': { value: '128px' },
                'lg': { value: '256px' },
                'xl': { value: '512px' },
              },
              'height': {
                'xs': { value: '32px' },
                'sm': { value: '64px' },
                'md': { value: '128px' },
                'lg': { value: '256px' },
                'xl': { value: '512px' },
              },
            },
            'table': {
              'height': {
                'sm': { value: '32px' },
                'md': { value: '64px' },
                'lg': { value: '128px' },
                'xl': { value: '256px' },
              },
            },
          },
        },
        spacing: {
          'separator': { value: '10px' },
          'smaller': {
            'xs': { value: '4px' },
            'sm': { value: '12px' },
            'md': { value: '14px' },
          },
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
          outline: {
            base: { value: '1px solid {colors.light.gray}' },
            white: { value: '1px solid white' },
          },
          border: {
            base: { value: '1px solid {colors.decoration.gray}' },
            error: { value: '1px solid {colors.decoration.error}' },
            success: { value: '1px solid {colors.decoration.success}' },
            active: { value: '1px solid {colors.decoration.active}' },
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            DEFAULT: { value: '{colors.dark.active}' },
          },
        },
        sizes: {
          icon: {
            primary: { value: '{sizes.icon.xs}' },
          },
        },
      },
    },
  },
  outdir: "src/styled-system",
  forceConsistentTypeExtension: true,
});
