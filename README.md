# WATCourse

Building smart, data-driven course recommendations for Waterloo students.

WATCourse is an open-source recommendation engine that actually helps you pick your next courses instead of leaving you lost in UWFlow rabbit holes or asking random group chats. It reads your transcript, builds a profile of your academic strengths and weaknesses, and then layers in real UWFlow reviews to recommend courses that fit **you**. MIT Licensed, so you can hack on it too.

## Why WATCourse

Picking courses at Waterloo sucks. Everyone says "just take bird courses," but what's easy for one person might be brutal for someone else. Reviews are helpful, but they're not personalized.

That's why WATCourse was built: it looks at your actual transcript, understands what you found difficult versus what you thrived in, and balances "easy GPA boost" with "useful and interesting." It mixes transcript similarity with UWFlow ratings on easiness, usefulness, and how much students liked a course, so recommendations aren't just random popular picks — they're tailored to your strengths and preferences.

## How the Recommendation Works

The engine blends **your academic history** with **real student feedback** to give you smart, personalized recs.

First, your transcript is parsed for course codes and grades, then turned into a 384-dimensional "academic profile." Every Waterloo course in the database also has an embedding, and cosine similarity is used to measure which ones align best with your history. From there, review data from UWFlow comes into play — courses aren't just matched by similarity, but also scored by how students rated them in terms of easiness, usefulness, and overall enjoyment. The final ranking combines these signals (roughly 70% similarity, 30% review quality), with a pass that ensures you don't just get ten courses from the same department.

## Project Architecture

WATCourse is split into a frontend and a backend that work together seamlessly. The frontend is built with React using Next.js 14, styled with Tailwind CSS, and deployed on Vercel. This is where students upload their transcript and receive real-time recommendations.

The backend is powered by FastAPI in Python 3.11. It parses transcripts with `pdfminer.six`, computes embeddings, and runs cosine similarity through `numpy` and `scikit-learn` to generate course matches. The backend is hosted on Railway for easy deployment and scaling.

All of this is supported by a data pipeline built on a curated database of 916 Waterloo courses enriched with pre-computed embeddings and UWFlow reviews. NLP is applied to student feedback to capture satisfaction, difficulty, and usefulness, ensuring the recommendations feel both accurate and relevant.

## Repo Layout

```plaintext
WAT-course/
├── app/                    # Next.js app
│   ├── about/              # How it works page
│   ├── results/            # Results page
│   ├── layout.tsx
│   └── page.tsx
├── components/             # React UI components
│   ├── hero.tsx
│   ├── navbar.tsx
│   └── ui/
├── main.py                 # FastAPI backend
├── reccomender.py          # ML recommendation logic
├── pdfparser.py            # Transcript parsing
├── embedded_coursesfinal.json  # Course database
├── generate_embeddings.py      # Embedding generation
└── requirements.txt
```

## Prerequisites

- Node.js 18+
- Python 3.11+
- Git

## Installation

Clone and set up:

```bash
git clone https://github.com/YuvDwi/WAT-course.git
cd WAT-course
```

### Frontend

```bash
npm install
npm run dev
```

Runs at http://localhost:3000

### Backend

```bash
pip install -r requirements.txt
python3 main.py
```

Runs at http://localhost:12000

### Frontend Config

```bash
NEXT_PUBLIC_API_URL=http://localhost:12000
```

## Dev Commands

### Frontend

- `npm run dev` – start local frontend
- `npm run build` – production build

### Backend

- `python3 main.py` – start API server

### Embeddings

- `python3 generate_embeddings.py` – regenerate vectors

## Deployment

### Frontend (Vercel)

1. Connect GitHub repo
2. Add `NEXT_PUBLIC_API_URL`
3. Auto-deploy on push

### Backend (Railway)

1. Connect GitHub repo
2. Start command: `python3 main.py`
3. Python version via runtime.txt

## Dev Guidelines

- Keep scoring weights configurable in `reccomender.py`
- Test with real transcripts before merging
- Make sure UI works on mobile
- Add error handling for PDF parsing
