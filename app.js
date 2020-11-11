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
      console.log(items.length);
      console.log(items);
    },
    dataStructure: function() {
      return items
    }
  }

})();



// UI Controller

const UIController = (() => {

  const UISelectors = {
    itemName: '#item-name',
    itemCalories: '#item-calories',
    itemList: '#item-list'
  }

  const displayItems = (item, calories) => {

    // Create the list item

    const li = `
      <li class="collection-item" id="item-0">
        <strong>${item}: </strong> <em>${calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
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
    displayItems: function(item, calories) {
      displayItems(item, calories);
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
        UIController.displayItems(createdItem.name, createdItem.calories);
        // Add the item calories Total
        UIController.getTotal(createdItem.calories);
      } else {
        console.log('Please Enter Values Correctly..');
      }

      e.preventDefault();
    });

  }

  const loadUISelectors = UIController.UISelectors;
  
  const addBtn = document.querySelector('.add-btn');
  

  loadEventListeners();
})(itemController, UIController);