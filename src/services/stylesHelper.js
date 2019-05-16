export function getRandomColor() {
  const color = Math.random()
    .toString(16)
    .substring(2, 8);
  return `#${color}`;
}

export function inverseColor(rawColor) {
  const hexPattern = /#[A-Fa-f0-9]/;
  const isValidColor = !!rawColor && typeof rawColor === 'string' && hexPattern.test(rawColor);

  if (isValidColor) {
    let color = rawColor.replace('#', '');

    if (color.length === 3) {
      color = color.replace(/./g, match => match + match);
    }

    const hex = parseInt(color, 16);
    /* eslint-disable-next-line no-bitwise */
    const inversedColor = (~hex & 0xffffff)
      .toString(16)
      .padStart(6, '0')
      .toLowerCase();
    return `#${inversedColor}`;
  }
  return '#ffffff';
}
