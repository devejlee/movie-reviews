type Movie = {
  id: number
  title: string
  comment: string
  score: number
}

const patternAlphabet = /[a-zA-Z]/
const patternHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
const orderLevelDesc = [patternHangul, patternAlphabet]

const getPatternIndex = (s: string) => {
  const index = orderLevelDesc.findIndex((pattern) => pattern.test(s))
  return index;
}

export const sortMovies = (source: Movie[]) => {
  const sortedData = [...source].sort((a, b) => {
    const aLevel = getPatternIndex(a.title.charAt(0))
    const bLevel = getPatternIndex(b.title.charAt(0))
    if (aLevel === bLevel) {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
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

export const getLocalStorageItem = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};