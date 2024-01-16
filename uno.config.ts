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
      mono: ['HEDunggeunmokkol', 'Silver', 'monospace'],
    },
  },

  transformers: [transformerVariantGroup()],
});
