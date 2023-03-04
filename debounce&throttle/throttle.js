const $resizeDefault = document.querySelector('#resize-default');
const $resizeThrottle = document.querySelector('#resize-throttle');
let countDefault = 0;
let countThrottle = 0;

// 쓰로틀도 디바운스와 똑같이 클로저 개념을 이용한다.
// 디바운스와 다르게 쓰로틀은 이전 요청 delay 중에 새로운 요청이 들어와도 이전 요청을 삭제하지 않는다.
// delay가 끝나면 새로운 요청을 받을 수 있다.
const throttle = (func, delay) => {
  let timer;
  return (...args) => {
    if (timer) return;

    timer = setTimeout(() => {
      timer = null;
      func(...args);
    }, delay);
  };
};

const logDefault = () => {
  $resizeDefault.innerHTML += ` ${++countDefault}`;
};

const logThrottle = () => {
  $resizeThrottle.innerHTML += ` ${++countThrottle}`;
};

window.addEventListener('scroll', logDefault);
window.addEventListener('scroll', throttle(logThrottle, 500));
