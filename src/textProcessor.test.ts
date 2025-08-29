import { describe, it, expect } from 'vitest'
import { processText } from './textProcessor'

describe('processText', () => {
  describe('empty and whitespace-only strings', () => {
    it('returns strings as-is', () => {
      expect(processText('')).toBe('')
      expect(processText(' ')).toBe(' ')
    })
  })

  describe('convert full-width to half-width', () => {
    it('converts full-width English letters to half-width', () => {
      expect(processText('ＡＢＣ')).toBe('ABC')
      expect(processText('ａｂｃ')).toBe('abc')
      expect(processText('ＡＢＣａｂｃ')).toBe('ABCabc')
    })

    it('converts full-width numbers to half-width', () => {
      expect(processText('０１２３４５６７８９')).toBe('0123456789')
    })

    it('converts mixed full-width alphanumeric characters', () => {
      expect(processText('Ａ１ｂ２')).toBe('A1b2')
    })
  })

  describe('convert parentheses', () => {
    it('converts full-width parentheses to half-width with spaces', () => {
      expect(processText('（test）')).toBe('(test)')
    })

    it('handles parentheses with Japanese text', () => {
      expect(processText('これは（テスト）です')).toBe('これは (テスト) です')
    })
  })

  describe('insert spaces around English letters', () => {
    it('adds spaces around English letters adjacent to Japanese characters', () => {
      expect(processText('これはtestです')).toBe('これは test です')
      expect(processText('testです')).toBe('test です')
      expect(processText('これはtest')).toBe('これは test')
    })

    it('does not add extra spaces when spaces already exist', () => {
      expect(processText('これは test です')).toBe('これは test です')
    })

    it('handles multiple English words', () => {
      expect(processText('これはhelloとworldです')).toBe('これは hello と world です')
    })
  })

  describe('insert spaces around numbers', () => {
    it('adds spaces around numbers adjacent to Japanese characters', () => {
      expect(processText('これは123です')).toBe('これは 123 です')
      expect(processText('123です')).toBe('123 です')
      expect(processText('これは123')).toBe('これは 123')
    })

    it('does not add extra spaces when spaces already exist', () => {
      expect(processText('これは 123 です')).toBe('これは 123 です')
    })

    it('handles multiple numbers', () => {
      expect(processText('これは123と456です')).toBe('これは 123 と 456 です')
    })
  })

  describe('complex cases', () => {
    it('handles full-width alphanumeric with Japanese text', () => {
      expect(processText('これはＴｅｓｔ１２３です')).toBe('これは Test123 です')
    })

    it('handles full-width parentheses with full-width content', () => {
      expect(processText('これは（Ｔｅｓｔ１２３）です')).toBe('これは (Test123) です')
    })

    it('removes multiple consecutive spaces', () => {
      expect(processText('これは    test    です')).toBe('これは test です')
    })

    it('handles mixed English and numbers with Japanese', () => {
      expect(processText('これはversion1.0です')).toBe('これは version1.0 です')
    })

    it('preserves existing proper spacing', () => {
      expect(processText('This is English text')).toBe('This is English text')
    })
  })

  describe('edge cases', () => {
    it('handles single characters', () => {
      expect(processText('あ')).toBe('あ')
      expect(processText('a')).toBe('a')
      expect(processText('1')).toBe('1')
      expect(processText('Ａ')).toBe('A')
    })

    it('handles text with only spaces and Japanese', () => {
      expect(processText('これ は テスト です')).toBe('これ は テスト です')
    })

    it('handles text starting and ending with English/numbers', () => {
      expect(processText('testこれはtest')).toBe('test これは test')
      expect(processText('123これは456')).toBe('123 これは 456')
    })
  })
})
