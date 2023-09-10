const getSrcURLs = srcs => {
  let src = ``;
  srcs.map((value, i) => {
    if (i !== srcs.length - 1) {
      src = `${src}${value},`;
    } else {
      src += value;
    }
    return undefined;
  });
  return src;
};

export const injectFontFaces = (
  name,
  src = [],
  fontWeight = 'normal',
  fontStyle = 'normal',
) => `
  @font-face {
    font-family: ${name};
    src: ${getSrcURLs(src)};
    font-weight: ${fontWeight};
    font-style: ${fontStyle};
}`;

export default injectFontFaces;
