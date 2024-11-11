import requests
from bs4 import BeautifulSoup

# Define the URL for the 'Available Dogs' page and 'Available Cats' page
dogs_url = 'https://beautifultogethersanctuary.com/available-dogs/'
cats_url = 'https://beautifultogethersanctuary.com/available-cats/'

# Function to scrape image URLs for dogs
def get_dog_image_urls():
    response = requests.get(dogs_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all img tags inside div with class "col-12 Bzl-dog-img"
    dog_images = []
    for img_tag in soup.find_all('img', {'src': True}):
        parent_div = img_tag.find_parent('div', class_='col-12 Bzl-dog-img')
        if parent_div:
            img_url = img_tag['src']
            # Add image URL to list
            dog_images.append(img_url)
    
    return dog_images

# Function to scrape image URLs for cats
def get_cat_image_urls():
    response = requests.get(cats_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all img tags inside div with class "col-12 Bzl-dog-img"
    cat_images = []
    for img_tag in soup.find_all('img', {'src': True}):
        parent_div = img_tag.find_parent('div', class_='col-12 Bzl-dog-img')
        if parent_div:
            img_url = img_tag['src']
            # Add image URL to list
            cat_images.append(img_url)
    
    return cat_images

# Call the functions and print the results
dog_image_urls = get_dog_image_urls()
cat_image_urls = get_cat_image_urls()

# Print the lists of dog and cat image URLs
print("Dog Image URLs:", dog_image_urls)
print("Cat Image URLs:", cat_image_urls)