# Read the contents of Qlink1.txt and index1.txt
with open("Qlink1.txt", "r") as qlink1_file:
    qlink1_lines = qlink1_file.readlines()

# Strip the newline character from each line in qlink1_lines
qlink1_lines = [line.strip() for line in qlink1_lines]

with open("index1.txt", "r") as index1_file:
    index1_lines = index1_file.readlines()

# Create the output file
output_file = open("output.txt", "w")

# Read Qlink.txt line by line
with open("Qlink.txt", "r") as qlink_file:
    qlink_lines = qlink_file.readlines()
    print(qlink1_lines)
    # Process each line in Qlink.txt
    for qlink_line in qlink_lines:
        qlink_url = qlink_line.strip()

        # Check if the URL exists in Qlink1.txt
        if qlink_url in qlink1_lines:
            qlink_index = qlink1_lines.index(qlink_url)

            # Get the difficulty from index1.txt at the same index
            difficulty = index1_lines[qlink_index].strip()
        else:
            difficulty = "Unknown"

        # Write the difficulty to output.txt
        output_file.write(difficulty + "\n")

# Close the output file
output_file.close()
