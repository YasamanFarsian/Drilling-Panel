// For jest to convert source files and run
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { esmodules: true },
        bugfixes: true,
      },
    ],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@emotion/babel-preset-css-prop',
  ],
  plugins: [['module-resolver', { alias: { '@': './src' } }]],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        '@babel/preset-react',
        'babel-preset-vite',
        // for jest to work with css props
        '@emotion/babel-preset-css-prop',
      ],
    },
  },
};
