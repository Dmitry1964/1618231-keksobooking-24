const ALERT_SHOW_TIME = 3000;

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  const numberStr = num.toString().slice(-2).split('').reverse();
  if (numberStr[0] === '1' && numberStr[1] !== '1') {
    return nominative;
  } else if ((numberStr[0] === '2' || numberStr[0] === '3' || numberStr[0] === '4') && numberStr[1] !== '1') {
    return genitiveSingular;
  }
  return genitivePlural;
};

const showAlert = (message) => {
  const messageContainer = document.createElement('div');
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.style.position = 'relative';
  messageContainer.style.zIndex = 1000;
  messageContainer.style.position = 'absolute';
  messageContainer.style.left = 'calc(50% - 300px)';
  messageContainer.style.top = '150px';
  messageContainer.style.width = '600px';
  messageContainer.style.height = '180px';
  messageContainer.style.borderRadius = '10px';
  messageContainer.style.padding = '50px';
  messageContainer.style.color = 'white';
  messageContainer.style.fontSize = '30px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.backgroundColor = 'red';
  messageContainer.textContent = message;

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { numDecline, showAlert };
