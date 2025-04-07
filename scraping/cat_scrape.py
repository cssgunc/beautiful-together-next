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
# table_to_update = 'testing'

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

# Function to scrape tags from each cat page
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

# Scrape images for each cat page
def get_images(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    img_list = []
    # TESTING PURPOSES

    # Find all images for the cat on its page
    # Note: not sure why, but the class here is also dogPics
    for img in soup.find_all('a', class_='dogPics'):
        img_url = img['href']
        
        # If the image starts with '/', it's relative, so append the base URL
        if img_url.startswith('/'):
            img_url = url + img_url

       
        img_list.append(img_url)

        img_url_arr = img_url.split('.')
        img_url_arr[-2] = re.sub('-(scaled|rotated|200x200|300x300)$', '', img_url_arr[-2])
        
        base = '.'.join(img_url_arr[:-1])
        ext = img_url_arr[-1]

    

        img_300 = f"{base}-300x300.{ext}"
        img_200 = f"{base}-200x200.{ext}"
        if requests.head(img_300).status_code == 200:
            img_list.append(img_300)
        elif requests.head(img_200).status_code == 200:
            img_list.append(img_200)
        else:
            img_list.append(img_url)

        
    
    return img_list

# Store fields for each cat and fetch their images
for cat in cats:
    # Scrape tags and images from individual cat page
    tags = get_tags(cat['link'])
    images = get_images(cat['link'])
    
    animal_type = 'cat'
    cat['tags'] = tags
    cat['images'] = images
    cat['type'] = animal_type

# Fetch existing records from Supabase
def fetch_existing_animals():
    response = supabase.table(table_to_update).select('*').eq('"dog/cat"', 'cat').execute()
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
        supabase.table(table_to_update).insert({
            'name': animal['name'],
            'tags': animal['tags'],
            'link': animal['link'],
            'images': animal['images'],  # Insert filtered images
            'dog/cat': 'cat'
        }).execute()

    for animal in animals_to_update:
        supabase.table(table_to_update).update({
            'tags': animal['tags'],
            'images': animal['images'],  # Update images
            'dog/cat': 'cat'
        }).eq('link', animal['link']).execute()

    for link in animals_to_delete:
        supabase.table(table_to_update).delete().eq('link', link).execute()

    pprint.pprint(animals_to_delete)
    pprint.pprint(animals_to_insert)
    pprint.pprint(animals_to_update)

# Run the update
update_database_with_scraped_data(cats)
