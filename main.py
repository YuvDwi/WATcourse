from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
import uvicorn
import tempfile
import os
from reccomender import CourseRecommender
from pdfparser import extract_courses_separate_lists

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

engine = CourseRecommender()

class CourseRequest(BaseModel):
    completed_courses: List[str]

@app.post("/recommend")
async def reccomend_courses(request: CourseRequest):
    request_json = json.dumps({"completed_courses": request.completed_courses})
    response_json = engine.recommend_courses_json(request_json)
    response = json.loads(response_json)
    
    course_codes = [rec["course_code"] for rec in response.get("recommendations", [])]
    
    return {"recommendations": course_codes}

@app.post("/recommend-from-courses")
async def recommend_from_courses(request: CourseRequest):
    try:
        request_json = json.dumps({"completed_courses": request.completed_courses})
        response_json = engine.recommend_courses_json(request_json)
        response = json.loads(response_json)
        
        if "error" in response:
            return {"error": response["error"], "recommendations": []}
        
        return {
            "completed_courses": request.completed_courses,
            "recommendations": response.get("recommendations", []),
            "total_recommendations": len(response.get("recommendations", []))
        }
        
    except Exception as e:
        return {"error": f"Error getting recommendations: {str(e)}", "recommendations": []}

@app.options("/upload-pdf")
async def upload_pdf_options():
    return {"message": "OK"}

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        return {"error": "File must be a PDF"}
    
    try:
        contents = await file.read()
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            temp_file.write(contents)
            temp_file_path = temp_file.name
        
        try:
            from pdfminer.high_level import extract_text
            extracted_text = extract_text(temp_file_path)
            
            course_codes, course_numbers = extract_courses_separate_lists(extracted_text)
            
            full_courses = []
            for i in range(len(course_codes)):
                if i < len(course_numbers):
                    full_courses.append(course_codes[i] + course_numbers[i])
            
            recommendations = []
            if full_courses:
                try:
                    request_data = {"completed_courses": full_courses}
                    request_json = json.dumps(request_data)
                    
                    recommendations_json = engine.recommend_courses_json(request_json)
                    recommendations_data = json.loads(recommendations_json)
                    
                    if "error" not in recommendations_data:
                        recommendations = recommendations_data.get("recommendations", [])
                    else:
                        recommendations = []
                        
                except Exception as rec_error:
                    print(f"Error getting recommendations: {rec_error}")
                    recommendations = []
            
            os.unlink(temp_file_path)
            
            return {
                "filename": file.filename,
                "size": len(contents),
                "message": "PDF processed successfully",
                "status": "processed",
                "extracted_courses": full_courses,
                "course_codes": course_codes,
                "course_numbers": course_numbers,
                "raw_text_length": len(extracted_text),
                "recommendations": recommendations,
                "total_courses_found": len(full_courses),
                "total_recommendations": len(recommendations)
            }
            
        except Exception as parse_error:
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
            raise parse_error
            
    except Exception as e:
        return {"error": f"Error processing PDF: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=12000)