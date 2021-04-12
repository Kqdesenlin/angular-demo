import { Component, Injectable, ChangeDetectionStrategy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { HttpGetService } from '../service/http-get.service';
import { FakeNode } from '../service/operate-result';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

// Interface used for representing a node of data


const MAX_LEVELS = 3;
const MAX_NODES_PER_LEVEL = 5;

// Generates fake data
@Injectable()
export class RandomDataProvider {
  public treeData: FakeNode[] = [];

  constructor() {
    let column1: FakeNode = { "name": "cityName", "children": [] };
    let column2: FakeNode = { "name": "localRate", "children": [] };
    let column11: FakeNode = {
      "name": "column", "children": [column1, column2]
    };
    let index1: FakeNode = { "name": "cityName_index", "children": [] };
    let index11: FakeNode = { "name": "index", "children": [index1] };
    let table1: FakeNode = {
      "name": "city", "children": [column11, index11]
    };
    let column21: FakeNode = { "name": "cityName", "children": [] };
    let column22: FakeNode = { "name": "localRate", "children": [] };
    let column211: FakeNode = {
      "name": "column", "children": [column21, column22]
    };
    let index21: FakeNode = { "name": "cityName_index", "children": [] };
    let index211: FakeNode = { "name": "index", "children": [index21] };
    let table2: FakeNode = {
      "name": "city", "children": [column211, index211]
    };
    this.treeData.push(table1);
    this.treeData.push(table2);
  }
}

// Function for generating a fake data node
function generateNode(level: number, index: number): FakeNode {
  let children: FakeNode[] = [];
  if (level < MAX_LEVELS) {
    for (let i = 0; i < Math.round(Math.random() * MAX_NODES_PER_LEVEL); i++) {
      children.push(generateNode(level + 1, i));
    }
  }

  return {
    name: 'level ' + level + ' index ' + index,
    children,
  };
}

// Interface used for representing a node of data within the flat tree component
export interface FakeFlatNode {
  name: string;
  level: number;
  hasChildren: boolean;
}


@Component({
  selector: 'app-side-tree',
  templateUrl: './side-tree.component.html',
  styleUrls: ['./side-tree.component.css'],
  providers: [RandomDataProvider, HttpGetService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideTreeComponent implements OnInit, OnChanges {

  // providedData: FakeNode[] = this.dataProvider.treeData;

  @Input() providedData: FakeNode[] = [];

  readonly treeControl: FlatTreeControl<FakeFlatNode> =
    new FlatTreeControl<FakeFlatNode>(getNodeLevel, getIsNodeExpandable);

  readonly dataSource: MatTreeFlatDataSource<FakeNode, FakeFlatNode>;

  constructor(readonly dataProvider: RandomDataProvider, private httpService: HttpGetService) {

    const treeFlattener =
      new MatTreeFlattener<FakeNode, FakeFlatNode>(
        nodeTransformer,
        getNodeLevel,
        getIsNodeExpandable,
        getNodeChildren,
      );
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, treeFlattener);

    this.httpService.getTableData().subscribe((data: FakeNode[]) => {
      console.log(data);
      this.providedData = data;
      console.log(this.providedData);
      this.dataSource.data = this.providedData;
      console.log(this.dataSource.data);
    });

  }



  hasChild(index: number, nodeData: FakeFlatNode) {
    return getIsNodeExpandable(nodeData);
  }



  transColumn() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.providedData;
  }
  ngOnInit() {
    this.httpService.getTableData().subscribe((data: FakeNode[]) => {
      this.providedData = data;
    });
  }



}


function nodeTransformer(node: FakeNode, level: number) {
  return {
    name: node.name,
    level,
    hasChildren: node.children != null,
  };
}


function getNodeLevel({ level }: FakeFlatNode) {
  return level;
}


function getIsNodeExpandable({ hasChildren }: FakeFlatNode) {
  return hasChildren;
}


function getNodeChildren({ children }: FakeNode) {
  return children;
}