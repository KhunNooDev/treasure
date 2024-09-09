import { persistentAtom } from '@nanostores/persistent'

export const $user = persistentAtom(
  'user',
  {
    name: '',
    email: '',
    performance: [
      // {
      //   tag: 'people',
      //   learnedWords: [],
      // },
    ],
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
)

export const setUser = (name: string, email: string) => {
  $user.set({ name, email })
}

export const clearUser = () => {
  $user.set({ name: '', email: '' })
}

export const savePerformance = (tag: string, learnedWords: string[]) => {
  // 1. get current performance
  const currentPerformance = $user.get().performance || []
  // 2. update performance
  const updatedPerformance = Array.isArray(currentPerformance)
    ? currentPerformance.map((performance: { tag: string; learnedWords: string[] }) => {
        if (performance.tag === tag) {
          // 5. if learnedWords is existing, skip it (add only new learnedWords not existing)
          const newLearnedWords = Array.from(new Set([...performance.learnedWords, ...learnedWords]))
          return { ...performance, learnedWords: newLearnedWords }
        }
        return performance
      })
    : []
  // 3. if performance is not in the array, add it
  if (!updatedPerformance.some((performance: { tag: string; learnedWords: string[] }) => performance.tag === tag)) {
    updatedPerformance.push({ tag, learnedWords })
  }
  $user.set({ ...$user.get(), performance: updatedPerformance })
}

export const deletePerformance = (tag: string) => {
  const { [tag]: _, ...updatedPerformance } = $user.get().performance
  $user.set({ ...$user.get(), performance: updatedPerformance })
}
