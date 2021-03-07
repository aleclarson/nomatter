function nomatter(content, { open = '---', close = open } = {}) {
  const openRE = new RegExp('^\\n*' + open + '\\n', 'g');
  const closeRE = new RegExp('\\n' + close + '(\\n\\s*|$)', 'g');

  let match = openRE.exec(content);
  if (match) {
    closeRE.lastIndex = openRE.lastIndex - 1;
    match = closeRE.exec(content);
    if (match) {
      return content.slice(closeRE.lastIndex);
    }
  }

  return content;
}

module.exports = nomatter;
