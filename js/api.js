const Urls = {
  GET: 'https://24.javascript.pages.academy/keksobooking/data',
  POST: ' https://24.javascript.pages.academy/keksobooking',
};

const request = (onSuccess, onError, method, body) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};

export { request };

