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

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const timePromise = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const request = async (method, endpoint, jsonParams, useAuth = '') => {
  try {
    const req = await fetch(`${backendUrl}/${endpoint}`, {
      method,
      ...(method === 'POST' && {
        headers: {
          'Content-Type': 'application/json',
          ...(useAuth && { Authorization: useAuth }),
        },
        body: JSON.stringify({
          ...jsonParams,
        }),
      }),
    });
    if (req.status == 201) {
      const res = await req.json();
      return res;
    } else {
      return false;
    }
  } catch (error) {
    return { status: 'error', message: 'Network connectivity error.' };
  }
};

export const req = {
  post: async (params: any) => {
    try {
      const req = await fetch(`${backendUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...params,
        }),
      });
      const res = await req.json();
      return res;
    } catch (error) {
      return { status: 'error', message: 'Network connectivity error.' };
    }
  },
};
