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

  let editID = {};
  const editItem = function(listItemID) {

    for(let i = 0; i < items.length; i++) {
      if(parseInt(listItemID[5]) === parseInt(items[i].id)) {
        editID = items[i];
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
    }
  }
 

})();



// UI Controller

const UIController = (() => {

  const UISelectors = {
    backBtn: '#back-btn',
    updateMeal: '.update-meal',
    addBtn: '#add-btn',
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

  const updateItem = function(update) {
    if(update) {
      let addBtn = document.querySelector(UISelectors.addBtn).style.display = 'none';
      const updateUI = `
      <button class="update-btn btn orange"><i class="fa fa-pencil-square-o"></i> Update Meal</button>
      <button class="delete-btn btn red"><i class="fa fa-remove"></i> Delete Meal</button>`;
      let updateMeal = document.querySelector(UISelectors.updateMeal).innerHTML = updateUI;
      updateMeal = document.querySelector(UISelectors.updateMeal).style.display = 'block';
    } else {
      addBtn = document.querySelector(UISelectors.addBtn).style.display = 'block';
      updateMeal = document.querySelector(UISelectors.updateMeal).style.display = 'none';
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
    ul.addEventListener('click', (e) => {
      if(e.target.id === loadUISelectors.editIcon) {
        const editID = itemController.editItem(e.target.parentNode.parentNode.id);
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
  }

  const loadUISelectors = UIController.UISelectors;
  
  const addBtn = document.querySelector('.add-btn');

  // Selects the ul and uses event.target to find the edit icon
  const ul = document.querySelector('.collection');

  loadEventListeners();
})(itemController, UIController);