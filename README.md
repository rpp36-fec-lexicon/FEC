# FEC
Project Atelier (Front-End Capstone)

## Group: Lexicon

### Description
Front End Capstone (FEC) project requested by HackReactor, developed and designed by team Lexicon, utilizing primarily React and Express, and deployed with the help of Amazon Web Services (AWS). A new sleek retail portal created to be easily adaptable, changed, or adjusted, by any interested companies to update their own out-dated e-commerce websites.

## Table of Contents
1. [Product Overview](#product-overview)
2. [Related Products](#related-products)
3. [Questions and Answers](#questions-and-answers)
4. [Ratings and Reviews](#ratings-and-reviews)

### Product Overview

> The product overview is the main hub of the page and the first thing that loads and catches the consumer's eyes. Like any shopping site, the use will be able to sift through different products, showcasing the description, price, images, and interactable features.

<details>
  
  * When a product has multiple styles, there will be rows (up to 4) of the styles and their thumbnail icon. a checkmark will be overlayed on the current selected style being shown on the main image.
 * The quantity selector will be disabled until a size is chosen for the current selected style, allowing you to choose how much to add to car (if purchasing).
 * Stars update upon swapping products, with an available hyperlink taking you down to the review sections.
 * Selected style will have the associated images as thumbnails overlaid on the left of the current main, enlarged image. There are arrows to navigate the images, as well as selecting to skip ahead, and a highlighted border for what image it currently being shown.
 * Upon clicking the main image, it will bring up a larger version of the image with the thumbnail and arrow functionalities with it. Clicking the image again acts as zooming in or out depending on the current state of the layout, tracking the users mouse movement as well while zoomed in.
  
</details>

![ezgif com-gif-maker](https://user-images.githubusercontent.com/81248975/182035200-8780bdd4-bbe0-4668-a536-cccba8a5e3b6.gif)

  
### Related Products

> The related products section has awesome features that allow the user to navigate a list of items that are related to the main product being viewed, with options to see feature comparison and also have the ability to add to an outfit list 

<details>
 
 * A star button found on the top right of a related card display helps the user make direct comparison between two products.
 * When a product is related to many items which won't fit on the user's viewport, the user will have access to carousel that can be navigated using arrow buttons (which remain invisible if all related items fit on users' screen display).
 * A persistent outfit carousel presents the user with an option of adding/removing products which may be bought together  
  
</details>

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/81248975/182035560-6bd42bf3-ae35-436e-bb7f-33b6b8f96e0a.gif)

### Questions and Answers

> The Questions & Answers part allows a user to search for a question, to add answers and questions about the product selected. This part consists of four subparts and each subpart has its own unique functionality.
 * View questions
 * Search for a question
 * Asking a question
 * Answering a question

![qna](https://user-images.githubusercontent.com/97697504/181936240-6ab7479c-2439-4ecf-a93a-8dfaff5fbf80.gif)

<details>
  
 * Questions and Answers subcomponent shows list of questions that have been asked about the given product.
 * The list of questions and answers can be expanded and collapsed per user's choice. By default, two questions are displayed. The questions are sorted based on their helpfulness rating and user can load more questions by clicking "More Questions" button.
 * The list will instantly be changed to search result list based on a key word that user types in search bar. The search result list is generated after third keystoke.
  
</details>

### Ratings and Reviews

The ratings and reviews section gives the users an overview of how the product is liked by customers. The section is divided into three parts:
 * Ratings: allows users to have a statistics of how the product is generally rated by previous buyers. This section is filterable by the star rating to only show reviews of those specific star types.
 * Reviews: highly detailed review items which include personal opinions, review date, helpfulness votes, recommendation, etc. Users can sort the list by order of relevance, helpfulness, and newest. Users can also submit a review on the product.
 * Product characteristics: this section displays how the produc performs in terms of quality, comfort, fit, etc. 

![ReviewsGif](https://user-images.githubusercontent.com/88561551/181996410-a04512b7-0af2-490a-9d50-8ac84f8e6409.gif)


## Installation

1. Fork and/or clone the project.
2. Install dependencies required to run the project:
```
npm install
```
3. Initialize Webpack (with Bundle):
```
npm run webpack
```
4. Launch the local server:
```
npm start
```
## Contributors
* [Ai Lam](https://github.com/ai-lam) - Ratings and Reviews
* [Filimon Kiros](https://github.com/FilimonK-Git) - Related Products
* [Jason Novacovici](https://github.com/JNovacovici) - Main Overview
* [Miras Adilov](https://github.com/AdilovM) - Questions and Answers
## Tech Stack

* [React](https://reactjs.org/)
* [Node](https://nodejs.org/en/)
* [Amazon AWS](https://aws.amazon.com/)
* [Babel](https://babeljs.io/)
* [Webpack](https://webpack.js.org/)
* [JEST](https://jestjs.io/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/setup)
* [Express](http://expressjs.com/)
* [Underscore](https://underscorejs.org/)
