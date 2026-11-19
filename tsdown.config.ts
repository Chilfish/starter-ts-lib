import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  platform: 'neutral',
  target: 'es2022',
  deps: {
    neverBundle: [/^node:/],
  },
  // package.json maintains exports by hand; the build must never rewrite it.
  exports: false,
})
