# Import necessary modules
from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from base64 import b64encode
from fastapi.templating import Jinja2Templates
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Create a FastAPI app
app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

# Create a Jinja2Templates instance
templates = Jinja2Templates(directory="templates")

# Load environment variables from .env file
load_dotenv()

# Create a MongoClient instance with the MONGODB_URI from the environment variables
client = MongoClient(os.environ['MONGODB_URI'])

# Create a database and collection instance
db = client['image_database']
collection = db['images']

# Define a startup event to create the images directory
@app.on_event("startup")
async def create_images_dir():
    # Create the images directory if it doesn't exist
    images_dir = os.path.join(os.getcwd(), 'images')
    if not os.path.exists(images_dir):
        await os.makedirs(images_dir)

# Define a route for the index page
@app.get("/")
async def index(request: Request):
    # Return the index.html template
    return templates.TemplateResponse("index.html", {"request": request})

# Define a route for the upload images page
@app.get("/upload_images")
async def upload_images_page(request: Request):
    # Return the upload.html template
    return templates.TemplateResponse("upload.html", {"request": request})

# Define a route for uploading images
@app.post("/upload")
async def upload_images(student_reg_no: int = Form(...), files: list[UploadFile] = File(...)):
    # Check if the student registration number already exists
    if collection.find_one({"student_reg_no": student_reg_no}):
        return JSONResponse(content={"message": "Student Registration Number already exists"}, status_code=400)
    
    # Create a list to store the images
    image_list = []
    for file in files:
        image_data = await file.read()
        image_list.append({"image": image_data, "filename": file.filename, "student_reg_no": student_reg_no})
    
    try:
        # Insert the images into the database with a sequence number
        for i, image in enumerate(image_list, start=1):
            image["sequence_no"] = i
            collection.insert_one(image)
        return JSONResponse(content={"message": "Images uploaded successfully"}, status_code=201)
    except Exception as e:
        # Return an error response if an exception occurs
        return JSONResponse(content={"message": str(e)}, status_code=500)


@app.get("/images")
async def get_all_images(request: Request):
    # Retrieve images from MongoDB
    images = collection.find().sort("student_reg_no", 1)
    
    # Convert images to Base64 for display in HTML
    image_data = []
    for image in images:
        # Base64 encode the image binary data
        base64_image = b64encode(image['image']).decode('utf-8')
        image_data.append({
            "student_reg_no": image['student_reg_no'],
            "filename": image['filename'],
            "image": base64_image
        })
    
    return templates.TemplateResponse("album.html", {"request": request, "images": image_data})


# Run the app with uvicorn if this script is run directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)