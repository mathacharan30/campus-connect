# Campus Connect — Server

The backend of [Campus Connect](../README.md): a REST API built with Express and Mongoose,
with JWT authentication and Cloudinary-backed file uploads.

## Getting started

```bash
npm install
npx nodemon app.js   # or: node app.js
# API runs on http://localhost:8080
```

Create a `.env` file in this directory:

```env
MongoDB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Stack

- **Node.js + Express 4**
- **MongoDB + Mongoose 8**
- **jsonwebtoken** + **bcryptjs** for authentication
- **multer** + **cloudinary** for file/image uploads
- **cookie-parser**, **cors**, **dotenv**

## Structure

```
SERVER/
├── models/              # Mongoose schemas
│   ├── userModel.js     #   user (email, password, username, USN, semester, userRole)
│   ├── questions.js     #   question
│   ├── answers.js       #   answer
│   ├── notesModel.js    #   note
│   ├── blogModel.js     #   blog
│   ├── jobsModel.js     #   job
│   └── hackathon.js     #   hackathon
├── routes/              # One router per resource, mounted under /api/*
├── utils/cloudinary.js  # Cloudinary configuration
├── scripts/             # One-off maintenance scripts (index fixes)
├── middlewares.js       # Auth / role middleware
└── app.js               # Server entry point + route mounting
```

## API

All routers are mounted under `/api`:

| Prefix | Resource |
| --- | --- |
| `/api/user` | Signup / login / logout |
| `/api/questions` | Questions |
| `/api/answers` | Answers |
| `/api/notes` | Lecture notes |
| `/api/blogs` | Placement blogs |
| `/api/jobs` | Job postings |
| `/api/hackathons` | Hackathons |

See the [root README API reference](../README.md#api-reference) for every endpoint.

## Notes

- On startup the server runs a one-time migration (`fixUserIndexes`) that drops a legacy
  unique `phone_1` index from the `users` collection if present.
- CORS is configured in [`app.js`](app.js) for the local dev origin and the production
  Vercel URL — add your own deployed frontend origin there.
- **Security TODO:** the JWT signing secret is currently hard-coded; move it to an
  environment variable before any real deployment.
