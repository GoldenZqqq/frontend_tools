import { cloneDeep } from "lodash-es"

export function useResetableRef<T>(value: T) {
  const initialValue = cloneDeep(value)
  const state = ref(value)
  const reset = () => {
    state.value = cloneDeep(initialValue)
  }
  return [state, reset] as const
}

export function useResetableReactive<T extends object>(value: T) {
  const state = reactive(cloneDeep(value)) as T

  const reset = () => {
    Object.keys(state).forEach(key => {
      delete (state as any)[key]
    })
    Object.assign(state, cloneDeep(value))
  }

  return [state, reset] as const
}
