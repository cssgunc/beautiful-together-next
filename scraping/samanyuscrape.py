from bs4 import BeautifulSoup
import requests
import re

available_url = "https://beautifultogethersanctuary.com/available-cats/"
response = requests.get(available_url)

soup = BeautifulSoup(response.text, 'html.parser')

heading_elements = soup.find_all('div', class_='col-12 Bzl-dog-heading heading-equal')

cat_names = []
page_urls = []
for element in heading_elements:
    name = element.get_text(strip=True)

    clean_name = re.split(r'\s*Bonded With:|Litter:|\(', name)[0].strip()
    cat_names.append(clean_name)


    a_tag = element.find('a')
    url = a_tag['href']
    page_urls.append(url)


new_dict = {}
for i in range(len(cat_names)):
    new_dict[cat_names[i]] = page_urls[i]


breeds = []
genders = []
for url in page_urls:
    animal_page = requests.get(url)
    animal_soup = BeautifulSoup(animal_page.text, 'html.parser')

    features = animal_soup.find_all('li', class_='features_item')

    for feature in features:
        breed = feature.get_text(strip=True)
        breeds.append(breed[0])

    # breed = animal_soup.find('i', class_='icon icon-cat ttip').text.strip()
    # gender = animal_soup.find_all('i', class_='icon icon-male-sign ttip').text.strip()
    
    # breeds.append(breed)
    # genders.append(gender)

print(breeds)