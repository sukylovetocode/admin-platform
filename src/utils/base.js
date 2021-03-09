import Cookies from 'js-cookie';

export function getCookies(key) {
    return Cookies.get(key);
}

export function setCookies(key, name) {
    return Cookies.set(key, name);
}

export function removeCookies(key) {
    return Cookies.remove(key);
}

export function getViewHeight() {
    /* IE8以下不支持window.innerHeight 属性 */
    return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    );
}

// 获取当前光标选区
export function getSelection(editorNode) {
    // 获取selection对象
    const selection = window.getSelection
        ? window.getSelection()
        : document.getSelection();
    // 从selection中获取第一个Range对象
    const range = selection.getRangeAt(0);
    let startNode = range.startContainer;
    let endNode = range.endContainer;
    // 兼容IE11 node.contains(textNode) 永远 return false 的bug
    startNode =
        startNode.nodeType === Node.TEXT_NODE
            ? startNode.parentNode
            : startNode;
    endNode =
        endNode.nodeType === Node.TEXT_NODE ? endNode.parentNode : endNode;
    // 光标选区是否在编辑器内
    if (editorNode.contains(startNode) && editorNode.contains(endNode)) {
        return range;
    }
    return null;
}

// 设置光标选区
export function setSelection(selectNode, startPos, endPos) {
    // 首先获取selection对象并清除当前的Range
    const selection = window.getSelection
        ? window.getSelection()
        : document.getSelection();
    selection.removeAllRanges();
    // 重新设置Range
    const range = document.createRange();
    range.setStart(selectNode, startPos);
    range.setEnd(selectNode, endPos);
    selection.addRange(range);
}
