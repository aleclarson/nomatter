/*
 * antimatter
 * https://github.com/jonschlinkert/antimatter
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

const { readFileSync } = require('fs');

const antimatter = require('../');

describe('antimatter', () => {
  it('works with no front matter', () => {
    expect(antimatter('a')).toBe('a');
  });

  it('bails if front matter is unclosed', () => {
    expect(antimatter('---\n')).toBe('---\n');
  });

  it('works with empty front matter', () => {
    expect(antimatter('---\n---\na')).toBe('a');
  });

  it('allows empty lines before front matter', () => {
    expect(antimatter('\n\n---\na: b\n---\na')).toBe('a');
  });

  it('removes empty lines after front matter', () => {
    expect(antimatter('---\na: b\n---\n\n\na')).toBe('a');
  });

  it('works with non-empty front matter', () => {
    const content = readFileSync('./test/fixtures/default.md', 'utf-8');
    expect(antimatter(content)).toBe("# This shouldn't be removed.");
  });

  it('works with custom delimiters', () => {
    const content = readFileSync('./test/fixtures/custom.md', 'utf-8');
    const actual = antimatter(content, { open: '~~~', close: '~~~' });
    expect(actual).toBe("# This shouldn't be removed.");
  });

  it('assumes the close delimiter from open', () => {
    const content = readFileSync('./test/fixtures/custom.md', 'utf-8');
    const actual = antimatter(content, { open: '~~~' });
    expect(actual).toBe("# This shouldn't be removed.");
  });
});
