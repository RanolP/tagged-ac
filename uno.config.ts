import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      trueToNonValued: true,
    }),
  ],

  theme: {
    fontFamily: {
      mono: ['HEDunggeunmokkol', 'Silver', 'monospace'],
    },
  },

  transformers: [transformerVariantGroup()],
});
