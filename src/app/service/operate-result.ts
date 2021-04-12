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
