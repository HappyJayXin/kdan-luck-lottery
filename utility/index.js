export const shuffle = (arr) => {
  const len = arr.length;

  for (let i = len - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }

  return arr;
};

const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
};

export const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }

  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
};

export const reduceArray = (array1, array2) => {
  let newArray = [...array1]; 

  // Remove duplicates from array2
  array2.forEach(function (value) {
    var index = newArray.indexOf(value);
    if (index !== -1) {
      newArray.splice(index, 1);
    }
  });

  return newArray;
};

export const smoothScrollTo = (element, target, duration = 500) => {
  if (typeof window.requestAnimationFrame !== 'function') {
    fallbackScrollTo(element, target);
    element.scrollTop = target;
    return;
  }

  const start = element.scrollTop;
  const change = target - start;
  const startTime = performance.now();

  const easeInOutQuad = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutQuad(progress);

    element.scrollTop = start + change * ease;

    if (progress < 1) {
      window.requestAnimationFrame(animateScroll);
    }
  };

  window.requestAnimationFrame(animateScroll);
};
