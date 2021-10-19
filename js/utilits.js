const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  const numberStr = num.toString().slice(-2).split('').reverse();
  if (numberStr[0] === '1' && numberStr[1] !== '1') {
    return nominative;
  } else
  if ((numberStr[0] === '2' || numberStr[0] === '3' || numberStr[0] === '4') && numberStr[1] !== '1') {
    return genitiveSingular;
  }
  return genitivePlural;
};

export {numDecline};
