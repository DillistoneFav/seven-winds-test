import {RowData} from "../../../Interfaces/RowData";
import DataStore from "../../../Store/DataStore";
import React from "react";

export function recalculation(parentID: number | null, storage: RowData[]) {
    const rows = [...storage]
    const changedRows: RowData[] = []

    if (parentID == null) return changedRows
    let currentParentIndex = rows.findIndex((v) => v.id === parentID)
    if (currentParentIndex === -1) return changedRows
    let currentParent = rows[currentParentIndex]

    do {
        const children = rows.filter((v) => v.parent === currentParent.id)
        const newPrice = children.reduce((acc, v) => acc + v.price, 0)
        if (currentParent.price === newPrice) break

        rows[currentParentIndex].price = newPrice
        changedRows.push(rows[currentParentIndex])

        currentParentIndex = rows.findIndex((v) => v.id === currentParent.parent)
    } while (currentParentIndex !== -1)
    return changedRows
}

export function calculatePrice(storage: RowData[]) {
    storage.forEach(item => {
        if (item.type === "row") {
            item.price = item.unitPrice * item.quantity
        }
    })
    for (let i = storage.length; i--; i === -1) {
        recalculation(storage[i].parent, storage)
    }
}

export function editRow(row: RowData, storage: RowData[]) {
    let arr = [...storage]
    const index = storage.findIndex((v) => v.id === row.id)
    arr.splice(index, 1, row)
    calculatePrice(arr)
   return DataStore.setRows(arr)
}

export const checkChilds = (parentId: number, rowData: RowData[]) => {
    let rows: RowData[] = [...rowData]
    return rows.filter(item => {
        return item.parent === parentId
    })
}

export const checkIfParentTopLevel = (parentId: number, rowData: RowData[]) => {
    let rows: RowData[] = [...rowData]
    let parent = rows.find(item => item.id === parentId)
    return parent!.parent === null
}

export const handleAddRow = (
        functionCase: string,
        row: RowData,
        rowData: RowData[],
        setIsEditing: (arg0: boolean) => void,
        setEditingRow: (arg0: RowData) => void
) => (event: React.MouseEvent<HTMLOrSVGElement>) => {
    setIsEditing(true)
    let arr = [...rowData]
    let childs: RowData[];
    let rowIndex: number = 0;
    let addingObj: RowData = {} as RowData;

    switch (functionCase) {
        case "addTopLevel":
            rowIndex = arr.findIndex(item => item.id === arr[arr.length - 1].id)
            addingObj = {
                id: Math.max(...arr.map((v) => v.id), 0) + 1,
                title: "",
                unit: "",
                quantity: 0,
                unitPrice: 0,
                price: 0,
                parent: null,
                type: "level"
            }
            break;

        case "addSecondLevel":
            childs = arr.filter(item => {
                return item.parent === row.id
            })
            if (childs.length) {
                let childsArray = arr.filter(item => item.parent === childs[childs.length - 1].id)
                rowIndex = arr.findIndex(item => item.id === childsArray[childsArray.length - 1].id)
            } else {
                rowIndex = arr.findIndex(item => item.id === row.id)
            }

            addingObj = {
                id: Math.max(...arr.map((v) => v.id), 0) + 1,
                title: "",
                unit: "",
                quantity: 0,
                unitPrice: 0,
                price: 0,
                parent: row.id,
                type: "level"
            }
            break;

        case "addList":
            childs = arr.filter(item => {
                return item.parent === row.id
            })
            childs.length ?
                rowIndex = arr.findIndex(item => item.id === childs[childs.length - 1].id)
                :
                rowIndex = arr.findIndex(item => item.id === row.id)
            addingObj = {
                id: Math.max(...arr.map((v) => v.id), 0) + 1,
                title: "",
                unit: "",
                quantity: 0,
                unitPrice: 0,
                price: 0,
                parent: row.id,
                type: "row"
            }
            break;

        case "addListWithTopLevelParent":
            rowIndex = arr.findIndex(item => item.id === row.id)
            addingObj = {
                id: Math.max(...arr.map((v) => v.id), 0) + 1,
                title: "",
                unit: "",
                quantity: 0,
                unitPrice: 0,
                price: 0,
                parent: row.id,
                type: "row"
            }
            break;
    }
    arr.splice(rowIndex + 1, 0, addingObj)
    setEditingRow(arr[rowIndex + 1])
    return DataStore.setRows(arr)
}