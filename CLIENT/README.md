# Campus Connect — Client

The frontend of [Campus Connect](../README.md): a React 18 single-page app built with Vite,
styled with Tailwind CSS, and backed by Redux Toolkit for auth state.

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Stack

- **React 18** + **Vite 5**
- **React Router 6** for routing, with a role-aware `ProtectedRoute`
- **Redux Toolkit** + React-Redux for auth / notification state
- **Tailwind CSS** (+ Material Tailwind, MUI, styled-components / Emotion)
- **Framer Motion**, **GSAP**, React Transition Group for animation
- **Axios** for API calls, **React Toastify** for notifications

## Structure

```
src/
├── pages/          # Route views: Home, Login, Signup, QNA, Blogs, Jobs_hackathons, …
├── components/
│   ├── ui/         # Reusable primitives: Card, InputField, PrimaryButton, …
│   └── UiOverhaul/ # Layout & chrome: Navbar, Footer, Hero, PageLayout, …
├── slices/         # Redux slices (Authslice, notifications)
├── theme/motion.js # Global motion/animation init
├── axios.jsx       # Configured Axios instance (points at the API base URL)
├── ProtectedRoute.jsx
├── App.jsx         # Routes + layout composition
└── main.jsx        # App entry point
```

## Configuration

The API base URL is configured in [`src/axios.jsx`](src/axios.jsx). Point it at your backend
(`http://localhost:8080` in development, or your deployed API in production).

Deployment to Vercel is handled by [`vercel.json`](vercel.json), which rewrites all routes to
`index.html` so client-side routing works on refresh.

> See the [root README](../README.md) for full setup, architecture, and API documentation.
