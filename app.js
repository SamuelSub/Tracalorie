// Storage Controller

// Item Controller 

const itemController = (() => {

  // Item constructor

  function Item(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure

  const items = [
    {id: 0, name: 'meal 1', calories: 100},
    {id: 1, name: 'meal 2', calories: 200},
    {id: 2, name: 'meal 3', calories: 300}
  ];

  const editItem = function(listItemID) {

    for(let i = 0; i < items.length; i++) {
      if(parseInt(listItemID[5]) === parseInt(items[i].id)) {
        // console.log(`list id is: ${listItemID} and items is: ${items[i].id}`);
        const editedItem = items[i].id;
      }
    }
  }

  return {
    // Creates the item with the given parameters from app controller
    item: function(name, calories) {
      let id = items.length;
      let newItem = new Item(id, name, parseInt(calories));
      return newItem
    },
    // Pushes item to data structure
    items: function(item) {
      items.push(item);
    },
    dataStructure: function() {
      return items
    },
    editItem: function(listItemID) {
      editItem(listItemID);
      
    }
  }
 

})();



// UI Controller

const UIController = (() => {

  const UISelectors = {
    itemName: '#item-name',
    itemCalories: '#item-calories',
    itemList: '#item-list',
    editIcon: 'edit-icon'
  }

  const displayItems = (id, item, calories) => {

    // Create the list item

    const li = `
      <li class="collection-item" id="item-${id}">
        <strong>${item}: </strong> <em>${calories} Calories</em>
        <a href="#" class="secondary-content">
          <i id="edit-icon" class="fa fa-pencil"></i>
        </a>
      </li>`;

      // Display the list item in the UI
      const ul = document.querySelector(UISelectors.itemList);
      ul.innerHTML += li;
  }

  let itemCalories = [];

  const totalCalories = () => {
    const caloriesDiv = document.querySelector('.total-calories');
    
    let total = 0;
    for(let i = 0; i < itemCalories.length; i++) {
      total += itemCalories[i];
    }

    caloriesDiv.innerHTML = total;
    
  }

  return {
    UISelectors: UISelectors,
    displayItems: function(id, item, calories) {
      displayItems(id, item, calories);
    },
    getTotal: function(calories) {
      itemCalories.push(calories);
      totalCalories();
    }
  }
  
})();



// App Controller

const App = ((itemController, UIController) => {

  // Event Listeners

  function loadEventListeners() {

    addBtn.addEventListener('click', (e) => {

      // Grab item and calorie values
      const item = document.querySelector(loadUISelectors.itemName).value;
      const calories = parseInt(document.querySelector(loadUISelectors.itemCalories).value);
      // Check for user input
      if(item !== '' && calories !== '' && !isNaN(calories)) {
        // Create the item object from the above values
        const createdItem = itemController.item(item, calories);
        itemController.items(createdItem);
        // Display the created item in the UI
        UIController.displayItems(createdItem.id, createdItem.name, createdItem.calories);
        // Add the item calories Total
        UIController.getTotal(createdItem.calories);
      } else {
        console.log('Please Enter Values Correctly..');
      }

      e.preventDefault();
    });

    ul.addEventListener('click', (e) => {
      if(e.target.id === loadUISelectors.editIcon) {
        itemController.editItem(e.target.parentNode.parentNode.id);
      }
    
    })
    

  }

  const loadUISelectors = UIController.UISelectors;
  
  const addBtn = document.querySelector('.add-btn');

  // Selects the ul and uses event.target to find the edit icon
  const ul = document.querySelector('.collection');

  
  
  

  

  loadEventListeners();
})(itemController, UIController);