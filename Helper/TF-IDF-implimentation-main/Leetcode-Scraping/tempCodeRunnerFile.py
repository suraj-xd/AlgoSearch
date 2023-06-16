        a_tags = div.find_elements(By.TAG_NAME, "a")
        for a in a_tags:
            if a.text:
                print(a.text)
