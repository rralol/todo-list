const projectContainer = (() => {
    const lists = [];

    const addList = (list) => {lists.push(listFactory(list));};
    const removeList = (index) => {lists.splice(index, 1);};

    return {lists, addList, removeList};
})();

const listFactory = (name) => {
    let title = name;
    const items = [];
    
    const getName = () => {return title};
    const setName = (name) => {title = name};
    const addItem = (item) => {items.push(item)};
    const removeItem = (index) => {items.splice(index, 1)};

    return {getName, setName, addItem, removeItem};
};

const itemFactory = (title, desc, dueDate, prio) => {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.prio = prio;

    const getTitle = () => {return this.title};
    const setTitle = (title) => {this.title = title};
    const getDesc = () => {return this.desc};
    const setDesc = (desc) => {this.desc = desc};
    const getDueDate = () => {return this.dueDate};
    const setDueDate = (dueDate) => {this.dueDate = dueDate};
    const getPrio = () => {return this.prio};
    const setPrio = (prio) => {this.prio = prio};

    return {getTitle, setTitle, getDesc, setDesc, getDueDate, setDueDate, getPrio, setPrio}
};

export{projectContainer, listFactory, itemFactory}