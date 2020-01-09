const projectContainer = (() => {
    let lists = [];

    const addList = (list) => {
        lists.push(listFactory(list));
        saveToLocalStorage();
    };
    const removeList = (index) => {
        lists.splice(index, 1);
        saveToLocalStorage();
    };

    const getList = (index) => {return lists[index]};
    const getAmountOfLists = () => {return lists.length};
    const saveToLocalStorage = () => {
        localStorage.clear();
        localStorage.setItem('storedMasterList', JSON.stringify(projectContainer));
    };
    const loadFromLocalStorage = () => {
        try {
            const tempStorage = JSON.parse(localStorage.getItem('storedMasterList'));
            tempStorage.lists.forEach((list, mainIndex) => {
                projectContainer.addList(list.title);
                list.items.forEach((item) => {
                    projectContainer.lists[mainIndex].addItem(item.title, item.description, item.dueDate);
                });
            });
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
    };

    return {addList, removeList, getAmountOfLists, getList, loadFromLocalStorage, saveToLocalStorage, lists};
})();

const listFactory = (name) => {
    let title = name;
    const items = [];
    
    const getName = () => {return title};
    const setName = (name) => {
        title = name;
        projectContainer.saveToLocalStorage();
    };
    const addItem = (title, desc, dueDate) => {
        items.push(itemFactory(title,desc,dueDate));
        projectContainer.saveToLocalStorage();
    };
    const removeItem = (index) => {
        items.splice(index, 1);
        projectContainer.saveToLocalStorage();
    };
    const getItem = (index) => {return items[index]};
    const getAmountOfItems = () => {return items.length};

    return {getName, setName, addItem, removeItem, getItem, getAmountOfItems, items, title};
};

const itemFactory = (name, desc, date) => {
    let title = name;
    let description = desc;
    let dueDate = date;

    const getTitle = () => {return title};
    const setTitle = (name) => {
        title = name;
        projectContainer.saveToLocalStorage();
    };
    const getDesc = () => {return description};
    const setDesc = (desc) => {
        description = desc;
        projectContainer.saveToLocalStorage();
    };
    const getDueDate = () => {return dueDate};
    const setDueDate = (date) => {
        dueDate = date;
        projectContainer.saveToLocalStorage();
    };

    return {getTitle, setTitle, getDesc, setDesc, getDueDate, setDueDate, title, description, dueDate}
};

export{projectContainer, listFactory, itemFactory}