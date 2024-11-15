import { cloneDeep } from 'lodash-es'

export function useResetableRef<T>(value: T) {
  const initialValue = cloneDeep(value)
  const state = ref(value)
  const reset = () => {
    state.value = cloneDeep(initialValue)
  }
  return [state, reset] as const
}
