export const cn = (...args) => ({
  className: args.filter((elem) => elem !== '' && elem !== false).join(''),
});

export const getCircularArrVal = (index, array) => {
  const arrLen = array.length;
  return array[((index % arrLen) + arrLen) % arrLen];
};

export const txtClipboard = async (
  text: string,
  onSuccess: any,
  onError: any,
) => {
  navigator.clipboard.writeText(text).then(
    () => {
      onSuccess();
    },
    (err) => {
      onError();
    },
  );
};

export const timePromise = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const request = async (method, endpoint, jsonParams) => {
  try {
    const req = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${endpoint}`,
      {
        method,
        ...(method === 'POST' && {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...jsonParams,
          }),
        }),
      },
    );
    if (req.status == 201) {
      const res = await req.json();
      return res;
    } else {
      return null;
    }
  } catch (error) {
    return { status: 'error', message: 'Network connectivity error.' };
  }
};
