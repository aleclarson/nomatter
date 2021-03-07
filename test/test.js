const { readFileSync } = require('fs');

const nomatter = require('../');

describe('nomatter', () => {
  it('works with no front matter', () => {
    expect(nomatter('a')).toBe('a');
  });

  it('bails if front matter is unclosed', () => {
    expect(nomatter('---\n')).toBe('---\n');
  });

  it('works with empty front matter', () => {
    expect(nomatter('---\n---\na')).toBe('a');
  });

  it('allows empty lines before front matter', () => {
    expect(nomatter('\n\n---\na: b\n---\na')).toBe('a');
  });

  it('removes empty lines after front matter', () => {
    expect(nomatter('---\na: b\n---\n\n\na')).toBe('a');
  });

  it('works with non-empty front matter', () => {
    const content = readFileSync('./test/fixtures/default.md', 'utf-8');
    expect(nomatter(content)).toBe("# This shouldn't be removed.");
  });

  it('works with custom delimiters', () => {
    const content = readFileSync('./test/fixtures/custom.md', 'utf-8');
    const actual = nomatter(content, { open: '~~~', close: '~~~' });
    expect(actual).toBe("# This shouldn't be removed.");
  });

  it('assumes the close delimiter from open', () => {
    const content = readFileSync('./test/fixtures/custom.md', 'utf-8');
    const actual = nomatter(content, { open: '~~~' });
    expect(actual).toBe("# This shouldn't be removed.");
  });
});
