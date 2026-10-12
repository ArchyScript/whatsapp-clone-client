// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1520px',
      },
    },
    extend: {
      colors: {
        whatsapp: {
          app: '#0C1317',
          sidebar: '#0B141A',
          panel: '#111B21',
          panelAlt: '#182229',
          header: '#202C33',
          divider: '#203038',
          stroke: '#233138',
          hover: '#2A3942',
          active: '#374248',
          scrollbar: '#333936',
          muted: '#8696A0',
          icon: '#AEBAC1',
          textSoft: '#D1D7DB',
          bubbleOut: '#005C4B',
          bubbleOutText: '#D9FDD3',
          bubbleRead: '#53BDEB',
          accent: '#057D3D',
          accentDeep: '#0A332C'
        },
        border: {
          light: 'var(--border-light)',
          dark: 'var(--border-dark)',
        },
        input: {
          light: 'var(--input-light)',
          dark: 'var(--input-dark)',
        },
        ring: {
          light: 'var(--ring-light)',
          dark: 'var(--ring-dark)',
        },
        main: {
          light: 'var(--main-light)',
          dark: 'var(--main-dark)',
        },
        secondary: {
          light: 'var(--secondary-light)',
          dark: 'var(--secondary-dark)',
        },
        panel: {
          light: 'var(--panel-light)',
          dark: 'var(--panel-dark)',
        },
        accent: {
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
        },
        hover: {
          light: 'var(--hover-light)',
          dark: 'var(--hover-dark)',
        },
        primary: {
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          chatLight: 'var(--primary-chat-light)',
          chatDark: 'var(--primary-chat-dark)',
        },
        gray: {
          primary: {
            light: 'var(--gray-primary-light)',
            dark: 'var(--gray-primary-dark)',
          },
          secondary: {
            light: 'var(--gray-secondary-light)',
            dark: 'var(--gray-secondary-dark)',
          },
        },
      },
      backgroundColor: {
        container: 'var(--container)',
        'gray-primary': 'var(--gray-primary)',
        'gray-secondary': 'var(--gray-secondary)',
        'gray-tertiary': 'var(--gray-tertiary)',
        'left-panel': 'var(--left-panel)',
        'chat-background': 'var(--chat-background)',
        'chat-hover': 'var(--chat-hover)',
        'green-primary': 'var(--green-primary)',
        'green-chat': 'var(--green-chat)',
      },
      backgroundImage: {
        'chat-tile-light': "url('/bg-light.png')",
        'chat-tile-dark': "url('/bg-dark.png')",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
