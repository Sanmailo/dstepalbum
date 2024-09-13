from fastapi import FastAPI, Request, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from base64 import b64encode
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
import aiofiles
import os
from dotenv import load_dotenv
import re

load_dotenv()

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

UPLOAD_DIR = 'uploads/'
IMAGES_DIR = 'images/'

# MongoDB connection
MONGO_DETAILS = os.getenv("MONGODB_URI")
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.dstep_album
user_collection = database.get_collection("user")
image_collection = database.get_collection("images")

class User(BaseModel):
    profilePicInput: Optional[str]
    ninInput: Optional[str]
    fingerprintInput: Optional[str]
    nin: str
    firstName: str
    middleName: Optional[str]
    lastName: str
    dstepRegNo: Optional[str]
    admittedCourse: Optional[str]
    personalEmail: EmailStr
    officialEmail: Optional[EmailStr]
    gender: str
    phoneNumber: str
    whatsappNo: Optional[int]
    dateOfBirth: Optional[str]
    age: Optional[int]
    physicalChallenge: Optional[str]
    employmentStatus: Optional[str]
    stateOfResidence: Optional[str]
    stateOfOrigin: Optional[str]
    highestQualification: Optional[str]
    lastInstitutionAttended: Optional[str]
    tertiaryCourseOfStudy: Optional[str]
    occupation: Optional[str]

    @field_validator('profilePicInput', 'ninInput', 'fingerprintInput')
    def check_image_file(cls, v, field):
        if v and not v.endswith(('.jpg', '.jpeg', '.png')):
            raise ValueError(f"{field.name.replace('Input', '')} must be an image")
        return v

    @field_validator('gender')
    def validate_gender(cls, v):
        if v.lower() not in ["male", "female"]:
            raise ValueError("Invalid gender")
        return v

    @field_validator('nin')
    def validate_nin(cls, v):
        if not (v.isdigit() and len(v) == 11):
            raise ValueError("NIN must be exactly 11 digits")
        return v

    @field_validator('phoneNumber')
    def validate_phone_number(cls, v):
        if not (v.isdigit() and 11 <= len(v) <= 15):
            raise ValueError("Phone number must be between 11 and 15 digits")
        return v

@app.on_event("startup")
async def startup_event():
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)
    if not os.path.exists(IMAGES_DIR):
        os.makedirs(IMAGES_DIR)

@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/upload_images")
async def upload_images_page(request: Request):
    return templates.TemplateResponse("upload.html", {"request": request})

@app.post("/upload")
async def upload_images(student_reg_no: int = Form(...), files: list[UploadFile] = File(...)):
    if await image_collection.find_one({"student_reg_no": student_reg_no}):
        return JSONResponse(content={"message": "Student Registration Number already exists"}, status_code=400)
    
    image_list = []
    for file in files:
        image_data = await file.read()
        image_list.append({"image": image_data, "filename": file.filename, "student_reg_no": student_reg_no})
    
    try:
        for i, image in enumerate(image_list, start=1):
            image["sequence_no"] = i
            await image_collection.insert_one(image)
        return JSONResponse(content={"message": "Images uploaded successfully"}, status_code=201)
    except Exception as e:
        return JSONResponse(content={"message": str(e)}, status_code=500)

@app.get("/images")
async def get_all_images(request: Request):
    images = image_collection.find().sort("student_reg_no", 1)
    image_data = []
    async for image in images:
        base64_image = b64encode(image['image']).decode('utf-8')
        image_data.append({
            "student_reg_no": image['student_reg_no'],
            "filename": image['filename'],
            "image": base64_image
        })
    return templates.TemplateResponse("album.html", {"request": request, "images": image_data})

@app.post("/users/")
async def create_user(
    profilePicInput: UploadFile = File(None),
    ninInput: UploadFile = File(None),
    fingerprintInput: UploadFile = File(None),
    nin: str = Form(...),
    firstName: str = Form(...),
    middleName: Optional[str] = Form(None),
    lastName: str = Form(...),
    dstepRegNo: Optional[str] = Form(None),
    admittedCourse: Optional[str] = Form(None),
    personalEmail: str = Form(...),
    officialEmail: Optional[str] = Form(None),
    gender: str = Form(...),
    phoneNumber: str = Form(...),
    whatsappNo: Optional[int] = Form(None),
    dateOfBirth: Optional[str] = Form(None),
    age: Optional[int] = Form(None),
    physicalChallenge: Optional[str] = Form(None),
    employmentStatus: Optional[str] = Form(None),
    stateOfResidence: Optional[str] = Form(None),
    stateOfOrigin: Optional[str] = Form(None),
    highestQualification: Optional[str] = Form(None),
    lastInstitutionAttended: Optional[str] = Form(None),
    tertiaryCourseOfStudy: Optional[str] = Form(None),
    occupation: Optional[str] = Form(None),
):
    existing_user = await user_collection.find_one({"personalEmail": personalEmail})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    if profilePicInput:
        async with aiofiles.open(os.path.join(UPLOAD_DIR, profilePicInput.filename), 'wb') as f:
            await f.write(await profilePicInput.read())
    if ninInput:
        async with aiofiles.open(os.path.join(UPLOAD_DIR, ninInput.filename), 'wb') as f:
            await f.write(await ninInput.read())
    if fingerprintInput:
        async with aiofiles.open(os.path.join(UPLOAD_DIR, fingerprintInput.filename), 'wb') as f:
            await f.write(await fingerprintInput.read())

    user_data = User(
        profilePicInput=profilePicInput.filename if profilePicInput else None,
        ninInput=ninInput.filename if ninInput else None,
        fingerprintInput=fingerprintInput.filename if fingerprintInput else None,
        nin=nin,
        firstName=firstName,
        middleName=middleName,
        lastName=lastName,
        dstepRegNo=dstepRegNo,
        admittedCourse=admittedCourse,
        personalEmail=personalEmail,
        officialEmail=officialEmail,
        gender=gender,
        phoneNumber=phoneNumber,
        whatsappNo=whatsappNo,
        dateOfBirth=dateOfBirth,
        age=age,
        physicalChallenge=physicalChallenge,
        employmentStatus=employmentStatus,
        stateOfResidence=stateOfResidence,
        stateOfOrigin=stateOfOrigin,
        highestQualification=highestQualification,
        lastInstitutionAttended=lastInstitutionAttended,
        tertiaryCourseOfStudy=tertiaryCourseOfStudy,
        occupation=occupation,
    )

    try:
        await user_collection.insert_one(jsonable_encoder(user_data))
        return JSONResponse(status_code=201, content={"message": "User created successfully"})
    except Exception as e:
        return JSONResponse(status_code=400, content={"message": str(e)})

# Run the app with uvicorn if this script is run directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
