import os
import requests
from PIL import Image
from io import BytesIO

# Create images directory if it doesn't exist
os.makedirs('images/portfolio', exist_ok=True)

# DALL-E API configuration
API_KEY = os.getenv('OPENAI_API_KEY')
API_URL = 'https://api.openai.com/v1/images/generations'

def generate_image(prompt, filename):
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    data = {
        'prompt': prompt,
        'n': 1,
        'size': '1024x1024'
    }
    
    response = requests.post(API_URL, headers=headers, json=data)
    response.raise_for_status()
    
    image_url = response.json()['data'][0]['url']
    image_response = requests.get(image_url)
    image = Image.open(BytesIO(image_response.content))
    
    # Save the image
    image.save(filename)
    print(f'Generated {filename}')

# Generate images
images_to_generate = {
    'images/headshot-placeholder.jpg': 'Professional headshot of a confident business executive in modern office setting, high-end photography, 4K, professional lighting',
    'images/portfolio/cdm-rebrand.jpg': 'Modern construction company branding materials, sleek design, professional presentation, 4K',
    'images/portfolio/531-labs.jpg': 'Futuristic AI platform interface, neon accents, dark mode, high-tech dashboard, 4K',
    'images/portfolio/throttle.jpg': 'Dynamic marketing campaign visualization, growth charts, modern office setting, 4K',
    'images/og-image.jpg': 'Professional business card design for Bryan Gesser, Fractional CMO, modern minimalist style, 4K',
    'images/twitter-card.jpg': 'Professional business card design for Bryan Gesser, Fractional CMO, modern minimalist style, 4K'
}

for filename, prompt in images_to_generate.items():
    generate_image(prompt, filename) 