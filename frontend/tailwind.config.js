/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['11px', { lineHeight: '1.4' }],
        'sm': ['12px', { lineHeight: '1.45' }],
        'base': ['13px', { lineHeight: '1.5' }],
        'md': ['14px', { lineHeight: '1.55' }],
        'lg': ['16px', { lineHeight: '1.5' }],
        'xl': ['18px', { lineHeight: '1.4' }],
        '2xl': ['20px', { lineHeight: '1.3' }],
        '3xl': ['24px', { lineHeight: '1.25' }],
        '4xl': ['30px', { lineHeight: '1.2' }],
        '5xl': ['36px', { lineHeight: '1.15' }],
      },
      colors: {
        // Accent colors
        accent: {
          DEFAULT: '#53F39A',
          hover: '#3DDC84',
          light: 'rgba(83, 243, 154, 0.15)',
        },
        accent2: {
          DEFAULT: '#4FC3FF',
          hover: '#38B0EC',
        },
        danger: {
          DEFAULT: '#FF4D6D',
          hover: '#E8405A',
          light: 'rgba(255, 77, 109, 0.15)',
        },
        warning: {
          DEFAULT: '#FFB020',
          light: 'rgba(255, 176, 32, 0.15)',
        },
        success: {
          DEFAULT: '#22C55E',
          light: 'rgba(34, 197, 94, 0.15)',
        },
        // Sidebar colors (always dark)
        sidebar: {
          DEFAULT: '#0B1220',
          solid: '#0B1220',
          secondary: '#0F1B2E',
          muted: 'rgba(255, 255, 255, 0.55)',
          hover: 'rgba(255, 255, 255, 0.06)',
          active: 'rgba(83, 243, 154, 0.15)',
        },
        // Theme-aware colors (using CSS variables)
        bg: {
          0: 'var(--bg-0)',
          1: 'var(--bg-1)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
        },
        panel: {
          DEFAULT: 'var(--panel)',
          hover: 'var(--panel-hover)',
          solid: 'var(--panel-solid)',
        },
        text: {
          DEFAULT: 'var(--text)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          invert: 'var(--text-invert)',
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',
          focus: 'var(--border-focus)',
        },
        // Legacy primary for compatibility
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '18px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(83, 243, 154, 0.4)',
        'glow-cyan': '0 0 20px rgba(79, 195, 255, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'premium': '0 20px 50px rgba(0, 0, 0, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(83, 243, 154, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(83, 243, 154, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
