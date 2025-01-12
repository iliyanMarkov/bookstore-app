### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Description of the structure/architecture of the application:

1. To make the app as fast as possible I used the `antd` component library.
2. At a structural point of view I made folders indicating where each element of the app is.
3. Made the app responsive by using the media queries and antd props.

Things I would have done if I had more time:

1. When a book is added to the cart, its stock quantity should be decreased
   accordingly.
2. Upon submitting the cart, update the stock to reflect the quantities of books in
   the cart, ensuring the stock is reduced based on the final cart submission.
3. If the stock of a book reaches zero or if a user attempts to add more books than
   are available, display an error message indicating that the desired quantity
   exceeds the available stock.
4. Save the user data. Probably would have used Redux.
