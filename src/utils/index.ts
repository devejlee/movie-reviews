import { Movie } from '../types'

const patternAlphabet = /[a-zA-Z]/
const patternHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
const orderLevelDesc = [patternHangul, patternAlphabet]

const getPatternIndex = (s: string) => {
  const index = orderLevelDesc.findIndex((pattern) => pattern.test(s))
  return index;
}

export const sortMovies = (source: Movie[]) => {
  const sortedData = [...source].sort((a, b) => {
    // First, compare scores in descending order
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    
    // If scores are the same, then compare titles alphabetically
    const aLevel = getPatternIndex(a.title.charAt(0))
    const bLevel = getPatternIndex(b.title.charAt(0))
    if (aLevel === bLevel) {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    }
    return bLevel - aLevel;
  })

  return sortedData;
}

export const generateOptions = (num: number) => {
  const options = Array.from({ length: num }, (_, index) => (index + 1).toString()).reverse();
  return options;
}

export const setLocalStorageItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};