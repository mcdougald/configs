import aspectRatio from '@tailwindcss/aspect-ratio'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'
import animate from 'tailwindcss-animate'
import tailwindcssMotion from 'tailwindcss-motion'

/**
 * @type {import('tailwindcss').Config}
 * @see https://tailwindcss.com/docs/configuration
 */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './common/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    // '../../packages/wagmi/src/**/*.{ts,tsx,mdx}',
    '../../packages/ui/src/**/*.{ts,tsx,mdx}'
    // '../../packages/notifications/src/**/*.{ts,tsx,mdx}',
  ],
  // content: [
  //   // app content
  //   `src/**/*.{js,ts,jsx,tsx}`,
  //   // include packages if not transpiling
  //   '../../packages/**/*.{js,ts,jsx,tsx}',
  // ],
  darkMode: 'class',
  plugins: [forms, aspectRatio, typography, animate, tailwindcssMotion],
  theme: {
    screens: {
      ...defaultTheme.screens,
      xs: '380px'
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)']
      },
      backgroundImage: () => ({
        'gradient-radial': 'radial-gradient(#13213E, #111829)',
        'shimmer-gradient':
          'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 30%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.03) 70%, rgba(255, 255, 255, 0) 100%)',
        'shimmer-gradient-dark':
          'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.03) 30%, rgba(0, 0, 0, 0.06) 50%, rgba(0, 0, 0, 0.03) 70%, rgba(0, 0, 0, 0) 100%)'
      }),
      boxShadow: {
        md: 'rgba(0, 0, 0, 0.09) 0px 3px 12px',
        lg: 'rgba(0, 0, 0, 0.16) 2px 6px 24px',
        xl: 'rgba(0, 0, 0, 0.24) 2px 6px 24px',
        'depth-1': '0px 3px 6px rgba(15, 15, 15, 0.5)',
        'hover-card': 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px'
      },
      colors: {
        blue: {
          DEFAULT: '#3b82f6'
        },
        pink: {
          DEFAULT: '#ec4899'
        },
        green: {
          DEFAULT: 'rgb(var(--green))'
        },
        red: {
          DEFAULT: 'rgb(var(--red))'
        },
        yellow: {
          DEFAULT: '#eab308'
        },
        gray: {
          100: '#182435',
          95: '#2A3645',
          90: '#383F47',
          85: '#5A6573',
          80: '#636870',
          75: '#767A81',
          70: '#898D93',
          65: '#9C9FA4',
          60: '#C3C5C8',
          55: '#D7D8DA',
          50: '#E9EAEB',
          45: '#E3E6E8',
          40: '#F3F6F8',
          35: '#FEFEFE'
        },
        primary: 'var(--color)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        background: 'var(--background)'
      },
      animation: {
        ellipsis: 'ellipsis 1.25s infinite',
        'spin-slow': 'spin 2s linear infinite',
        heartbeat: 'heartbeat 1s ease 0.2s infinite normal forwards',
        rotate: 'rotate360 1s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        wave: 'shimmer 1.25s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        draw: 'draw 0.5s cubic-bezier(0.25, 0.25, 0.25, 1) forwards',
        'slow-draw': 'slow-draw 3s ease forwards',
        dash: 'dash 1.5s 2s ease-out infinite',
        grow: 'grow 1s cubic-bezier(0.25, 0.25, 0.25, 1) forwards',
        'dash-check': 'dash-check 1.5s 2s ease-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        walk: 'walk 0.5s linear infinite',
        shadow: 'shadow 0.5s linear infinite',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        gradient: 'gradient 8s linear infinite',
        meteor: 'meteor 5s linear infinite',
        grid: 'grid 15s linear infinite',
        'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
        'shiny-text': 'shiny-text 8s infinite',
        'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
        ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
        rippling: 'rippling var(--duration, 0.6s) ease-out',
        line: 'line 2s linear infinite',
        orbit: 'orbit calc(var(--duration)*1s) linear infinite',
        'background-position-spin': 'background-position-spin 3000ms infinite alternate',
        shine: 'shine var(--duration) infinite linear',
        pulse: 'pulse var(--duration) ease-out infinite',
        rainbow: 'rainbow var(--speed, 2s) infinite linear',
        'line-shadow': 'line-shadow 15s linear infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        'float-out': 'float-out calc(var(--duration, 1) * 1s) calc(var(--delay) * -1s) infinite linear',
        flip: 'flip calc(var(--spark) * 2) infinite steps(2, end)',
        'waving-hand': 'wave 2s linear infinite'
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' }
        },
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)'
          }
        },
        flip: {
          to: {
            rotate: '360deg'
          }
        },
        'float-out': {
          to: {
            rotate: '360deg'
          }
        },
        'spin-around': {
          '0%': {
            transform: 'translateZ(0) rotate(0)'
          },
          '15%, 35%': {
            transform: 'translateZ(0) rotate(90deg)'
          },
          '65%, 85%': {
            transform: 'translateZ(0) rotate(270deg)'
          },
          '100%': {
            transform: 'translateZ(0) rotate(360deg)'
          }
        },
        ripple: {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)'
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(0.9)'
          }
        },
        rippling: {
          '0%': {
            opacity: '1'
          },
          '100%': {
            transform: 'scale(2)',
            opacity: '0'
          }
        },
        'shimmer-slide': {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)'
          }
        },
        line: {
          '0%': { 'mask-position-x': '0%' },
          '100%': { 'mask-position-x': '100%' }
        },
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shiny-width)) 0'
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shiny-width)) 0'
          }
        },
        orbit: {
          '0%': {
            transform:
              'rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))'
          },
          '100%': {
            transform:
              'rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))'
          }
        },
        shine: {
          '0%': {
            'background-position': '0% 0%'
          },
          '50%': {
            'background-position': '100% 100%'
          },
          to: {
            'background-position': '0% 0%'
          }
        },
        pulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 var(--pulse-color)' },
          '50%': { boxShadow: '0 0 0 8px var(--pulse-color)' }
        },
        rainbow: {
          '0%': { 'background-position': '0%' },
          '100%': { 'background-position': '200%' }
        },
        'line-shadow': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '100% -100%' }
        },
        'background-position-spin': {
          '0%': { backgroundPosition: 'top center' },
          '100%': { backgroundPosition: 'bottom center' }
        },
        gradient: {
          to: {
            backgroundPosition: 'var(--bg-size, 300%) 0'
          }
        },
        meteor: {
          '0%': {
            transform: 'rotate(var(--angle)) translateX(0)',
            opacity: '1'
          },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(var(--angle)) translateX(-500px)',
            opacity: '0'
          }
        },
        grid: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' }
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' }
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        ellipsis: {
          '0%': { content: '"."' },
          '33%': { content: '".."' },
          '66%': { content: '"..."' }
        },
        heartbeat: {
          '0%': {
            transform: 'scale(1)',
            transformOrigin: 'center center',
            animationTimingFunction: 'ease-out'
          },
          '10%': {
            animationTimingFunction: 'ease-out',
            transform: 'scale(0.91)'
          },
          '17%': {
            animationTimingFunction: 'ease-out',
            transform: 'scale(0.98)'
          },
          '33%': {
            animationTimingFunction: 'ease-out',
            transform: 'scale(0.87)'
          },
          '45%': { animationTimingFunction: 'ease-out', transform: 'scale(1)' }
        },
        rotate360: {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(360deg)'
          }
        },
        dash: {
          '0%': {
            strokeDashoffset: '1000'
          },
          '100%': {
            strokeDashoffset: '0'
          }
        },
        'dash-check': {
          '0%': {
            strokeDashoffset: '-100'
          },
          '100%': {
            strokeDashoffset: '900'
          }
        },
        draw: {
          '0%': { strokeOpacity: '1' },
          '100%': { strokeOpacity: '1', strokeDashoffset: '0' }
        },
        'slow-draw': {
          '0%': { fillOpacity: '0' },
          '100%': { fillOpacity: '1' }
        },
        grow: {
          '0%': {
            transform: 'scale(0)'
          },
          '60%': {
            transform: 'scale(0.8)',
            strokeWidth: '4px',
            fillOpacity: '0'
          },
          '100%': {
            transform: 'scale(0.9)',
            strokeWidth: '8px',
            fillOpacity: '1',
            fill: 'currentColor'
          }
        },
        walk: {
          '17%': {
            'border-bottom-right-radius': '3px'
          },
          '25%': {
            transform: 'translateY(9px) translateX(9px)'
          },
          '50%': {
            transform: 'translateY(18px) translateX(18px) scale(1,.9)',
            'border-bottom-right-radius': '40px'
          },
          '75%': {
            transform: 'translateY(9px) translateX(9px)'
          },
          '100%': {
            transform: 'translateY(0) translateX(0)'
          }
        },
        shadow: {
          '50%': {
            transform: 'scale(1.2,1)'
          }
        }
      }
    }
  }
}
