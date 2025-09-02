# WATCourse

*Data-driven course recommendations for University of Waterloo students*

WATCourse is an open-source recommendation engine that analyzes academic transcripts and generates personalized course suggestions using machine learning. Licensed for open-source use under MIT License.

## Why WATCourse

Finding the right courses at Waterloo can be difficult. Suggestions from peers are often generic, and reviews don't always reflect what's challenging for an individual student. WATCourse was built to make course selection smarter by analyzing transcripts directly, identifying academic strengths and weaknesses, and matching them with real student feedback for personalized recommendations.

## Features

- PDF transcript parsing with `pdfminer.six`
- Academic profile creation via 384D vector embeddings
- Cosine similarity for course matching (`scikit-learn`, `numpy`)
- UWFlow review integration using NLP
- Scoring system that balances similarity with difficulty, usefulness, and satisfaction
- Department diversity filtering for varied recommendations
- Privacy-first: transcripts processed locally and deleted immediately
- Fast results (recommendations in <5 seconds)

## Architecture

**Frontend (Next.js 14 / TypeScript / Tailwind CSS)**
- Transcript upload + results interface
- Deployed on Vercel

**Backend (FastAPI / Python 3.11)**
- ML recommendation engine with cosine similarity
- Transcript parsing with `pdfminer.six`
- Deployed on Railway

**Data Pipeline**
- Course database of 916 courses with metadata + embeddings
- UWFlow reviews processed with NLP
- Pre-computed embeddings for production efficiency

## Execution Flow

1. Extract transcript text with `pdfminer.six`
2. Detect course codes and grades via regex
3. Compute academic profile from completed courses
4. Match against course database using cosine similarity
5. Score with quality factors (satisfaction, easiness, usefulness)
6. Apply department diversity filtering

## Repository Structure

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

Clone repository and install dependencies:

```bash
git clone https://github.com/YuvDwi/WAT-course.git
cd WAT-course
```

### Frontend

```bash
npm install
npm run dev
```

Runs at http://localhost:3000.

### Backend

```bash
pip install -r requirements.txt
python3 main.py
```

API runs at http://localhost:12000.

Set `.env.local` in frontend:

```bash
NEXT_PUBLIC_API_URL=http://localhost:12000
```

## Development Commands

### Frontend

- `npm run dev` – start Next.js frontend
- `npm run build` – production build

### Backend

- `python3 main.py` – start FastAPI server

### Data & Embeddings

- `python3 generate_embeddings.py` – regenerate embeddings

## Deployment

### Frontend (Vercel)

1. Connect GitHub repo
2. Set `NEXT_PUBLIC_API_URL` env variable
3. Auto-deploy on push to main

### Backend (Railway)

1. Connect GitHub repo
2. Start command: `python3 main.py`
3. Specify Python version in runtime.txt

## Development Guidelines

- Keep ML weights/scoring configurable in `reccomender.py`
- Test changes on transcripts before merging
- Ensure responsive frontend for student use
- Add error handling for PDF parsing
