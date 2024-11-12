import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
import re
import pprint
import os
from dotenv import load_dotenv

# Supabase credentials
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

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
# url = "https://beautifultogethersanctuary.com/available-cats/"
# html_text = requests.get(url)

# soup = BeautifulSoup(html_text.content, 'html.parser')

# images = soup.find_all('img')

# div_titles = soup.find_all('div', {"class" : "col-12 Bzl-dog-heading heading-equal"})
# name_list = []
# for div_title in div_titles:
#     title = div_title.find('a')
#     name_list.append(title.get('title'))
# img_list = []
# for img in images:
#     img_url = img.get("data-src")
#     if img_url and not img_url.startswith('data:'):
#         if img_url.startswith('/'):
#             img_url += url
#     if(img_url != None):
#         img_list.append(img_url)

# values_dict = {}
# for i in range(len(name_list)):
#     values_dict[name_list[i]] = img_list[i+1]

# Store fields for each cat
for cat in cats:
    # Scrape tags from individual cat page
    tags = get_tags(cat['link'])
    # Determine if it is a dog or cat based on the URL
    animal_type = 'dog' if 'dog' in cat['link'].lower() else 'cat'
    # Store the data in the cat's dictionary
    cat['tags'] = tags
    # cat['images'] = values_dict[cat['name']]
    cat['type'] = animal_type

# Fetch existing records from Supabase
def fetch_existing_animals():
    response = supabase.table('Available Animals').select('*').eq('"dog/cat"', 'cat').execute()
    if response.data:
        # Use link as the unique key
        return {item['link']: item for item in response.data}
    return {}

# Compare and update database
def update_database_with_scraped_data(animals):
    existing_animals = fetch_existing_animals()
    animals_to_insert = []
    animals_to_update = []
    existing_links = set(existing_animals.keys())

    # Identify animals for insertion and updating
    for cat in cats:
        link = cat['link']
        if link in existing_links:
            # Check if the data has changed
            existing_animal = existing_animals[link]
            if cat['tags'] != existing_animal.get('tags'):
                animals_to_update.append(cat)
            existing_links.remove(link)
        else:
            animals_to_insert.append(cat)

    # Animals remaining in existing_links are to be deleted
    animals_to_delete = list(existing_links)

    # Perform database operations
    for animal in animals_to_insert:
        supabase.table('Available Animals').insert({
            'name': animal['name'],
            'tags': animal['tags'],
            'link': animal['link'],
            # 'images': animal['images'],
            'dog/cat': animal['type']
        }).execute()

    for animal in animals_to_update:
        supabase.table('Available Animals').update({
            'tags': animal['tags'],
            # 'images': animal['images'],
            'dog/cat': animal['type']
        }).eq('link', animal['link']).execute()

    for link in animals_to_delete:
        supabase.table('Available Animals').delete().eq('link', link).execute()

    pprint.pprint(animals_to_delete)
    pprint.pprint(animals_to_insert)
    pprint.pprint(animals_to_update)

# Run the update
update_database_with_scraped_data(cats)

# # Before insertion, delete existing 'cat' entries
# def clear_cats_from_supabase():
#     response = supabase.table('Available Animals').delete().eq('"dog/cat"', 'cat').execute()

# clear_cats_from_supabase()

# # Insert into supabase
# for cat in cats:
#     supabase.table('Available Animals').insert({
#         'name': cat['name'],
#         'tags': cat['tags'],
#         # 'images': cat['images'],
#         'dog/cat': cat['type'],
#         'link': cat['link']
#     }).execute()

# pprint.pprint(cats)


