import { persistentAtom } from '@nanostores/persistent'

export const $hideNav = persistentAtom('hideNav', false, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const setHideNav = (hideNav: boolean) => {
  $hideNav.set(hideNav)
}
