import requests
from bs4 import BeautifulSoup

# Fetch the webpage

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

print(get_tags(url = "https://beautifultogethersanctuary.com/dog/bear-5/"))