
export function getItems(key){
    return(JSON.parse(window.localStorage.getItem(key)))
}

export function setItems(key,value){
    window.localStorage.setItem(key,JSON.stringify(value))
}
