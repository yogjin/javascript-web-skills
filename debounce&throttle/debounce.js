const $debounceInput = document.querySelector('#debounce');
const $defaultInput = document.querySelector('#default');

const $defaultResult = document.querySelector('#request-default');
const $debounceResult = document.querySelector('#request-debounce');

const ajaxRequestDefault = (e) => {
  $defaultResult.insertAdjacentHTML('beforeend', `<li>${e.target.value}</li>`);
};

const ajaxRequestDebounce = (e) => {
  $debounceResult.insertAdjacentHTML('beforeend', `<li>${e.target.value}</li>`);
};

// 클로저 개념 이용
// 이전 타이머의 delay 시간이 끝나지 않았을 때 새로운 요청을 하면, 이전 타이머는 취소되고 새로운 요청의 타이머로 교체된다.
// input에 사용자 입력에 따라 서버에 요청해야할 때 유용하다. (검색어 자동완성, 검색결과 출력 등)
const debounce = (func, delay, leading = false) => {
  let timer;

  if (leading) {
    return (e) => {
      !timer ? func(e) : clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    };
  } else {
    return (e) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => func(e), delay);
    };
  }
};

$defaultInput.addEventListener('input', ajaxRequestDefault);
$debounceInput.addEventListener('input', debounce(ajaxRequestDebounce, 500));
