import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Subject} from 'rxjs';

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}
@Injectable()
export class ChecklistDatabase {
  TREE_DATA = {
  };
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
  }

  setData(treeData) {
    this.TREE_DATA = treeData;
    const data = this.buildFileTree(this.TREE_DATA, 0);
    this.dataChange.next(data);
  }
  buildFileTree(obj: object, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }

  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-tree-checklist',
  templateUrl: './tree-checklist.component.html',
  styleUrls: ['./tree-checklist.component.scss'],
  providers: [ChecklistDatabase]
})
export class TreeChecklistComponent implements OnInit{
  @Input() data: any;
  searchQuery: string = '';
  selectedData = [];
  //
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  selectedParent: TodoItemFlatNode | null = null;

  newItemName = '';
  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
  ngOnInit() {
    this.database.setData(this.data);
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }
  constructor(private database: ChecklistDatabase) {
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    if (this.checklistSelection.isSelected(node)) {
      this.checklistSelection.select(...descendants);
      descendants.forEach(descendant => {
        // console.log(descendant.item);
        this.selectedData.push(descendant.item);
      });
    }
    else {
      this.checklistSelection.deselect(...descendants);
      descendants.forEach(descendant => {
        this.selectedData.splice(this.selectedData.indexOf(descendant.item) , 1);
      });
    }
  }

  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem( nestedNode!, itemValue);
  }
  selectNode(node) {
    this.checklistSelection.toggle(node);
    if (this.checklistSelection.isSelected(node))
      this.selectedData.push(node.item);
    else this.selectedData.splice(this.selectedData.indexOf(node.item) , 1);
  }
  getSelectedData() {
    return this.selectedData;
  }
  hideNode(node) {
    if(this.searchQuery == '')
      return false;
    if (node.item.indexOf(this.searchQuery) > -1)
      return false;
    return true;
  }
  filterChanged(filter: string): void {
    this.searchQuery = filter;
    if (this.searchQuery === '')
      this.treeControl.collapseAll();
    else
      this.treeControl.expandAll();
  }
  toggleAllNodes(): void {
    console.log('ssdad  ');
    this.nestedNodeMap.forEach(node => {
      this.selectNode(node);
    });
    console.log(this.selectedData);
  }
}
