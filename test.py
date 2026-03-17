from google import genai
import os

api_key = os.getenv('GEMINI_API_KEY')
client = genai.Client(api_key=api_key)

response = client.models.generate_content(
    model="gemini-2.5-flash",  # valid model for text generation
    contents="Hello world"
)

print(response.text)