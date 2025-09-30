/*
  Name: Jay Park
  Date: September 25, 2025
  CSC 372-01
  This is the script.js file for assignment 4.
*/

let favorites = [];

setupPage();

function setupPage() {
    addPrices();
    addButtons();
    makeFavoritesSection();
}

function addPrices() {
    let cards = document.querySelectorAll('.dish-card');
    
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let name = card.querySelector('h3').textContent;
        let price = getPrice(name);
        
        let priceTag = document.createElement('p');
        priceTag.textContent = 'Price: $' + price;
        card.querySelector('h3').after(priceTag);
    }
}

function getPrice(dishName) {
    let prices = {
        "Bone-In Wings": 13.99,
        "The Big \"Dill\" Burger": 12.69,
        "ECW+G Buffalo Chicken Salad": 12.49,
        "Baked Ziti Pizza": 15.99,
        "Chicken Philly Sub": 14.99,
        "Spaghetti With Meatballs": 17.99,
        "Veggie Ramen Soy Broth": 11.99,
        "Red Spicy Ramen": 13.99,
        "Miso Ramen": 12.99
    };
    return prices[dishName];
}

function addButtons() {
    let cards = document.querySelectorAll('.dish-card');
    
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let name = card.querySelector('h3').textContent;
        let price = getPrice(name);
        
        let btn = document.createElement('button');
        btn.className = 'favorite-btn';
        btn.textContent = 'Add to Favorites';
        
        btn.addEventListener('click', function() {
            if (btn.textContent === 'Add to Favorites') {
                card.classList.add('favorite');
                btn.textContent = 'Remove from Favorites';
                favorites.push({name: name, price: price});
            } else {
                card.classList.remove('favorite');
                btn.textContent = 'Add to Favorites';
                for (let j = 0; j < favorites.length; j++) {
                    if (favorites[j].name === name) {
                        favorites.splice(j, 1);
                        break;
                    }
                }
            }
            updateFavorites();
        });
        
        card.appendChild(btn);
    }
}

function makeFavoritesSection() {
    let section = document.createElement('section');
    section.id = 'favorites-section';
    
    let title = document.createElement('h2');
    title.textContent = 'My Favorite Dishes';
    
    let list = document.createElement('div');
    list.id = 'favorites-list';
    
    let total = document.createElement('p');
    total.id = 'total-price';
    total.textContent = 'Total: $0.00';
    
    section.appendChild(title);
    section.appendChild(list);
    section.appendChild(total);
    
    document.body.insertBefore(section, document.querySelector('footer'));
}

function updateFavorites() {
    let list = document.getElementById('favorites-list');
    let totalElement = document.getElementById('total-price');

    list.innerHTML = '';
    
    let total = 0;
    
    if (favorites.length === 0) {
        let msg = document.createElement('p');
        msg.textContent = 'No favorites added yet';
        list.appendChild(msg);
    } else {
        for (let i = 0; i < favorites.length; i++) {
            let item = document.createElement('div');
            item.textContent = favorites[i].name + ': $' + favorites[i].price;
            list.appendChild(item);
            total += favorites[i].price;
        }
    }
    
    totalElement.textContent = 'Total: $' + total.toFixed(2);
}