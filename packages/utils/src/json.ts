export const parseJson = <S>(value: string): S | null => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export const parseJsonWithDefault = <S>(value: string, defaultValue: S): S | null => {
  return parseJson<S>(value) ?? defaultValue
}

export const stringifyJson = <S>(value: S): string | null => {
  try {
    return JSON.stringify(value)
  } catch {
    return null
  }
}

export const stringifyJsonWithDefault = <S>(value: S, defaultValue: string): string | null => {
  return stringifyJson<S>(value) ?? defaultValue
}
