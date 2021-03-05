//引入默认图片
import baseImg from '@/assets/logo.png';

//检测浏览器是否支持IntersectionObserver特性
function checkIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        return true;
    }
    return false;
}

// 检查元素是否在加载区域内
function isInViewPort(element) {
    const viewWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const viewHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    const { top, right, bottom, left } = element.getBoundingClientRect();

    return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}

//创建一个监听器
let observer = new IntersectionObserver((entries) => {
    //entries是所有被监听对象的集合
    entries.forEach((entry) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
            //当被监听元素到临界值且未加载图片时触发。
            !entry.target.isLoaded &&
                otherShowImage(
                    entry.target,
                    entry.target.getAttribute('data_src')
                );
            observer.unobserve(entry.target);
        }
    });
});

// eslint-disable-next-line no-unused-vars
function otherShowImage(el, imgSrc) {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
        el.src = imgSrc;
        el.isLoaded = true;
    };
}

function showImage(el) {
    if (isInViewPort(el) && el.getAttribute('loaded') === 'false') {
        const img = new Image();
        img.src = el.getAttribute('data_src');
        img.onload = () => {
            el.src = el.getAttribute('data_src');
            el.setAttribute('loaded', true);
        };
    }
}

// 节流函数
function _throttle(fn, gapTime) {
    let _lastTime = null;

    return function() {
        let _nowTime = +new Date();
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn();
            _lastTime = _nowTime;
        }
    };
}

export default {
    //这里用inserted和bind都行，因为IntersectionObserver时异步的，以防意外还是用inserted好一点
    //inserted和bind的区别在于inserted时元素已经插入页面，能够直接获取到dom元素的位置信息。
    inserted(el, binding) {
        if (checkIntersectionObserver()) {
            let img = new Image();
            img.src = baseImg;
            img.onload = () => {
                el.src = baseImg; // 赋予默认值
                el.setAttribute('data_src', binding.value);
                observer.observe(el);
            };
        } else {
            let img = new Image();
            img.src = baseImg;
            img.onload = () => {
                el.src = baseImg; // 赋予默认值
                el.setAttribute('data_src', binding.value);
                el.setAttribute('loaded', false);
                showImage(el);
            };
            window.addEventListener(
                'scroll',
                _throttle(() => {
                    showImage(el);
                }, 500)
            );
        }
    }, //图片更新触发
    update(el, binding) {
        el.isLoaded = false;
        el.data_src = binding.value;
    },
};
