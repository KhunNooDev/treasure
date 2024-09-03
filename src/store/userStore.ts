import { persistentAtom } from '@nanostores/persistent'

export const $user = persistentAtom(
  'user',
  {
    name: '',
    email: '',
    performance: [
      // {
      //   tag: 'people',
      //   score: 0,
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

export const saveScore = (tag: string, score: number) => {
  const updatedPerformance = { ...$user.get().performance, [tag]: score }
  $user.set({ ...$user.get(), performance: updatedPerformance })
}
