  export type PokemonSize = '小型' | '中型' | '大型';

  export const SIZE_SCALES: Record<PokemonSize, number> = {
    '小型': 0.5,
    '中型': 1,
    '大型': 2.0,
  };

  export function pickRandomSize(): PokemonSize {
    const sizes: PokemonSize[] = ['小型', '中型', '大型'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }

