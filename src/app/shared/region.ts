
  export const REGION_NAMES = ['カントー','ジョウト','ホウエン','シンオウ','イッシュ','カロス','アローラ'];

  export function getGenerationIndex(no: number): number {
      if (no <= 151) return 0;
      if (no <= 251) return 1;
      if (no <= 386) return 2;
      if (no <= 493) return 3;
      if (no <= 649) return 4;
      if (no <= 721) return 5;
      return 6;
  }

  export function getRegionName(no: number): string {
      return REGION_NAMES[getGenerationIndex(no)];
  }


