import React, {FC, useEffect, useState} from 'react';
import './ItemsTree.scss'
import DataStore from "../../../Store/DataStore";
import {observer} from "mobx-react";
import type {ColumnsType} from 'antd/es/table';
import {RowData} from "../../../Interfaces/RowData";
import {Input, Table} from "antd";
import topLevelIcon from "../../../Assets/1stLevelItems.svg"
import secondLevelIcon from "../../../Assets/secondLevelItems.svg"
import listIcon from "../../../Assets/ItemExactlyIcon.svg"
import {calculatePrice, checkChilds, checkIfParentTopLevel, editRow, handleAddRow} from "./functions";

const ItemsTree = observer(() => {
    const [isEditing, setIsEditing] = useState<boolean>(true)
    const [rowIndexForButton, setRowIndexForButton] = useState<number>(-1)
    const {Rows} = DataStore
    const [editingRow, setEditingRow] = useState<RowData>(Rows[0])

    useEffect(() => {
        calculatePrice(Rows)
    }, [])

    const handleInputChange = (prop: keyof RowData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditingRow({...editingRow, [prop]: event.target.value});
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editRow(editingRow, Rows)
            setEditingRow({} as RowData)
            setIsEditing(false)
        }
    }

    const columns: ColumnsType<RowData> = [
        {
            title: 'Уровень',
            dataIndex: 'parent',
            key: 'Level',
            width: 130,
            render: (value, record, index) => {
                if (record.parent !== null && record.type === "level") {
                    return (
                        <div className={"iconsCont"}>
                            <div className={"secondLevelIcon"}>
                                <img src={secondLevelIcon} alt={"icon"} style={{marginLeft: "20px"}}/>
                                <span></span>
                            </div>
                            {!isEditing &&
                                <img
                                    src={listIcon}
                                    alt={"icon"}
                                    style={editingRow.id !== record.id ? {display: "block"} : {display: "none"}}
                                    className={rowIndexForButton === index ? "addStrIcon" : "addStrIcon opacity"}
                                    onClick={handleAddRow("addList", record, Rows, setIsEditing, setEditingRow)}
                                />
                            }
                        </div>
                    )
                } else if (record.type === "row" && checkIfParentTopLevel(record.parent!, Rows)) {
                    return (
                        <div className={"listIcon"} style={{paddingLeft: "20px"}}>
                            <img src={listIcon} alt={"icon"}/>
                            <span></span>
                        </div>
                    )
                } else if (record.type === "row") {
                    return (
                        <div className={"listIcon"} style={{paddingLeft: "40px"}}>
                            <img src={listIcon} alt={"icon"}/>
                            <span></span>
                        </div>
                    )
                }
                return (
                    <div className={"iconsCont"}>
                        <div className={"topLevelIcon"}>
                            <img src={topLevelIcon} alt={"icon"}/>
                            {checkChilds(record.id, Rows).length && checkChilds(record.id, Rows)[0].type !== "row" ?
                                <span></span>
                                :
                                <></>
                            }
                        </div>
                        {!isEditing &&
                            <>
                                <img
                                    src={topLevelIcon}
                                    alt={"icon"}
                                    style={editingRow.id !== record.id ? {display: "block"} : {display: "none"}}
                                    className={rowIndexForButton === index ? "addStrIcon" : "addStrIcon opacity"}
                                    onClick={handleAddRow("addTopLevel", record, Rows, setIsEditing, setEditingRow)}
                                />
                                <img
                                    src={secondLevelIcon}
                                    alt={"icon"}
                                    style={editingRow.id !== record.id ? {display: "block"} : {display: "none"}}
                                    className={rowIndexForButton === index ? "addStrIcon" : "addStrIcon opacity"}
                                    onClick={handleAddRow("addSecondLevel", record, Rows, setIsEditing, setEditingRow)}
                                />
                                <img
                                    src={listIcon}
                                    alt={"icon"}
                                    style={editingRow.id !== record.id ? {display: "block"} : {display: "none"}}
                                    className={rowIndexForButton === index ? "addStrIcon" : "addStrIcon opacity"}
                                    onClick={handleAddRow("addListWithTopLevelParent", record, Rows, setIsEditing, setEditingRow)}
                                />
                            </>
                        }
                    </div>
                )
            }
        },
        {
            title: 'Наименование работ',
            dataIndex: 'title',
            key: 'title',
            width: 757,
            render: (value, record, index) => {
                return (
                    editingRow.id === record.id ?
                        <Input required id={"Title"} value={editingRow.title} onChange={handleInputChange('title')}
                               onKeyPress={handleEnterPress}/>
                        :
                        value
                )
            }
        },
        {
            title: 'Ед. изм.',
            dataIndex: 'unit',
            key: 'unit',
            width: 200,
            render: (value, record, index) => {
                if (editingRow.id === record.id && record.type !== "level") {
                    return (
                        <Input required value={editingRow.unit} onChange={handleInputChange('unit')}
                               onKeyPress={handleEnterPress}/>
                    )
                }
                return (
                    record.type === "row" ? value : <></>
                )
            }
        },
        {
            title: 'Количество',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 200,
            render: (value, record, index) => {
                if (editingRow.id === record.id && record.type !== "level") {
                    return (
                        <Input required value={editingRow.quantity} onChange={handleInputChange('quantity')}
                               onKeyPress={handleEnterPress}/>
                    )
                }
                return (
                    record.type === "row" ? value : <></>
                )
            }
        },
        {
            title: 'Цена за ед.',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            width: 200,
            render: (value, record, index) => {
                if (editingRow.id === record.id && record.type !== "level") {
                    return (
                        <Input required value={editingRow.unitPrice} onChange={handleInputChange('unitPrice')}
                               onKeyPress={handleEnterPress}/>
                    )
                }
                return (
                    record.type === "row" ? value : <></>
                )
            }
        },
        {
            title: 'Стоимость',
            dataIndex: 'price',
            key: 'price',
            width: 200,
            render: (text) => {
                return <div>{text.toLocaleString()}</div>
            }
        },
    ];


    return (
        <div className={"treeContainer"}>
            <Table
                columns={columns}
                dataSource={Rows}
                pagination={false}
                rowKey={"id"}
                rowClassName={"rowStyles"}
                className={"tableStyles"}
                onRow={(record, rowIndex) => {
                    return {
                        onMouseEnter: event => {
                            setRowIndexForButton(rowIndex!)
                        },
                        onMouseLeave: event => {
                            setRowIndexForButton(-1)
                        },
                        onDoubleClick: event => {
                            setIsEditing(true)
                            setEditingRow(record)
                        },
                    };
                }}
            />
        </div>
    );
});

export default ItemsTree;