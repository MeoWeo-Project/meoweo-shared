/**
 * The shape a slider needs to render itself: its range, its granularity, and how to write its
 * value. Lives here rather than with any one suite's tool metadata, because the slider components
 * are shared and must not know what the number means.
 */
export type SliderConfig = {
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
};
