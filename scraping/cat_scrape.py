import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
import re
import pprint

# Supabase credentials
SUPABASE_URL = "https://bdcvlsgmanecdortkjcu.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkY3Zsc2dtYW5lY2RvcnRramN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4ODIxNzIsImV4cCI6MjA0MjQ1ODE3Mn0.mVnJfs6UA-cPvRTTie8XmPmhCSNmfK5PtzgZ9Zhy9Ss"

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fetch the main webpage
url = "https://beautifultogethersanctuary.com/available-cats/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract cat page links
cats = []
for tag in soup.find_all('div', class_='col-12 Bzl-dog-heading heading-equal'):
    name = tag.get_text(strip=True)
    clean_name = re.sub(r'Litter:.*', '', name).strip()
    clean_name = re.sub(r'Bonded.*', '', clean_name).strip()
    
    link_tag = tag.find('a', href=True, title=True)
    if link_tag:
        link = link_tag['href']
    cats.append({'name': clean_name, 'link': link})

# Function to scrape tags from each cat page - from Ryan
def get_tags(url) -> dict[str, str]:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    # dict to store tags
    labels = {}
    
    # Extract list of tags
    for tag in soup.find_all('li', class_='features_item'):
        # getting the type of tag
        header = tag.find("i")['title']
        # getting the value of the tag
        label = tag.get_text(strip=True)
        labels[header] = label

    return labels

# Scrape and store images in a list
url = "https://beautifultogethersanctuary.com/available-cats/"
html_text = requests.get(url)

soup = BeautifulSoup(html_text.content, 'html.parser')

images = soup.find_all('img')

div_titles = soup.find_all('div', {"class" : "col-12 Bzl-dog-heading heading-equal"})
name_list = []
for div_title in div_titles:
    title = div_title.find('a')
    name_list.append(title.get('title'))
img_list = []
for img in images:
    img_url = img.get("data-src")
    if img_url and not img_url.startswith('data:'):
        if img_url.startswith('/'):
            img_url += url
    if(img_url != None):
        img_list.append(img_url)

values_dict = {}
for i in range(len(name_list)):
    values_dict[name_list[i]] = img_list[i+1]

# Scrape images and tags for each dog
for cat in cats:
    # Scrape tags from individual dog page
    tags = get_tags(cat['link'])
    # Determine if it is a dog or cat based on the URL
    animal_type = 'dog' if 'dog' in cat['link'].lower() else 'cat'
    # Store the data in the dog's dictionary
    cat['tags'] = tags
    # dog['images'] = values_dict[dog['name']]
    cat['type'] = animal_type

# Before insertion, delete existing 'cat' entries
def clear_cats_from_supabase():
    response = supabase.table('Available Animals').delete().eq('"dog/cat"', 'cat').execute()

clear_cats_from_supabase()

# Insert into supabase
for cat in cats:
    supabase.table('Available Animals').insert({
        'name': cat['name'],
        'tags': cat['tags'],
        # 'images': cat['images'],
        'dog/cat': cat['type']
    }).execute()

pprint.pprint(cats)

