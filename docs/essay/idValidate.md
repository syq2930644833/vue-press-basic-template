# 一些证件校验规则

## 校验身份证

> [规则参考]('https://zh.wikipedia.org/zh-hans/%E5%85%AC%E6%B0%91%E8%BA%AB%E4%BB%BD%E5%8F%B7%E7%A0%81')

```ts
interface IFormatId {
    address: string | null;
    birth: string | null;
    code: string | null;
}

class IdValidate {
    // 每一位的加权数
    static powerMap = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 余数对应的最后一位校验码
    static codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    id: string;
    oldCard: boolean = false;

    constructor(id: string) {
        this.id = id;
        this.normalId();
    }

    // 兼容15位身份证
    normalId() {
        // 15位：年份只有后两位，没有校验码
        const id = this.id;
        if (id.length === 15) {
            const id17 = id.substring(0, 6) + '19' + id.substring(6);
            this.id = id17 + this.getCode(id17);
            this.oldCard = true;
        }
    }

    // 根据前17位算出最后一位
    getCode(str: string): string {
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += +str[i]! * IdValidate.powerMap[i]!;
        }
        return IdValidate.codeMap[sum % 11]!;
    }

    // 解析身份证号码得到每一块对应的数字
    formatId(): IFormatId {
        // 18位：省市区6位、年月日8位、随机数3位、校验码1位
        const id = this.id;
        // eslint-disable-next-line max-len
        const re = /^([1-8]\d{5})((?:19|20)\d{2}(?:(?:0[1-9])|(?:1[012]))(?:(?:0[1-9])|(?:[12]\d)|(?:3[01])))\d{3}([\dXx])$/;
        const execRes = re.exec(id);
        if (execRes) {
            return {
                address: execRes[1] || null,
                birth: execRes[2] || null,
                code: execRes[3] || null
            };
        }
        return {
            address: null,
            birth: null,
            code: null
        };
    }

    checkAddress(str: string): boolean {
        // 接收前6位的数字，检验前2位
        const re = /^1[1-5]|2[123]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|71|81|82$/;
        return re.test(str.substring(0, 2));
    }

    checkBirth(str: string): boolean {
        // 小于当前日期，并且日期合法
        const now = new Date();
        // @ts-ignore
        const [, year, month, day] = /(\d{4})(\d{2})(\d{2})/.exec(str);
        const realDate = new Date(+year, +month - 1, +day);
        const realYear = realDate.getFullYear();
        const realMonth = realDate.getMonth() + 1;
        const realDay = realDate.getDate();
        return realDate < now && +year === realYear && +month === realMonth && +day === realDay;
    }

    checkCode(code: string): boolean {
        // 1代身份证不用校验，因为本来就是手动算出来的
        if (this.oldCard) {
            return true;
        }
        const rightCode = this.getCode(this.id);
        return code === rightCode;
    }

    validate() {
        const formatRes = this.formatId();
        if (formatRes) {
            const {address, birth, code} = formatRes;
            if (address && birth && code) {
                return this.checkAddress(address) && this.checkBirth(birth) && this.checkCode(code);
            }
        }
        return false;
    }
}

// 校验身份证号
export function validateCNId(number: string): boolean {
    const validate = new IdValidate(number);
    return validate.validate();
}

// 校验身份证姓名
export function validateName(name) {
    // 所有的汉字及各种点的unicode,1-20个字符
    const re = /^[\p{Unified_Ideograph}\u25aa\u2022\u25cf\u00b7\u002e]{1,20}$/u;
    return re.test(name);
}
```

## 校验港澳台居民往来内地通行证

```js
// http://www.locpg.hk/fuzn/2013-03/05/c_125939266.htm
export function validateHKId(id) {
    // HM分别表示香港澳门，8位终身号码，2位换证次数
    const re = /^[HM]\d{8}(\d{2})?$/;
    // 台湾居民通行证号码为8位阿拉伯数字
    const reTW = /^\d{8}$/;
    return re.test(id) || reTW.test(id);
}
```

## 校验定居国外的中国公民护照
```js
// 第一位为字母，第二位为字母或数字，后7位为数字
export function validatePassportId(id) {
    const re = /^[a-zA-Z][a-zA-Z0-9]\d{7}$/;
    return re.test(id);
}
```

## 港澳台居民大陆居住证号码正则表达式
```ts
class HkRpIdValidate {
    // 每一位的加权数
    static powerMap = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 余数对应的最后一位校验码
    static codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    id: string;
    oldCard: boolean = false;

    constructor(id: string) {
        this.id = id;
        this.normalId();
    }

    // 兼容15位身份证
    normalId() {
        // 15位：年份只有后两位，没有校验码
        const id = this.id;
        if (id.length === 15) {
            const id17 = id.substring(0, 6) + '19' + id.substring(6);
            this.id = id17 + this.getCode(id17);
            this.oldCard = true;
        }
    }

    // 根据前17位算出最后一位
    getCode(str: string): string {
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            // @ts-ignore
            sum += +str[i] * powerMap[i];
        }
        return codeMap[sum % 11] || '';
    }

    // 解析身份证号码得到每一块对应的数字
    formatId() {
        // 18位：省市区6位、年月日8位、随机数3位、校验码1位
        const id = this.id;
        const re = /^(8[123]0000)((?:19|20)\d{2}(?:(?:0[1-9])|(?:1[012]))(?:(?:0[1-9])|(?:[12]\d)|(?:3[01])))\d{3}([\dXx])$/;
        const execRes = re.exec(id);
        if (execRes) {
            return {
                address: execRes[1],
                birth: execRes[2],
                code: execRes[3]
            };
        }
        return null;
    }

    checkAddress(str: string): boolean {
        // 接收前6位的数字，检验前2位
        const re = /^1[1-5]|2[123]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|71|81|82|83$/;
        return re.test(str.substring(0, 2));
    }

    checkBirth(str: string): boolean {
        // 小于当前日期，并且日期合法
        const now = new Date();
        // @ts-ignore
        const [_, year, month, day] = /(\d{4})(\d{2})(\d{2})/.exec(str);
        const realDate = new Date(+year, +month - 1, +day);
        const realYear = realDate.getFullYear();
        const realMonth = realDate.getMonth() + 1;
        const realDay = realDate.getDate();
        return realDate < now && +year === realYear && +month === realMonth && +day === realDay;
    }

    checkCode(code: string): boolean {
        // 1代身份证不用校验，因为本来就是手动算出来的
        if (this.oldCard) {
            return true;
        }
        const rightCode = this.getCode(this.id);
        return code === rightCode;
    }

    validate() {
        const formatRes = this.formatId();
        if (formatRes) {
            const {address = '', birth = '', code = ''} = formatRes;
            return this.checkAddress(address) && this.checkBirth(birth) && this.checkCode(code);
        }
        return false;
    }
}

// 港澳台居民大陆居住证号码正则表达式
export function validateHkRpId(id) {
    const validator = new HkRpIdValidate(id);
    return validator.validate();
}
```

## 校验外国人永久居留证

> 跟身份证规则差不多, 首位数字固定为“9”，为外国人标识码

> [规则参考]('https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%A4%96%E5%9B%BD%E4%BA%BA%E6%B0%B8%E4%B9%85%E5%B1%85%E7%95%99%E8%BA%AB%E4%BB%BD%E8%AF%81')

```ts
interface IFormatForeignId {
    identificationCode: string | null;
    address: string | null;
    nationality: string | null;
    birth: string | null;
    code: string | null;
}

class ForeignIdValidate {
    // 每一位的加权数
    static powerMap = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 余数对应的最后一位校验码
    static codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    id: string;
    oldCard: boolean = false;

    constructor(id: string) {
        this.id = id;
        this.normalForeignId();
    }

    // 兼容15位外国人永久居留证
    normalForeignId() {
        const id = this.id;
        if (id.length === 15) {
            this.oldCard = true;
        }
    }

    // 根据前17位算出最后一位
    getCode(str: string): string {
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += +str[i]! * ForeignIdValidate.powerMap[i]!;
        }
        return ForeignIdValidate.codeMap[sum % 11]!;
    }

    // 解析身份证号码得到每一块对应的数字
    formatId(): IFormatForeignId {
        // 18位：第一位固定是9、申领地2位、国籍国代码3位、年月日8位、顺序码3位、校验码1位
        const id = this.id;
        // eslint-disable-next-line max-len
        const re = /^([9])([1-8]\d{1})([0-9]\d{2})((?:19|20)\d{2}(?:(?:0[1-9])|(?:1[012]))(?:(?:0[1-9])|(?:[12]\d)|(?:3[01])))\d{3}([\dXx])$/;
        const execRes = re.exec(id);
        if (execRes) {
            return {
                identificationCode: execRes[1] || null,
                address: execRes[2] || null,
                nationality: execRes[3] || null,
                birth: execRes[4] || null,
                code: execRes[5] || null
            };
        }
        return {
            identificationCode: null,
            address: null,
            nationality: null,
            birth: null,
            code: null
        };
    }

    checkIdentificationCode(str: string): boolean {
        // 接收第一位标识码 判断是否固定为9
        return str === '9';
    }

    checkAddress(str: string): boolean {
        // 接收申领地2位数字 即中国省级行政区划代码
        const re = /^1[1-5]|2[123]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|71|81|82$/;
        return re.test(str);
    }

    checkBirth(str: string): boolean {
        // 小于当前日期，并且日期合法
        const now = new Date();
        // @ts-ignore
        const [, year, month, day] = /(\d{4})(\d{2})(\d{2})/.exec(str);
        const realDate = new Date(+year, +month - 1, +day);
        const realYear = realDate.getFullYear();
        const realMonth = realDate.getMonth() + 1;
        const realDay = realDate.getDate();
        return realDate < now && +year === realYear && +month === realMonth && +day === realDay;
    }

    checkCode(code: string): boolean {
        const rightCode = this.getCode(this.id);
        return code === rightCode;
    }

    validate() {
        if (this.oldCard) {
            // 旧版按旧版规则走
            // 15位，前三位为国籍缩写，后12位为阿拉伯数字
            const re = /^[a-zA-Z]{3}\d{12}$/;
            return re.test(this.id);
        }

        const formatRes = this.formatId();
        if (formatRes) {
            const {identificationCode, address, birth, code} = formatRes;
            if (identificationCode && address && birth && code) {
                return this.checkIdentificationCode(identificationCode)
                    && this.checkAddress(address) && this.checkBirth(birth) && this.checkCode(code);
            }
        }

        return false;
    }
}

// 校验外国人永久居留证
export function validateForeignId(id: string): boolean {
    const validate = new ForeignIdValidate(id);
    return validate.validate();
}

// 校验外国人永久居留证姓名
// 英文，支持逗号（英文）
export function validateForeignName(name) {
    const re = /^[a-zA-Z]+,?[a-zA-Z]+$/;
    return re.test(name);
}
```
