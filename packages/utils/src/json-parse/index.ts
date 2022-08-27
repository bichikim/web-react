const {parse} = JSON

/**
 * string 을 object 로 파싱 합니다 오류가 나면 defaultValue 를 반환 합니다
 * @param data
 * @param defaultValue
 */
export const jsonParse = (data: string, defaultValue: Record<string, any> = {}) => {
  try {
    return parse(data)
  } catch {
    return defaultValue
  }
}
