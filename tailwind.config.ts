import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			apple: {
  				dark: '#000000',
  				gray: {
  					'50': '#f9fafb',
  					'100': '#f3f4f6',
  					'200': '#e5e7eb',
  					'300': '#d1d5db',
  					'400': '#9ca3af',
  					'500': '#6b7280',
  					'600': '#4b5563',
  					'700': '#374151',
  					'800': '#1f2937',
  					'900': '#111827'
  				}
  			},
  			indian: {
  				saffron: '#FF9933',
  				white: '#FFFFFF',
  				green: '#138808',
  				royal: '#4A148C',
  				gold: '#FFD700'
  			},
  			terminal: {
  				bg: '#0a0a0a',
  				panel: '#1a1a1a',
  				border: '#2a2a2a',
  				text: '#e5e5e5',
  				muted: '#888888'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		animation: {
  			glitch: 'glitch 0.3s infinite',
  			flicker: 'flicker 2s infinite',
  			'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
  			corrupt: 'corrupt 0.5s ease-in-out',
  			'mandala-rotate': 'mandala-rotate 60s linear infinite',
  			'particle-float': 'particle-float 8s ease-in-out infinite',
  			'gradient-shift': 'gradient-shift 15s ease infinite',
  			float: 'float 6s ease-in-out infinite',
  			sparkle: 'sparkle 2s ease-in-out infinite'
  		},
  		keyframes: {
  			glitch: {
  				'0%, 100%': {
  					transform: 'translate(0)'
  				},
  				'20%': {
  					transform: 'translate(-2px, 2px)'
  				},
  				'40%': {
  					transform: 'translate(-2px, -2px)'
  				},
  				'60%': {
  					transform: 'translate(2px, 2px)'
  				},
  				'80%': {
  					transform: 'translate(2px, -2px)'
  				}
  			},
  			flicker: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.7'
  				}
  			},
  			'pulse-neon': {
  				'0%, 100%': {
  					opacity: '1',
  					textShadow: '0 0 10px #00ff88, 0 0 20px #00ff88'
  				},
  				'50%': {
  					opacity: '0.8',
  					textShadow: '0 0 5px #00ff88, 0 0 10px #00ff88'
  				}
  			},
  			corrupt: {
  				'0%, 100%': {
  					filter: 'hue-rotate(0deg)'
  				},
  				'50%': {
  					filter: 'hue-rotate(90deg) brightness(1.2)'
  				}
  			},
  			'mandala-rotate': {
  				from: {
  					transform: 'rotate(0deg)'
  				},
  				to: {
  					transform: 'rotate(360deg)'
  				}
  			},
  			'particle-float': {
  				'0%, 100%': {
  					transform: 'translateY(0) translateX(0); opacity: 0.3;'
  				},
  				'50%': {
  					transform: 'translateY(-20px) translateX(10px); opacity: 0.6;'
  				}
  			},
  			'gradient-shift': {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			sparkle: {
  				'0%, 100%': {
  					opacity: '0.3',
  					transform: 'scale(1)'
  				},
  				'50%': {
  					opacity: '1',
  					transform: 'scale(1.2)'
  				}
  			}
  		},
  		backdropBlur: {
  			apple: '40px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
