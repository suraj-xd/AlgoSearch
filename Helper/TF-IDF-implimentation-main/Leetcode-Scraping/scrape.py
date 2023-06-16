import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

# Selenium Webdriver
s = Service("chromedriver.exe")
driver = webdriver.Chrome(service = s)


page_url = "https://leetcode.com/problemset/all/?page="



def get_all_links(url):
    driver.get(url)
    time.sleep(7)

    arr = driver.find_elements(By.TAG_NAME, "a")

    links = []
    pattern = "/problems"

    for i in arr:
        try:
            href = i.get_attribute('href')
            if(pattern in href):
                links.append(href)
        except:
            pass
    
    links = list(set(links))

    return links


# Calling get links for all 55 pages
for j in range(11):
    final_links = []
    for i in range(1, 6):
        url = page_url + str(i + (j*5))
        print(url)
        final_links += get_all_links(url)
        final_links = list(set(final_links))

    # print(len(final_links))


    # Now we can store these links in a txt file

    # Open txt file lc.txt in a mode
    with open('lc.txt', 'a')as file:
        for i in final_links:
            file.write(i)
            file.write('\n')

driver.quit()