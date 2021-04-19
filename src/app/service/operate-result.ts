export interface OperateResult {
    info: string;
    code: any;
    rtn: any;
}
export interface ResultCode {
    resultState: string;
    resultCode: number;
}
export interface SelectResult {
    columnTemplate: string[];
    rowTemplate: [];
}
export interface treeNode {
    name: string;
    childs: treeNode[];
}
export interface FakeNode {
    name: string;
    children: FakeNode[];
}
export interface UpdateTableInfo {
    name: string;
    columns: ColumnInfoDto[];
}
export interface ColumnInfo {
    name: string;
    type: string;
    parameter: string;
    parameterDisable: boolean;
    notNull: boolean;
    unique: boolean;
    primaryKey: boolean;
    index: number
}
export interface ColumnInfoDto {
    columnName: string;
    columnType: string;
    columnArgument: number;
    notNull: boolean;
    unique: boolean;
    primaryKey: boolean;
    index: number
}