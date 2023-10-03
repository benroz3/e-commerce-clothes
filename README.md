Clothes E-Commerce Fullstack app using Next (as a fullstack framework), TypeScript, Redux Toolkit, TailwindCSS, MongoDB, Firebase, Stripe.

Run with Docker:

* To set up Docker for the first time, you should temporarily disable all API requests since the API is an integral part of the project and hasn't been deployed within Docker yet. After the initial launch, make sure to revert these changes.

1. Create .env using the example
2. Open Docker Desktop
3. Open Terminal
4. Type: 'docker build -t [choose-container-name] .'
5. Type: 'docker run -dp 3000:3000 [choose-container-name]'

Run locally:

1. Create .env using the example
2. Open Terminal
3. Type: 'npm i'
4. Type:'npm run dev'
