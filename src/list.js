const projectContainer = (() => {
    const lists = [];

    const addList = (list) => {lists.push(listFactory(list));};
    const removeList = (index) => {lists.splice(index, 1);};
    const getList = (index) => {return lists[index]};
    const getAmountOfLists = () => {return lists.length};

    return {addList, removeList, getAmountOfLists, getList};
})();

const listFactory = (name) => {
    let title = name;
    const items = [];
    
    const getName = () => {return title};
    const setName = (name) => {title = name};
    const addItem = (title, desc, dueDate) => {items.push(itemFactory(title,desc,dueDate))};
    const removeItem = (index) => {items.splice(index, 1)};
    const getItem = (index) => {return items[index]};
    const getAmountOfItems = () => {return items.length};

    return {getName, setName, addItem, removeItem, getItem, getAmountOfItems};
};

const itemFactory = (name, desc, date) => {
    let title = name;
    let description = desc;
    let dueDate = date;

    const getTitle = () => {return title};
    const setTitle = (name) => {title = name};
    const getDesc = () => {return description};
    const setDesc = (desc) => {description = desc};
    const getDueDate = () => {return dueDate};
    const setDueDate = (date) => {dueDate = date};

    return {getTitle, setTitle, getDesc, setDesc, getDueDate, setDueDate}
};

export{projectContainer, listFactory, itemFactory}