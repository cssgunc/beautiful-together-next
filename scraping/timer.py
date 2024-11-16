import schedule
import time
import os

def run_scrapers():
    # os.system("python dogscrape.py")
    # os.system("python catscrape.py")
    print("30 seconds")

# Schedule the scrapers to run every 24 hours
#schedule.every(24).hours.do(run_scrapers)
schedule.every(10).seconds.do(run_scrapers)

while True:
    schedule.run_pending()
    time.sleep(1)