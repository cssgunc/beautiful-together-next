# skeleton code from nicholasscrape.py
import requests
from bs4 import BeautifulSoup

# What if data of dogs changes?

def get_tags(url) -> dict[str, str]:
    # Fetch the webpage
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

def get_images(url) -> list[str]:
    # Fetch the webpage
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    # initialize list of image links
    images: list[str] = []
    # find all images on webpage
    for image_link in soup.find_all('a', class_='dogPics'):
        # getting each of the links from the profile page
        link = image_link.get("href")
        # adding the link to the output list
        images.append(link)

    return images

print(get_tags_and_images(url = "https://beautifultogethersanctuary.com/dog/bella-9/"))