# WATCourse  
Creating smart, data-driven course recommendations for Waterloo students  

WATCourse is an open-source recommendation engine that actually helps you pick your next courses instead of leaving you lost in UWFlow rabbit holes or asking random group chats. It reads your transcript, builds a profile of your academic strengths and weaknesses, and then layers in real UWFlow reviews to recommend courses that fit **you**. MIT Licensed, so you can hack on it too.  

---

## Why WATCourse
Picking courses at Waterloo sucks. Everyone says “just take bird courses,” but what’s easy for one person might be brutal for someone else, or what's interesting for another is boring for you. Reviews are helpful, but they’re not personalized.  

That’s why WATCourse was built:  
- It looks at your actual transcript  
- It understands what you found difficult vs. what you thrived in  
- It balances “easy GPA boost” with “useful and interesting” courses  
- It mixes transcript similarity with **UWFlow ratings** (easiness, usefulness, liked) so recommendations aren’t just random popular picks  

---

## How the Recommendation Works
The engine blends **your academic history** with **real student feedback** to give you smart, personalized recs:  

1. **Transcript Parsing**: Pulls out course codes + grades from your PDF transcript  
2. **Vector Profile**: Builds a 384D vector to model your completed courses  
3. **Cosine Similarity**: Finds courses closest to your profile  
4. **Review Data**: Applies student feedback from UWFlow  
   - *Easiness* → how manageable students found it  
   - *Usefulness* → how relevant it felt long-term  
   - *Liked* → how much students actually enjoyed it  
5. **Scoring**: Combines similarity (70%) + review quality (30%) for final ranking  
6. **Diversity Pass**: Ensures results aren’t all from one department  

---

## Features
- Transcript parsing with `pdfminer.six`  
- 384D academic profile embedding  
- Cosine similarity with `scikit-learn` + `numpy`  
- UWFlow review integration (easiness, usefulness, liked)  
- Scoring system that blends transcript data + student sentiment  
- Department diversity filter  
- Privacy-first: transcripts deleted instantly after processing  
- Sub-5s recommendations  

---
