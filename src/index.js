import {listcontainer} from './listcontainer';
import {listcontent} from './listcontents'


const content = document.getElementById("content");
content.appendChild(listcontainer.create());
content.appendChild(listcontent.create());