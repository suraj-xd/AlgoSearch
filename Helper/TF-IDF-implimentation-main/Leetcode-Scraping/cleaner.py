final_arr = []

with open("lc.txt", "r") as file:
    for line in file:
        final_arr.append(line)


final_arr = list(set(final_arr))

def remove_pattern(arr, pattern):
    new_arr = []
    for line in arr:
        if pattern not in line:
            new_arr.append(line)
        else:
            pass

    return new_arr

final_arr = remove_pattern(final_arr, "/solution")

print(len(final_arr))

with open("lc_problems.txt", "a") as file:
    for line in final_arr:
        file.write(line)
