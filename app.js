// Storage Controller

const storageController = (() => {

})();

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
    // {id: 0, name: 'meal 1', calories: 100},
    // {id: 1, name: 'meal 2', calories: 200},
    // {id: 2, name: 'meal 3', calories: 300}
  ];

  let editID = {};
  const editItem = function(listItemID) {

    for(let i = 0; i < items.length; i++) {
      if(parseInt(listItemID[5]) === parseInt(items[i].id)) {
        editID = items[i];
      }
    }
  }

  // Update the item data

  const updateItem = function(id, dataName, dataCalories) {
    for(let i = 0; i < items.length; i++) {
      if(items[i].id === id) {
        items[i].name = dataName;
        items[i].calories = dataCalories;
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
      return editID
    },
    updateItem: function(id, dataName, dataCalories) {
      updateItem(id, dataName, parseInt(dataCalories));
      console.log(items)
    }
  }
 

})();



// UI Controller

const UIController = (() => {

  const UISelectors = {
    clearAllBtn: '#clear-all',
    deleteBtn: '#delete-btn',
    updateBtn: '#update-btn',
    backBtn: '#back-btn',
    updateMeal: '.update-meal',
    addBtn: '#add-btn',
    itemName: '#item-name',
    itemCalories: '#item-calories',
    itemList: '#item-list',
    editIcon: 'edit-icon',
    inputFields: '#input-fields'
  }

  const clearAll = () => {
    document.querySelector(UISelectors.itemName).value = '';
    document.querySelector(UISelectors.itemCalories).value = '';
    document.querySelector(UISelectors.itemList).innerHTML = '';
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

  const updateItem = function(update) {
    if(update) {
      let addBtn = document.querySelector(UISelectors.addBtn).style.display = 'none';
      const updateUI = `
      <button id="update-btn" class="update-btn btn orange"><i class="fa fa-pencil-square-o"></i> Update Meal</button>
      <button id="delete-btn" class="delete-btn btn red"><i class="fa fa-remove"></i> Delete Meal</button>`;
      let updateMeal = document.querySelector(UISelectors.updateMeal).innerHTML = updateUI;
      updateMeal = document.querySelector(UISelectors.updateMeal).style.display = 'block';
    } else {
      addBtn = document.querySelector(UISelectors.addBtn).style.display = 'block';
      updateMeal = document.querySelector(UISelectors.updateMeal).style.display = 'none';
      document.querySelector(UISelectors.itemName).value = '';
      document.querySelector(UISelectors.itemCalories).value = '';
    }
    
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
    },
    update: function(update, back) {
      updateItem(update, back);
    },
    clearAll: function() {
      clearAll();
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
        document.querySelector(loadUISelectors.itemName).value = '';
        document.querySelector(loadUISelectors.itemCalories).value = '';
      } else {
        console.log('Please Enter Values Correctly..');
      }

      e.preventDefault();
    });

    // Edit icon click event
    let editID;
    ul.addEventListener('click', (e) => {
      if(e.target.id === loadUISelectors.editIcon) {
        editID = itemController.editItem(e.target.parentNode.parentNode.id);
        document.querySelector(loadUISelectors.itemName).value = editID.name;
        document.querySelector(loadUISelectors.itemCalories).value = editID.calories;
        UIController.update(true);
      }
    })

    // Back button event listener

    const backBtn = document.querySelector(loadUISelectors.backBtn);
    
    backBtn.addEventListener('click', () => {
      UIController.update(false);
    })

    // Clear all button

    clearAllBtn.addEventListener('click', () => {
      UIController.clearAll();
    })

    // Added event listener to parent element for the update button
    inputFields.addEventListener('click', (e) => {
      if(`#${e.target.id}` === loadUISelectors.updateBtn) {
        console.log(editID.id);
        itemController.updateItem(editID.id, document.querySelector(loadUISelectors.itemName).value, document.querySelector(loadUISelectors.itemCalories).value);
      }
    })
  }

  
  const loadUISelectors = UIController.UISelectors;
  const clearAllBtn = document.querySelector(loadUISelectors.clearAllBtn);
  const addBtn = document.querySelector('.add-btn');
  const inputFields = document.querySelector(loadUISelectors.inputFields);

  // Selects the ul and uses event.target to find the edit icon
  const ul = document.querySelector('.collection');
  loadEventListeners();
  
})(itemController, UIController);