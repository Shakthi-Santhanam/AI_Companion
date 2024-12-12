from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Make sure this matches your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Define a model for the incoming data
class MoodData(BaseModel):
    stressLevel: int
    mood: str

# POST endpoint to receive data
@app.post("/track")
def track_mood_and_stress(mood_data: MoodData):
    print(f"Received data: {mood_data}")  # Log the data for debugging
    return {"message": "Data received successfully!", "data": mood_data}
