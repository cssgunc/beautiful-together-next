from bs4 import BeautifulSoup
import requests

url = "https://beautifultogethersanctuary.com/available-dogs/"
response = requests.get(url)

if response.status_code == 200:
    print("Page fetched successfully!")
else:
    print(f"Failed to fetch page. Status code: {response.status_code}")