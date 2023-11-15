# 一些常用工具类


## 判断是不是IOS
```js
// 判断是不是IOS
export function isIOS() {
    const ua = window.navigator.userAgent;
    return !!(/(iPhone|iPod|iPad);?/i.exec(ua));
}

const isIos = isIOS();
```

## 判断是不是Android
```js
// 判断是不是Android
export function isAndroid() {
    const ua = window.navigator.userAgent;
    return !!(/android/i.exec(ua));
}

const isAndroid = isAndroid();
```

## 获取ios系统版本
```js
// 获取ios系统版本
export function getIosVerStr() {
    const userAgent = navigator.userAgent;
    const reg = /CPU iPhone OS (.*?) like Mac OS/i;
    const verMatch = reg.exec(userAgent);
    if (verMatch) {
        const verStr = verMatch[1];
        return verStr!.replace(/_/g, '.');
    }
    return '';
}
```

## 判断是否低于某个版本
```js
// 判断是否低于某个版本
export function isVerLessThan(ver, compareVer) {
    const verArr = ver.split('.');
    const compareVerArr = compareVer.split('.');
    const minLength = Math.max(compareVerArr.length, verArr.length);
    for (let i = 0; i < minLength; i++) {
        if (verArr[i] < compareVerArr[i]) {
            return true;
        }
        else if (verArr[i] > compareVerArr[i]) {
            return false;
        }
    }
    return false;
}

const iosVer = getIosVerStr();
const isIosLow = isVerLessThan(iosVer, '13.4');
```

## queryParser
```js
export const queryParser = query => {
    if (!query) {
        return {};
    }

    const pairs = query.split('?')[1].split('&');

    return pairs.reduce((previous, current) => {
        const [key, value = ''] = current.split('=');

        return {
            ...previous,
            [key]: value
        };
    }, {});
}

const query = queryParser(window.location.search);
```

## obj2param

```js
export function obj2param(obj) {
    return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
}
```

## param2obj

```js
export function param2obj(search) {
    return search.substr(1).split('&').reduce((pre, cur) => {
        const [name, val] = cur.split('=');
        if (typeof (name) !== 'undefined' && typeof (val) !== 'undefined') {
            pre[name] = val;
        }
        return pre;
    }, {});
}

const searchParams = param2obj(window.location.search);
```
