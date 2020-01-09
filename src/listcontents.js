import {projectContainer} from './list.js';


const listcontent = (() => {
    const maincontainer = document.createElement("div");
    let itemcontainer = document.createElement("div");
    let selectedlist = null;

    const create = () => {
        displayNewButton();
        maincontainer.id = "contentsmain";
        maincontainer.style.display = "none";
        itemcontainer.id = "itemcontainer";
        maincontainer.appendChild(itemcontainer);
        return maincontainer;
    };

    const displayNewButton = () => {
        const buttoncontainer = document.createElement("div");
        const button = document.createElement("button");
        buttoncontainer.className = "topcontentcontainer";
        button.textContent = "+ Add item";
        button.className = "addbutton";
        button.addEventListener('click', displayNewItem);
        buttoncontainer.appendChild(button);
        maincontainer.insertAdjacentElement('afterbegin', buttoncontainer);
    };

    const displayNewItem = () => {
        maincontainer.removeChild(maincontainer.firstChild);
    
        const inputcontainer = document.createElement("div");
        const bundleinner = document.createElement("div");
        const bundleouter = document.createElement("div");
        const cancleButton = document.createElement("button");
        const doneButton = document.createElement("button");
        const nameField = document.createElement("input");
        const descField = document.createElement("input");
        const dateField = document.createElement("input");
    
        inputcontainer.id = "inputcontainer";
        inputcontainer.className = "topcontentcontainer";
    
        nameField.type = "text";
        nameField.className = "textinput";
        nameField.placeholder = "Put title here..."
        nameField.maxLength = "15";

        descField.type = "text";
        descField.className = "itemdescinput";
        descField.placeholder = "Put description here..."
        descField.maxLength = "30";

        dateField.type = "date";
        dateField.className = "datefield";
    
        cancleButton.textContent = '\u2190';
        cancleButton.className = "cancelbutton";
        cancleButton.addEventListener('click', function() {
            maincontainer.removeChild(maincontainer.firstChild);
            displayNewButton();
        });
    
        doneButton.textContent = "Done";
        doneButton.className = "donebutton";
        doneButton.addEventListener('click', function() {
            if (selectedlist) {
                if(nameField.value === "" || descField.value === "" || dateField.value == ""){
                    alert("Check user input!");
                }
                else {
                    projectContainer.getList(selectedlist).addItem(nameField.value, descField.value, dateField.value);
                    updateSelected(selectedlist);
                    maincontainer.removeChild(maincontainer.firstChild);
                    displayNewButton();
                }
            }
            else {
                alert("Select a list before adding items");
            }
        });

        
        bundleinner.style.display = "flex";
        bundleinner.appendChild(nameField);
        bundleinner.appendChild(dateField);

        bundleouter.appendChild(bundleinner);
        bundleouter.appendChild(descField);
        
        inputcontainer.appendChild(cancleButton);
        inputcontainer.appendChild(bundleouter);
        inputcontainer.appendChild(doneButton);

        maincontainer.insertAdjacentElement('afterbegin',inputcontainer);
    };

    const updateSelected = (index) => {
        clearItemContainer();
        maincontainer.style.display = "block";
        if (projectContainer.getList(index))
        {
            selectedlist = index;
            for(let i = 0 ; i < projectContainer.getList(index).getAmountOfItems(); i++){
                itemcontainer.appendChild(displayItemEntry(i, projectContainer.getList(index).getItem(i).getTitle(),
                projectContainer.getList(index).getItem(i).getDesc(),
                projectContainer.getList(index).getItem(i).getDueDate()
                ));
            } 
        }
        else {
            selectedlist = null;
        }
    }

    const displayItemEdit = (title, desc, date) => {
        const container = document.createElement("div");
        const bundleinner = document.createElement("div");
        const bundleouter = document.createElement("div");
        const bundleouterouter = document.createElement("div");
        const editName = document.createElement("input");
        const editDesc = document.createElement("input");
        const editDate = document.createElement("input");
        const doneButton = document.createElement("button");
        const removeButton = document.createElement("button");

        container.className = "entrycontent";

        editName.type = "text";
        editName.value = title; 
        editName.className = "textinput";
        editName.maxLength = "15";

        editDesc.type = "text";
        editDesc.value = desc; 
        editDesc.className = "itemdescinput";
        editDesc.maxLength = "30";

        editDate.type = "date";
        editDate.value = date;
        editDate.className = "datefield";

        doneButton.textContent = "Done";
        doneButton.className = "donebutton"
        doneButton.addEventListener('click', function() {
            if(editName.value === "" || editDesc.value === "" || editDate.value == ""){
                alert("Check user input!");
            }
            else {
                projectContainer.getList(selectedlist).getItem(container.parentNode.getAttribute('data-key')).setTitle(editName.value);
                projectContainer.getList(selectedlist).getItem(container.parentNode.getAttribute('data-key')).setDesc(editDesc.value);
                projectContainer.getList(selectedlist).getItem(container.parentNode.getAttribute('data-key')).setDueDate(editDate.value);
                updateSelected(selectedlist);
            }
        }); 

        removeButton.textContent = "x";
        removeButton.className = "removebutton"
        removeButton.addEventListener('click',function() {
            projectContainer.getList(selectedlist).removeItem(container.parentNode.getAttribute('data-key'));
            updateSelected(selectedlist);
        });
        
        bundleinner.appendChild(editName);
        bundleinner.appendChild(editDate);

        bundleouter.appendChild(bundleinner);
        bundleouter.appendChild(editDesc);
        
        bundleouterouter.appendChild(bundleouter);
        bundleouterouter.appendChild(removeButton);
        bundleouterouter.style.display = "flex";

        container.appendChild(bundleouterouter);
        container.appendChild(doneButton);
          
        return container;
    }

    const displayItemEntry = (key, title, desc, date) => {
        const entry = document.createElement("div");
        const bundleinner = document.createElement("div");
        const bundleouter = document.createElement("div");
        const content = document.createElement("div");
        const name = document.createElement("div");
        const description = document.createElement("div");
        const datetime = document.createElement("div");
        const editButton = document.createElement("button")

        entry.setAttribute('data-key', key);

        content.className = "entrycontent";

        name.textContent = title;
        name.className = "listname";

        description.textContent = desc;
        description.className = "listname";
        description.style.fontSize = "20px";

        datetime.textContent = date;
        datetime.className = "listname";

        editButton.textContent = "Edit"
        editButton.className = "editbutton"
        editButton.addEventListener('click', function() {     
            entry.replaceChild(displayItemEdit(title, desc, date), content);
        });
        
        entry.className = "itementrycontainer";

        bundleinner.appendChild(name);
        bundleinner.appendChild(datetime);
        bundleinner.style.display = "flex";
        bundleinner.style.justifyContent = "space-between"

        bundleouter.appendChild(bundleinner);
        bundleouter.appendChild(description);
        bundleouter.style.width = "inherit"; 

        content.appendChild(bundleouter);
        content.appendChild(editButton);

        entry.appendChild(content);

        return entry;
    };

    const clearItemContainer = () => {
        maincontainer.removeChild(itemcontainer);
        itemcontainer = document.createElement("div");
        itemcontainer.className = "itemcontainer";
        maincontainer.appendChild(itemcontainer);
    };

    return {create, updateSelected};
})();

export {listcontent};