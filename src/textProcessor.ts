export function processText(text: string): string {
  if (!text.trim()) return text;

  let processed = text;

  processed = processed.replace(/（/g, ' (').replace(/）/g, ') ');

  const japaneseChar = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF]/;

  processed = processed.replace(/([a-zA-Z]+)/g, (match, _p1, offset, string) => {
    const beforeChar = offset > 0 ? string[offset - 1] : '';
    const afterChar = offset + match.length < string.length ? string[offset + match.length] : '';

    let result = match;

    // 前の文字が日本語文字で、スペースがない場合は前にスペースを追加する。
    if (beforeChar && japaneseChar.test(beforeChar) && beforeChar !== ' ') {
      result = ' ' + result;
    }

    // 後の文字が日本語文字で、スペースがない場合は後にスペースを追加する。
    if (afterChar && japaneseChar.test(afterChar) && afterChar !== ' ') {
      result = result + ' ';
    }

    return result;
  });

  // 数字の前後に半角スペースを追加する。
  processed = processed.replace(/(\d+)/g, (match, _p1, offset, string) => {
    const beforeChar = offset > 0 ? string[offset - 1] : '';
    const afterChar = offset + match.length < string.length ? string[offset + match.length] : '';

    let result = match;

    // 前の文字が日本語文字で、スペースがない場合は前にスペースを追加する。
    if (beforeChar && japaneseChar.test(beforeChar) && beforeChar !== ' ') {
      result = ' ' + result;
    }

    // 後の文字が日本語文字で、スペースがない場合は後にスペースを追加する。
    if (afterChar && japaneseChar.test(afterChar) && afterChar !== ' ') {
      result = result + ' ';
    }

    return result;
  });

  // 複数の連続するスペースを単一のスペースに統合する。
  processed = processed.replace(/\s+/g, ' ');

  return processed.trim();
}
