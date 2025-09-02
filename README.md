# WATCourse  
*Smart, data-driven course recommendations for Waterloo students*  

WATCourse is an open-source recommendation engine that actually helps you pick your next courses instead of leaving you lost in UWFlow rabbit holes or asking random group chats. It reads your transcript, figures out what you’re good at (and what you struggle with), then pairs that with real student review data to give you tailored recommendations in seconds. MIT Licensed, so you can hack on it too.  

---

## Why WATCourse
Picking courses at Waterloo sucks. Everyone tells you “just take bird courses,” but what’s easy for them might be brutal for you. Reviews are useful, but they’re not personalized.  

I built WATCourse because I wanted recommendations that:  
- Actually understand my academic history  
- Take into account what I find difficult  
- Balance “easy GPA boost” with “useful and interesting”  
- Don’t just parrot whatever’s popular on Reddit  

---

## Features
- **Transcript Parsing**: Upload your PDF, it gets parsed with `pdfminer.six`  
- **Academic Profile**: Builds a 384D vector to model your course history  
- **Smart Matching**: Cosine similarity (`scikit-learn`, `numpy`) finds the closest fits  
- **Student Voices**: Reviews pulled from UWFlow, processed with NLP  
- **Scoring System**: Balances similarity + difficulty + usefulness + satisfaction  
- **Department Diversity**: Keeps recs varied, not just a spam of math/CS  
- **Privacy First**: No data stored, transcript deleted immediately  
- **Lightning Fast**: Results in under 5 seconds  

---

## Architecture
**Frontend (Next.js 14 / TypeScript / Tailwind CSS)**  
- Upload + results UI  
- Hosted on Vercel  

**Backend (FastAPI / Python 3.11)**  
- Recommendation logic + transcript parsing  
- Hosted on Railway  

**Data Pipeline**  
- 916 Waterloo courses with metadata + embeddings  
- UWFlow reviews run through NLP  
- Pre-computed embeddings for production speed  

---

## How It Works (Quick Flow)
1. Pulls text out of your transcript with `pdfminer.six`  
2. Finds your courses and grades with regex  
3. Builds your academic “vector profile”  
4. Runs cosine similarity against the course database  
5. Scores each course (70% similarity, 30% quality)  
6. Applies department diversity so you don’t just get 10 CS courses  

---

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
├── generate_embeddings.py_
