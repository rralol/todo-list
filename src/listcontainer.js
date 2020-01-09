import {projectContainer} from './list.js';
import {listcontent} from './listcontents';

const listcontainer = (() => {
    const maincontainer = document.createElement("div");
    let listscontainer = document.createElement("div");
    let lastSelected = null;

    const create = () => {
        displayAddButton();
        maincontainer.id = "listmain";
        listscontainer.id = "listcontainer";
        maincontainer.appendChild(listscontainer);
        if(projectContainer.loadFromLocalStorage()){
            displayListContent();
        }
        return maincontainer;
    };

    const displayAddButton = () => {
        const buttoncontainer = document.createElement("div");
        const button = document.createElement("button");
        buttoncontainer.className = "topcontainer";
        button.textContent = "+ Add list";
        button.className = "addbutton";
        button.addEventListener('click', displayNewList);
        buttoncontainer.appendChild(button);
        maincontainer.insertAdjacentElement('afterbegin', buttoncontainer);
    };

    const displayNewList = () => {
        maincontainer.removeChild(maincontainer.firstChild);

        const inputcontainer = document.createElement("div");
        const bundle = document.createElement("div");
        const cancleButton = document.createElement("button");
        const doneButton = document.createElement("button");
        const nameField = document.createElement("input");

        inputcontainer.id = "inputcontainer";
        inputcontainer.className = "topcontainer";

        nameField.type = "text";
        nameField.className = "textinput";
        nameField.placeholder = "Put title here..."
        nameField.maxLength = "15";

        cancleButton.textContent = '\u2190';
        cancleButton.className = "cancelbutton";
        cancleButton.addEventListener('click', function() {
            maincontainer.removeChild(maincontainer.firstChild);
            displayAddButton();
        });

        doneButton.textContent = "Done";
        doneButton.className = "donebutton";
        doneButton.addEventListener('click', function() {
            if (nameField.value === "") {
                alert("Title is empty.");
            }
            else {
                projectContainer.addList(nameField.value);
                maincontainer.removeChild(maincontainer.firstChild);
                displayAddButton();
                displayListContent();
            }
        });

        bundle.appendChild(cancleButton);
        bundle.appendChild(nameField);
        inputcontainer.appendChild(bundle);
        inputcontainer.appendChild(doneButton);
        maincontainer.insertAdjacentElement('afterbegin',inputcontainer);
    };

    const displayListEdit = (name) => {

        const container = document.createElement("div");
        const bundle = document.createElement("div");
        const editName = document.createElement("input");
        const doneButton = document.createElement("button");
        const removeButton = document.createElement("button");

        container.className = "entrycontent";

        editName.type = "text";
        editName.value = name; 
        editName.className = "textinput";

        doneButton.textContent = "Done";
        doneButton.className = "donebutton"
        doneButton.addEventListener('click', function() {
            lastSelected = container.parentNode.getAttribute('data-id');
            if (editName.value === "") {
                alert("Name is empty");
            }
            else {
                projectContainer.getList(container.parentNode.getAttribute('data-id')).setName(editName.value);
                displayListContent();
            }
        }); 

        removeButton.textContent = "x";
        removeButton.className = "removebutton"
        removeButton.addEventListener('click',function() {
            projectContainer.removeList(container.parentNode.getAttribute('data-id'));
            lastSelected = null;
            displayListContent();
            maincontainer.parentNode.lastChild.style.display = "none";
        });
        
        bundle.appendChild(editName);
        bundle.appendChild(removeButton);
        container.appendChild(bundle);
        container.appendChild(doneButton);
          
        return container;
    };

    const displayListEntry = (key, text) => {
        const entry = document.createElement("div");
        const content = document.createElement("div");
        const name = document.createElement("div");
        const editButton = document.createElement("button")

        content.className = "entrycontent";

        name.textContent = text;
        name.className = "listname";
        name.addEventListener('click', function() {
            const selectedExists = document.querySelector(".selected");
            if (selectedExists) {
                selectedExists.classList.remove("selected");
            }
            listcontent.updateSelected(entry.getAttribute("data-id"));
            lastSelected = entry.getAttribute("data-id");
            entry.classList.add("selected");
        });

        editButton.textContent = "Edit"
        editButton.className = "editbutton"
        editButton.addEventListener('click', function() {     
            entry.replaceChild(displayListEdit(text), content);
        });
        
        entry.setAttribute("data-id", key);
        entry.className = "entrycontainer";

        content.appendChild(name);
        content.appendChild(editButton);
        entry.appendChild(content);
        return entry;
    };

    const displayListContent = () => {
        clearListsContainer();
        for(let i = 0; i < projectContainer.getAmountOfLists(); i++) {
            listscontainer.appendChild(displayListEntry(i, projectContainer.getList(i).getName()));
        }
        
        if (lastSelected) {
            const selected = document.querySelector('[data-id = "'+lastSelected+'"]');
            selected.classList.add("selected");
        }
    };

    const clearListsContainer = () => {
        maincontainer.removeChild(listscontainer);
        listscontainer = document.createElement("div");
        listscontainer.className = "listcontainer";
        maincontainer.appendChild(listscontainer);
    };

    return {create};
})();

export {listcontainer};