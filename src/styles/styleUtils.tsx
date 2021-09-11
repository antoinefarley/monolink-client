const sv = {
  boxShadow: `0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
  0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
  0 16px 16px rgba(0, 0, 0, 0.12);`,
  main: 'black',
  bg: 'rgb(242, 240, 240)',
  text_alt: 'ghostwhite',
  text_bg: 'ghostwhite',
  border: 'black',
  confirm_green: 'rgb(54, 224, 105)',
  cancel_red: 'rgb(255, 0, 0)',
  purple: 'rgb(103, 2, 170)',
  green: 'rgb(85, 199, 85)',
  red: 'rgb(218, 67, 67)',
};

const sf = {
  wh: (width = 'auto', height = 'auto') => `
    width: ${width};
    height: ${height};
  `,
  flex: (direction = 'row', justifyContent = 'center') => `
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justifyContent};
  `,
  border: (border, borderRadius = '0px') => `
    border: ${border};
    border-radius: ${borderRadius};
  `,
  child0Auto: (height = '100%') => `
    > * {
      margin: 0 auto;
      width: auto;
      height: ${height};
    }
  `,
};

export { sf, sv };
