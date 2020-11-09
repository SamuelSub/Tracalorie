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

  const items = [];

  return {
    // Creates the item with the given parameters from app controller
    item: function(id, name, calories) {
      let newItem = new Item(id, name, calories);
      return newItem
    },
    // Pushes item to data structure
    items: function(item) {
      items.push(item);
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

  return {
    UISelectors: UISelectors,
    displayItems: function(item, calories) {
      displayItems(item, calories);
    }
  }
  
})();



// App Controller

const App = ((itemController, UIController) => {

  // Event Listeners

  function loadEventListeners() {

    addBtn.addEventListener('click', () => {
      // Grab item and calorie values
      const item = document.querySelector(loadUISelectors.itemName).value;
      const calories = document.querySelector(loadUISelectors.itemCalories).value;
      // Check for user input
      if(item !== '' && calories !== '') {
        // Create the item object from the above values
        const createdItem = itemController.item(0, item,calories);
        itemController.items(createdItem);
        // Display the created item in the UI
        UIController.displayItems(createdItem.name, createdItem.calories);
      } else {
        console.log('Please Enter Values..');
      }
      
    });

  }

  const loadUISelectors = UIController.UISelectors;
  
  const addBtn = document.querySelector('.add-btn');
  

  loadEventListeners();
})(itemController, UIController);