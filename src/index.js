import {listcontainer} from './listcontainer';
import {listcontent} from './listcontents';

const header = document.createElement("h1");
header.textContent = "To-Do-List";

const title = document.createElement("title");
title.textContent = "To-Do-List";

document.head.appendChild(title);
document.body.insertAdjacentElement('afterbegin', header);

const content = document.getElementById("content");
content.appendChild(listcontainer.create());
content.appendChild(listcontent.create());