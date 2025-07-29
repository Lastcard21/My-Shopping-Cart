export function setItemInStorage(name, data) {
    return localStorage?.setItem(name, JSON.stringify(data))
}

export function getItemFromStorage(name) {
    return localStorage?.getItem(name)
}

export function getParsedItemFromStorage(name) {
    return JSON.parse(localStorage?.getItem(name))
}

export function removeItemFromStorage(name) {
    return localStorage?.removeItem(name)
}