/*
* queryselet dom
* */
export function query(el) { // el 可能为string 和 element类型
    if (typeof el === 'string') {
        const selected = document.querySelector(el)
        if (!selected) {
            return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}