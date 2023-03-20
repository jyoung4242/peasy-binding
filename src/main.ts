import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { v4 as uuidv4 } from "uuid";

let index = 0;

const model = {
  branches: <any>[],
  currentBranch: 0,

  insertData: (_event: any, model: any) => {
    model.branches.push({
      id: index,
      conditions: [],
    });
    index++;
  },
  insertCondition: (_event: any, model: any, element: any, attribute: any, object: any) => {
    model.branches[model.currentBranch].conditions.push({
      id: uuidv4(),
      entry: false,
      toggle: (_event: any, model: any) => {
        if (model.c.entry) model.c.entry = false;
        else model.c.entry = true;
      },
    });
    console.log(object);
  },
  switchBranch: (_event: any, model: any, element: HTMLElement) => {
    model.currentBranch = element.getAttribute("data-id");
  },
};

const template = `
<div>
  <a href="#" \${click@=>insertData}>Insert New Data</a>
  <a href="#" \${click@=>insertCondition}>Insert New Condition</a>
  <div \${d<=*branches}>
    <p \${click@=>switchBranch} data-id="\${d.$index}">Branch: \${d.$index}</p>
    Conditions:
    <div style="width: 400px; border: 1px solid white; display: flex; justify-content: space-evenly; align-items: flex-start" \${c<=*d.conditions}>
      <div>\${c.id}</div>
      <span>:</span>
      <div>\${c.entry}</div>
      <a href="#"  \${click@=>c.toggle} data-branch="\${d.$index}" data-key="\${c.id}">Toggle Flag</a>
    </div>  
  
  </div>
</div>`;

UI.create(document.body, template, model);
UI.initialize(1000 / 60);
