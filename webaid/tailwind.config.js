module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        surface: '#1A1F2E',
        textPrimary: '#F8F9FA',
        textSecondary: '#B0B5C0',
        accent: '#8E44AD',
        accent2: '#5A189A',
        border: '#2C2F40',
        success: '#2ECC71',
        error: '#E74C3C',
      },
      boxShadow: {
        'glow': '0 0 10px rgba(142, 68, 173, 0.4)',
      },
    },
  },
  plugins: [],
};
