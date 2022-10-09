import {makeAutoObservable} from "mobx";
import {RowData} from "../Interfaces/RowData";



class DataStore {
    private _rows: RowData[]

    constructor() {
        this._rows = [
            {id: 0, title: "Южная строительная площадка №1", unit: "", quantity: 0, unitPrice: 0, price: 0, parent: null, type: "level"},
            {id: 1, title: "Фундаментальные работы", unit: "", quantity: 0, unitPrice: 0, price: 0, parent: 0, type: "level"},
            {id: 2, title: "Статья работы №1", unit: "м3", quantity: 1750, unitPrice: 108.07, price: 0, parent: 1, type: "row"},
            {id: 3, title: "Статья работы №2", unit: "л", quantity: 1200, unitPrice: 850, price: 0, parent: 1, type: "row"},
            {id: 4, title: "Южная строительная площадка №2", unit: "", quantity: 0, unitPrice: 0, price: 0, parent: null, type: "level"},
            {id: 5, title: "Фундаментальные работы", unit: "", quantity: 0, unitPrice: 0, price: 0, parent: 4, type: "level"},
            {id: 6, title: "Статья работы №1", unit: "м3", quantity: 1750, unitPrice: 108.07, price: 0, parent: 5, type: "row"},
            {id: 7, title: "Статья работы №2", unit: "л", quantity: 1200, unitPrice: 850, price: 0, parent: 5, type: "row"},
            {id: 8, title: "Статья работы №3", unit: "л", quantity: 1200, unitPrice: 850, price: 0, parent: 5, type: "row"},
        ]
        makeAutoObservable(this)
    }
    setRows(payload: RowData[]) {
        return this._rows = payload
    }
    get Rows() {
        return this._rows
    }
}

export default new DataStore()