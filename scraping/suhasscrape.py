import requests
from bs4 import BeautifulSoup

# URL of the page to scrape
url = "https://beautifultogethersanctuary.com/available-dogs/"

# Send a GET request to the page
response = requests.get(url)

# Parse the page content
soup = BeautifulSoup(response.content, 'html.parser')

# Find all <a> tags that contain dog names
dog_links = soup.find_all('a', title=True)

# Extract and print the dog names from the 'title' attribute
for dog in dog_links:
    print(dog['title'])


# Find all image tags and extract URLs
image_urls = [img['src'] for img in soup.find_all('img') if 'src' in img.attrs]

# Print the URLs
for url in image_urls:
    print(url)

print("This is a narrow no-break space:\u202Fhere.")
