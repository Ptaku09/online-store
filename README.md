# Online Store
Try it in your browser -> [https://online-store-kappa.vercel.app/](https://online-store-kappa.vercel.app/)

### Description

Online Store is a simple e-commerce site that uses [`Next.js`](https://nextjs.org/) to create both static and server side rendered pages.\
There is toggle button, which allows user to switch between color modes (light and dark).\
All products came from [`Selaor Graphql Api`](https://vercel.saleor.cloud/graphql/).\
Furthermore, despite it's a frontend project it contains a sign in and sign up functionality provided via [`NextAuth.js`](https://nextauth.js.org/).
After creating an account, user can easily delete it on the [`/user`](https://online-store-kappa.vercel.app/user) page.\
After login, user can add items to cart, which are stored in [`MongoDB`](https://www.mongodb.com/). This feature allows user to sync cart with other devices.

### Development Guide

```bash
git clone https://github.com/Ptaku09/online-store.git
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Tech Stack

- [`Next.js`](https://nextjs.org/)
- [`TypeScript`](https://www.typescriptlang.org/)
- [`TailwindCSS`](https://tailwindcss.com/)
- [`GraphQL`](https://graphql.org/)
- [`Jest`](https://jestjs.io/)