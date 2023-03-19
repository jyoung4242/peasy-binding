import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";

let index = 0;

const model = {
  branches: <any>[],
  currentBranch: 0,
  get getGetData() {
    return this.branches;
  },
  get getConditions() {
    const newArray: any = [];
    Object.keys(this.branches[this.currentBranch].conditions).forEach(o => {
      newArray.push({ id: o, entry: this.branches[this.currentBranch].conditions[o] });
    });
    return newArray;
  },
  insertData: (_event: any, model: any) => {
    model.branches.push({
      id: index,
      conditions: {},
    });
  },
  insertCondition: (_event: any, model: any) => {
    const key = window.prompt("insert key");
    if (key) model.branches[model.currentBranch].conditions[key] = false;
  },
  toggleFlag: (event: any, model: any, element: HTMLElement, _attribute: any, object: any) => {
    const key = element.getAttribute("data-key");
    console.log(key);

    console.log(object.$parent.$parent.$model);

    if (object.$parent.$parent.$model.branches[object.$parent.$parent.$model.currentBranch].conditions[<string>key])
      object.$parent.$parent.$model.branches[object.$parent.$parent.$model.currentBranch].conditions[<string>key] = false;
    else object.$parent.$parent.$model.branches[object.$parent.$parent.$model.currentBranch].conditions[<string>key] = true;

    console.log(object.$parent.$parent.$model.branches[object.$parent.$parent.$model.currentBranch].conditions[<string>key]);
  },
};

const template = `
<div>
  <a href="#" \${click@=>insertData}>Insert New Data</a>
  <a href="#" \${click@=>insertCondition}>Insert New Condition</a>
  <div \${d<=*getGetData}>
    Conditions:
    <div style="width: 200px; border: 1px solid white; display: flex; justify-content: space-evenly; align-items: flex-start" \${c<=*getConditions:id}>
      <div>\${c.id}</div>
      <span>:</span>
      <div>\${c.entry}</div>
      <a href="#"  \${click@=>toggleFlag} data-key="\${c.id}">Toggle Flag</a>
    </div>  
  
  </div>
</div>`;

UI.create(document.body, template, model);
UI.initialize(1000 / 60);
