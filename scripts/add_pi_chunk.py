import os

CHUNK_SIZE = 100000

folder = "data/chunks"

os.makedirs(folder, exist_ok=True)

files = sorted(
    f for f in os.listdir(folder)
    if f.startswith("pi_") and f.endswith(".txt")
)

if files:
    last = files[-1]
    number = int(last[3:9])
else:
    number = 0

next_start = number + CHUNK_SIZE

filename = f"{folder}/pi_{next_start:06d}.txt"

print("Creating:", filename)

# placeholder
# replace this later with real digit generation
digits = "0" * CHUNK_SIZE

with open(filename, "w") as f:
    f.write(digits)

print("Done")