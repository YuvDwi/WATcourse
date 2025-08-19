from pdfminer.high_level import extract_text
import re
import json

def extract_courses_separate_lists(text):
    course_codes = []
    course_numbers = []

    # Find all "Course" sections
    course_sections = re.findall(r'Course\s*(.*?)(?=Description|Term GPA|Grade|$)', text, re.DOTALL)

    for section in course_sections:
        lines = [line.strip() for line in section.split('\n') if line.strip()]

        for line in lines:
            # Check if it's a department code (2-5 uppercase letters only)
            if re.match(r'^[A-Z]{2,5}$', line):
                course_codes.append(line)
            # Check if it's a course number (digits + optional letters only)
            elif re.match(r'^\d+[A-Z]*$', line):
                course_numbers.append(line)

    return course_codes, course_numbers

def process_pdf_file(file_path):
    """
    Process a PDF file and extract course information
    """
    try:
        text = extract_text(file_path)
        course_codes, course_numbers = extract_courses_separate_lists(text)
        
        # Create full course names
        full_courses = []
        for i in range(len(course_codes)):
            if i < len(course_numbers):
                full_courses.append(course_codes[i] + course_numbers[i])
        
        return {
            "course_codes": course_codes,
            "course_numbers": course_numbers,
            "full_courses": full_courses,
            "raw_text": text
        }
    except Exception as e:
        return {"error": f"Error processing PDF: {str(e)}"}