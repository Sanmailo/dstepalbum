from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import base64

app = FastAPI()

# CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# MongoDB connection
client = AsyncIOMotorClient("mongodb+srv://Gritfordcenter:2wambLSatzA5ukVe@gritford.7r15mug.mongodb.net/")
db = client.dstep_profiles  # database name

@app.post("/submit-profile")
async def submit_profile(
    ProfilePicture: UploadFile = File(...),
    FingerprintPicture: UploadFile = File(...),
    Date: str = Form(None),
    NIN: str = Form(None),
    FirstName: str = Form(...),
    MiddleName: str = Form(...),
    LastName: str = Form(...),
    DSTEPRegNo: str = Form(None),
    DSTEPAdmittedCourse: str = Form(None),
    PersonalEmail: str = Form(None),
    OfficialEmail: str = Form(None),
    Gender: str = Form(None),
    PhoneNumber: str = Form(None),
    WhatsappNumber: str = Form(None),
    DateofBirth: str = Form(None),
    Age: str = Form(None),
    PhysicalChallenge: str = Form(None),
    EmploymentStatus: str = Form(None),
    StateOfResidence: str = Form(None),
    StateOfOrigin: str = Form(None),
    HighestQualification: str = Form(None),
    LastInstitutionAttended: str = Form(None),
    TertiaryCourseOfStudy: str = Form(None),
    Occupation: str = Form(None)
):
    # Read and encode images
    Profile_pic = base64.b64encode(await ProfilePicture.read()).decode('utf-8')
    Fingerprint_pic = base64.b64encode(await FingerprintPicture.read()).decode('utf-8')

    # Create profile document
    Profile = {
        "ProfilePicture": Profile_pic,
        "FingerprintPicture":Fingerprint_pic,
        "Date": Date,
        "NIN": NIN,
        "FirstName": FirstName,
        "MiddleName": MiddleName,
        "LastName": LastName,
        "DSTEPRegNo":DSTEPRegNo,
        "DSTEPAdmittedCourse":  DSTEPAdmittedCourse,
        "PersonalEmail:":PersonalEmail,
        "OfficialEmail": OfficialEmail,
        "Gender": Gender,
        "PhoneNumber": PhoneNumber,
        "WhatsappNumber": WhatsappNumber,
        "DateofBirth": DateofBirth,
        "Age": Age,
        "PhysicalChallenge": PhysicalChallenge,
        "EmploymentStatus": EmploymentStatus,
        "StateOfResidence": StateOfResidence,
        "StateOfOrigin": StateOfOrigin,
        "HighestQualification": HighestQualification,
        "LastInstitutionAttended": LastInstitutionAttended,
        "TertiaryCourseOfStudy": TertiaryCourseOfStudy,
        "Occupation": Occupation
    }

    # Insert profile into MongoDB
    result = await db.profiles.insert_one(Profile)

    return {"message": "Profile submitted successfully", "id": str(result.inserted_id)}

if __name__=="_main_":
    app.run(app, host='0.0.0.0', port=8000)