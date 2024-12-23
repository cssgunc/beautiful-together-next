import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
import re
import pprint
import os
from dotenv import dotenv_values

# Supabase credentials
# config = dotenv_values(".env.local")
# SUPABASE_URL = config['NEXT_PUBLIC_SUPABASE_URL']
# SUPABASE_KEY =  config['NEXT_PUBLIC_SUPABASE_ANON_KEY']
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY =  os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

# The table that is edited
table_to_update = 'Available Animals'

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fetch the main webpage
url = "https://beautifultogethersanctuary.com/available-dogs/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract dog page links
dogs = []
for tag in soup.find_all('div', class_='col-12 Bzl-dog-heading heading-equal'):
    name = tag.get_text(strip=True)
    clean_name = re.sub(r'Litter:.*', '', name).strip()
    
    link_tag = tag.find('a', href=True, title=True)
    if link_tag:
        link = link_tag['href']
    dogs.append({'name': clean_name, 'link': link})

# Function to scrape tags from each dog page
def get_tags(url) -> dict[str, str]:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    labels = {}
    
    # Extract list of tags
    for tag in soup.find_all('li', class_='features_item'):
        header = tag.find("i")['title']
        label = tag.get_text(strip=True)
        labels[header] = label

    return labels

# Scrape images for each dog page
def get_images(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    img_list = []
    # TESTING PURPOSES
    cropped = True
    
    # Find all images for the dog on its page
    for img in soup.find_all('a', class_='dogPics'):
        img_url = img['href']
        
        # If the image starts with '/', it's relative, so append the base URL
        if img_url.startswith('/'):
            img_url = url + img_url
        
        # If cropped, then get the 300x300px version.
        if cropped:
            img_url_arr = img_url.split('.')
            img_url_arr[-2] = re.sub('-(scaled|rotated)$', '', img_url_arr[-2])
            img_url_arr[-2] += "-300x300"
            img_url = ".".join(img_url_arr)
        
        # Append image link
        img_list.append(img_url)
                
    return img_list

# Store fields for each dog and fetch their images
for dog in dogs:
    # Scrape tags and images from individual dog page
    tags = get_tags(dog['link'])
    images = get_images(dog['link'])
    
    animal_type = 'dog'
    dog['tags'] = tags
    dog['images'] = images
    dog['type'] = animal_type

# Fetch existing records from Supabase
def fetch_existing_animals():
    response = supabase.table(table_to_update).select('*').eq('"dog/cat"', 'dog').execute()
    if response.data:
        return {item['link']: item for item in response.data}
    return {}

# Compare and update database
def update_database_with_scraped_data(animals):
    existing_animals = fetch_existing_animals()
    animals_to_insert = []
    animals_to_update = []
    existing_links = set(existing_animals.keys())

    # Identify animals for insertion and updating
    for dog in dogs:
        link = dog['link']
        if link in existing_links:
            # Check if the data has changed
            existing_animal = existing_animals[link]
            if dog['tags'] != existing_animal.get('tags'):
                animals_to_update.append(dog)
            existing_links.remove(link)
        else:
            animals_to_insert.append(dog)

    # Animals remaining in existing_links are to be deleted
    animals_to_delete = list(existing_links)

    # Perform database operations
    for animal in animals_to_insert:
        supabase.table(table_to_update).insert({
            'name': animal['name'],
            'tags': animal['tags'],
            'link': animal['link'],
            'images': animal['images'],  # Insert filtered images
            'dog/cat': animal['type']
        }).execute()

    for animal in animals_to_update:
        supabase.table(table_to_update).update({
            'tags': animal['tags'],
            'images': animal['images'],  # Update images
            'dog/cat': animal['type']
        }).eq('link', animal['link']).execute()

    for link in animals_to_delete:
        supabase.table(table_to_update).delete().eq('link', link).execute()

    pprint.pprint(animals_to_delete)
    pprint.pprint(animals_to_insert)
    pprint.pprint(animals_to_update)

# Run the update
update_database_with_scraped_data(dogs)
