import { CollectionInterface, TaskInterface } from "./interfaces"
export function getItems(key: string){
    return(JSON.parse(window.localStorage.getItem(key)))
}

export function setItems(key: string,value: CollectionInterface[]|TaskInterface[]):void{
    window.localStorage.setItem(key,JSON.stringify(value))
}
