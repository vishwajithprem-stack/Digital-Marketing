# Digital Marketing Academy

Digital Marketing Academy is a fully static learning website for digital marketing education, practice, and portfolio-building. The entire MVP works in the browser with no backend, no API keys, no database server, and no paid third-party services.

## Project Overview

This project delivers a complete browser-only academy experience with:

- Home
- Courses
- Roadmap
- Lessons
- AI Mentor
- Practice Labs
- Projects
- Quiz
- Dashboard
- Certificates
- Blog
- Community Demo
- Career Hub
- Profile
- Demo Admin Panel

## Free Tech Stack

- Frontend: React + Vite + TypeScript
- Styling: Tailwind CSS
- UI: Custom components only
- Routing: React Router DOM
- State and persistence: localStorage in the browser
- Charts: Recharts
- PDF certificates: jsPDF
- Hosting: GitHub Pages
- Search: local JSON filtering
- Video: embedded free YouTube educational links

## Main Features

- Fully static browser app with no backend, server, or API integration
- Local signup and login using browser storage
- Offline rule-based AI Mentor called Marketing GPT
- Local knowledge base with keyword matching for core digital marketing topics
- Practice labs for SEO, ads, email, content, social, analytics, ROI, and funnel math
- Local progress tracking, XP, streaks, badges, quiz scores, notes, bookmarks, and project submissions
- Browser-generated PDF certificates with student name, course name, date, and certificate ID
- Local community board with posts and comments
- Demo admin tools for adding and editing courses, lessons, and blog content in browser storage
- Local blog search with no external search service

## Browser Storage Used

The app stores the following locally in `localStorage`:

- user profile
- login session
- course progress
- quiz scores
- badges
- certificates
- saved notes
- bookmarked lessons
- AI chat history
- project submissions
- community posts and comments
- admin-created content updates

## Demo Authentication Warning

This project uses local demo authentication only. User credentials are stored in browser storage on the current device. This is **not secure** for production use and must not be used for sensitive real-world accounts or private user data.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build the static site:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Update the `homepage` field in `package.json` to your real GitHub Pages URL.
3. Set `VITE_BASE_PATH` if your repo name differs from the default path, for example:

```bash
VITE_BASE_PATH=/your-repo-name/
```

4. Deploy:

```bash
npm run deploy
```

5. In GitHub, ensure Pages is serving from the `gh-pages` branch if needed.

## Limitations

- Authentication is demo-only and not secure
- All data is tied to one browser on one device unless manually exported by a future upgrade
- The AI Mentor is rule-based and intentionally limited compared with live AI services
- Community and admin data are local only and are not shared between users
- Certificates are generated locally and are not verifiable by a central service

## Future Upgrade Ideas

- Replace demo auth with a secure production auth system
- Add a real backend and cloud database for multi-user sync
- Add export and import for learner progress
- Add richer quiz modes and adaptive learning paths
- Add IndexedDB support for larger offline datasets
- Add real moderation and collaboration features for community and admin workflows
