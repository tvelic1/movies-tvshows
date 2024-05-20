#  Exploring Movies and TV Shows 

This application is designed for exploring movies and TV shows, you can view images, ratings, trailers, and other data about movies or TV shows; recommended movies or TV shows are marked with green borderline and green shadow, additionaly you have possibility to search movies or TV Shows by name. If search bar is empty or has less than 3 characters you can see TOP 10 rated movies or TV Shows. By clicking on card you will be redirected to Details page, where you can see all details for clicked media. Back button will appear after you hover over Details page. I filtered all movies or shows which have no cover image so you can not find them by search, another solution would be to assign them some default image. Application is fully responsive so it can be used on mobile phone regulary as on PC. For more details checkout the app which is deployed [HERE](https://fascinating-maamoul-717fd5.netlify.app/)</br>
I used ESLint for code check and testing library for tests, additionally I made design, navbar is also fully responsive, so this application is fully usable for mobile phones and computers.</br>
For any questions contact me via [GMAIL](mailto:tvelic1@etf.unsa.ba) or via [LinkedIn](https://www.linkedin.com/in/tarik-veli%C4%87-99b743272/).

## Available Scripts
Make sure that you are in right folder (movies-tvshows), then type "npm install" to install dependencies.
I pushed ".env-example" file, you can get your API key on [MoviesDB](https://developer.themoviedb.org/reference/intro/getting-started). After that you should rename file to ".env", and paste the API key.
Another option is to paste API key directly at ./fetchData/api.ts. 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Possibly that will happen automatically.</br>
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
After you type "npm test" (you have to be in project directory - "movies-tvshows"), probably you will have to type "a" to run all test, but you will see instructions.


