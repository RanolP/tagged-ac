import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify()],

  theme: {
    fontFamily: {
      mono: ['Silver', 'monospace'],
    },
  },

  transformers: [transformerVariantGroup()],
});
