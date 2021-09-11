export function cn(...args: any) {
  return {
    className: args
      .filter((elem: any) => typeof elem === 'string' || elem)
      .join(' '),
  };
}
