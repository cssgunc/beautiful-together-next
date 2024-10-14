import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
import re

# Supabase credentials
SUPABASE_URL = "https://bdcvlsgmanecdortkjcu.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkY3Zsc2dtYW5lY2RvcnRramN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4ODIxNzIsImV4cCI6MjA0MjQ1ODE3Mn0.mVnJfs6UA-cPvRTTie8XmPmhCSNmfK5PtzgZ9Zhy9Ss"

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fetch the webpage
url = "https://beautifultogethersanctuary.com/available-dogs/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract dog names
dog_names = []
for tag in soup.find_all('div', class_='col-12 Bzl-dog-heading heading-equal'):
    name = tag.get_text(strip=True)
    clean_name = re.sub(r'Litter:.*', '', name).strip()
    dog_names.append(clean_name)

# for name in dog_names:
#     print(name)

# Extract dog page links
dog_links = []
for link in soup.find_all('a', href=True, title=True):
    title = link['title']
    # Check if the title attribute (name) is a valid dog name and link is not already scraped
    if title in dog_names and link['href'] not in dog_links:
        dog_links.append(link['href'])

# for link in dog_links:
#     print(link)

# Scrape fields from each dog page
for url in dog_links:
    animal_response = requests.get(url)
    animal_soup = BeautifulSoup(animal_response.text, 'html.parser')

    breed = animal_soup.find('li', class_='features_item').text.strip()

    print(f"Breed: {breed}")

# # Insert the dog names into Supabase
# for name in dog_names:
#     data = {"name": name}
#     supabase.table("dogs").insert(data).execute()