import {
  parseJson,
  parseJsonWithDefault,
  stringifyJson,
  stringifyJsonWithDefault,
} from '../json'

describe('json', () => {
  it('should parse valid JSON strings into objects', () => {
    expect(parseJson<{name: string}>('{"name":"bichi"}')).toEqual({name: 'bichi'})
  })

  it('should return null from parseJson when the string is invalid', () => {
    expect(parseJson('{')).toBeNull()
  })

  it('should return the default value from parseJsonWithDefault when parsing fails', () => {
    expect(parseJsonWithDefault('{', {name: 'default'})).toEqual({name: 'default'})
  })

  it('should stringify objects to JSON strings', () => {
    expect(stringifyJson({name: 'bichi'})).toBe('{"name":"bichi"}')
  })

  it('should return null from stringifyJson when serialization fails', () => {
    const circular: any = {}
    circular.self = circular
    expect(stringifyJson(circular)).toBeNull()
  })

  it('should return the default string from stringifyJsonWithDefault when serialization fails', () => {
    const circular: any = {}
    circular.self = circular
    expect(stringifyJsonWithDefault(circular, '{}')).toBe('{}')
  })
})
