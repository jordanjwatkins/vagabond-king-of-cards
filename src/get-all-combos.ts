const colors = ['color-1', 'color-2', 'color-3'] as const;
const shapes = ['coin', 'sword', 'cup'] as const;
const fills = ['none', 'partial', 'solid'] as const;
const numbers = ['one', 'two', 'three'] as const;

export type FillProp = typeof fills[number];
export type ColorProp = typeof colors[number];
export type ShapeProp = typeof shapes[number];
export type NumberProp = typeof numbers[number];

export type Combo = [
  color: ColorProp,
  shape: ShapeProp,
  fill: FillProp,
  number: NumberProp
];

export function getAllCombos() {
  const combos: Combo[] = [];

  for (const color of colors) {
    for (const shape of shapes) {
      for (const fill of fills) {
        for (const number of numbers) {
          combos.push([color, shape, fill, number]);
        }
      }
    }
  }

  return combos;
}
