from bs4 import BeautifulSoup
import requests
import pprint

url = "https://beautifultogethersanctuary.com/available-cats/"
html_text = requests.get(url)

soup = BeautifulSoup(html_text.content, 'html.parser')

images = soup.find_all('img')
#print(images)

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
pprint.pprint(values_dict)

