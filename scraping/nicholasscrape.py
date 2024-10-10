import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client

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
    dog_names.append(tag.get_text(strip=True))

for name in dog_names:
    print(name)

# # Insert the dog names into Supabase
# for name in dog_names:
#     data = {"name": name}
#     supabase.table("dogs").insert(data).execute()

# print(f"Inserted {len(dog_names)} dogs into the database!")
