<p align="center">
    <a href="https://codeforstartup.com/">
        <img style="width: 180px" src="./apps/web/public/assets/logo.svg">
        <h1 align="center" style="color: red">TOPLIST</h1>
    </a>
</p>

# About TOPLIST

# Installation

Install

```
turbo install
```

In the `apps/web` folder, copy the env.example to env.local and enter the environment values

In the `packages/database`, copy the env.example to .env and enter the DATABASE_URL

Migration

```
db:migrate
```

Start

```
turbo dev
```

# Libraries

🤖 ReactJS  
🎯 TypeScript  
💫 NextJS 14 - App router and server actions  
🤗 Prisma  
🎰 React Form Hook  
🎭 Postgres  
🖋 Zod validation  
🎯 TailwindCSS  
🚀 Turborepo  
💒 Tiptap  
🍾 react-textarea-autosize  
👽 Prettier
💥 Husky  
🔥 shadcn  
💌 next-themes  
🐠 lucide-react icon  
🐧 next-auth  
🐴 dayjs  
🐢 react-toastify

# Functions

- [x] Register by email or github
- [x] Login by email, github or magic link
- [x] User logout
- [ ] Verify email
- [ ] Forgot password
- [x] CRUD post
- [x] List post: Search & filter by top or hot week, month, year, infinity
- [x] Like post
- [x] Comment on post
- [ ] Share post
- [x] Manage tag
- [ ] Follow user
- [ ] Multiple theme & dark mode or light mode
- [ ] Multiple language
- [ ] Follow tag
- [ ] Manage user profile
- [ ] Multiple type: post/question

# DEV NOTES

[[1][DEV NOTE] Initial turbo project and add tailwindcss library](https://dev.to/codeforstartup/dev-note-initial-turbo-project-and-add-tailwindcss-library-4iae)  
[[2][DEV NOTE] Integrate prisma and postgres database](https://dev.to/codeforstartup/2dev-note-add-prisma-and-postgres-database-2m84)  
[[3][DEV NOTE] Create a form with tiptap and react-textarea-autosize](https://dev.to/codeforstartup/3dev-note-create-a-form-with-tiptap-and-react-textarea-autosize-1cgn)
