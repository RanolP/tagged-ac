import { timeline } from 'motion';

export async function animateFailShake(target: HTMLElement): Promise<void> {
  const shake = timeline(
    [
      [target, { transform: 'translate(0, 0)' }],
      [target, { transform: 'translate(-8px, 12px)' }],
      [target, { transform: 'translate(7px, -7px)' }],
      [target, { transform: 'translate(-4px, 5px)' }],
      [target, { transform: 'translate(3px, -6px)' }],
      [target, { transform: 'translate(-2px, 4px)' }],
      [target, { transform: 'translate(0, 0)' }],
    ],
    { duration: 0.4, persist: true },
  );
  const color = timeline(
    [
      [target, { color: '#f41260' }, { at: '30%' }],
      [
        target,
        { color: 'inherit' },
        // See https://github.com/motiondivision/motionone/pull/244
        { at: '100%', easing: 'step-end' as 'steps-end' },
      ],
    ],
    { duration: 0.4, persist: true },
  );

  await Promise.all([shake.finished, color.finished]);
}
