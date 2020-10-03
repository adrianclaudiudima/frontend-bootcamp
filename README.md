Homework Frontend Bootcamp

# Requirements:

Create a wishlist component which will contain a list of products (similar to product list component).

Display the component as an overlay component without animation (similar to favorite list component).
Products can be added from :

- List of products component via card item (similar to the favorite button)
- List of favorite products - the product will be removed from favorite and moved to wishlist component.

A product cannot be part to the favorite list and the Wishlist list in the same time.

The wishlist functionality should be developed simillar to favorite list, by having a state (subject) which holds the products.

# Solution:

Create the Wishlist Products Details component with the MoveToFavorite method to move a product to the Favorite list.

Create the Wishlist Overlay service which will load the Wishlist Products Details component as an overlay component without animation.

Modify the Header component with a button which will trigger the Wishlist Overlay service.

Modify the Product Item component with the addProductToWishlist method. This method will verify firstly if the product is already in the Favorite list. Modify also the addProductToFavorite method to verify firstly if the product is already in the Wishlist list. Those checks are possible because the Product List component is modified to pass the Favorite list products and Wishlist products with input binding to the Product Item component.

Modify the Product Favorite Details component with the moveToWishlist method.

Create the Wishlist service to keep Wishlist products in a BehaviorSubject .

Homework Frontend Bootcamp (bonus)

# Requirements:

Store those products added to wishlist in db.json via API calls.
When the application is loaded, get the date from db and populate the ui state
Implement error handling in case server is down with the functionality of retry.
Think of a solution on how you can move products from favorite to wishlist and vice-versa .
Have the wishlist component displayed in a global overlay similar to cart overlay.

# Solution:

Modify the Wishlist service to load, add and delete the Wishlist products from the db.json via API calls.

Create the WishlistState service which will keep Wishlist products in a BehaviorSubject and will use the Wishlist service load, add and delete the Wishlist products from the db.json.
The components (Product List component, Wishlist Products Details component) which need the Wishlist products list will get it from the WishlistState service.

Modify the method from the Product List component which will do the retry request to load also the Wishlist products from the db.json.

Modify the Wishlist Products Details component and the Product Favorite Details component with the functionality of retry request to load the Wishlist products from the db.json.

Create the Wishlist Animation Details component with the same methods as the Wishlist Products Details component.

Create the Wishlist Overlay Animation service which will load the Wishlist Animation Details component as an overlay component with animation.

Modify the Header component with a button which will trigger the Wishlist Overlay Animation service.

# Shop Application

The scope of this project is to go through the basics of Angular. Its scope is to go through the main chapters of angular (components, directives, pipes, routing, modules, services, guards, etc) via examples.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Backend mock server

Run `json-server --watch db.json` in order to have a mock rest API.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
