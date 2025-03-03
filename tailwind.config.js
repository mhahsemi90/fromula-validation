/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                blink: {
                    '50%': {
                        opacity: 0
                    }
                }
            },
            animation: {
                'blink': 'blink 1s step-end infinite',
            },
            boxShadow: {
                'e-1': '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
                'e-3': '0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12)',
                'e-5': '0 4px 5px -2px rgba(0, 0, 0, 0.2), 0 5px 7px 0 rgba(0, 0, 0, 0.14), 0 1px 13px 0 rgba(0, 0, 0, 0.12)',
                'e-7': '0 4px 5px -2px rgba(0, 0, 0, 0.2), 0 7px 10px 1px rgba(0, 0, 0, 0.14), 0 2px 16px 1px rgba(0, 0, 0, 0.12)',
            }
        },
    },
    plugins: [],
}

