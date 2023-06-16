import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
from bs4 import BeautifulSoup

# Setting up the driver
s = Service("chromedriver.exe")
driver = webdriver.Chrome(service = s)

# reference classes to extract req data from each problem page
head_class = ".text-xs.font-medium.capitalize"
body_class = ".px-5.pt-4"
index = 1
qdata_folder = "qData"



def add_text_to_index(text):
    index_path = os.path.join(qdata_folder, "C:/Users/suraj/Downloads/TF-IDF-implimentation-main/TF-IDF-implimentation-main/Leetcode-Scraping/qData/index1.txt")
    with open(index_path, "a") as file:
        file.write(text)
        file.write('\n')


def add_link_to_Qlink(text):
    Qlink_path = os.path.join(qdata_folder, "C:/Users/suraj/Downloads/TF-IDF-implimentation-main/TF-IDF-implimentation-main/Leetcode-Scraping/qData/Qlink1.txt")
    with open(Qlink_path, "a", encoding="utf-8", errors="ignore") as file:
        file.write(text)

def create_file_add_text(file_name, text):
    folder_path = os.path.join(qdata_folder, file_name)
    os.makedirs(folder_path, exist_ok=True)

    file_path = os.path.join(folder_path, file_name + ".txt")
    with open(file_path, "w", encoding="utf-8", errors="ignore") as new_file:
        new_file.write(text)



def getProbData(link, index):
    try:
        driver.get(link)
        # time.sleep(1)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, body_class)))
        time.sleep(1)
        a_tags = driver.find_elements(By.CSS_SELECTOR, ".mr-4.rounded-xl.py-1.px-2")
        for a in a_tags:
            print(a.text)
        head = driver.find_element(By.CSS_SELECTOR, head_class)
        body = driver.find_element(By.CSS_SELECTOR, body_class)
        print(head.text)
        if(head.text):
            add_text_to_index(head.text)
            add_link_to_Qlink(link)
            create_file_add_text(str(index), body.text)
        time.sleep(2)
        return True
    except Exception as e:
        print(e)
        return False
    

# extracting all links that we scraped and cleaned
links = []

with open("C:/Users/suraj/Downloads/TF-IDF-implimentation-main/TF-IDF-implimentation-main/Leetcode-Scraping/lc_problems.txt", "r") as file:
    for line in file:
        links.append(line)

# Extracting data from each link and storing them in files in a new folder named qdata.
for link in links:
    is_found = getProbData(link, index)

    if(is_found):
        index += 1

print(index)
driver.quit()
