import os
import mpmath


CHUNK_SIZE = 100000

CHUNK_FOLDER = "data/chunks"


os.makedirs(CHUNK_FOLDER, exist_ok=True)


# Find existing chunks
chunks = sorted(
    file for file in os.listdir(CHUNK_FOLDER)
    if file.startswith("pi_") and file.endswith(".txt")
)


if chunks:
    last_chunk = chunks[-1]

    start_position = int(
        last_chunk.replace("pi_", "")
                  .replace(".txt", "")
    )

    next_position = start_position + CHUNK_SIZE

else:
    next_position = 0


filename = (
    f"{CHUNK_FOLDER}/"
    f"pi_{next_position:06d}.txt"
)


print("Creating:", filename)


# Calculate pi
# +10 gives extra precision safety
mpmath.mp.dps = next_position + CHUNK_SIZE + 10


pi_digits = str(mpmath.pi)

# Remove decimal point
pi_digits = pi_digits.replace(".", "")


chunk = pi_digits[
    next_position:
    next_position + CHUNK_SIZE
]


if len(chunk) < CHUNK_SIZE:
    raise Exception(
        f"Only generated {len(chunk)} digits"
    )


with open(filename, "w") as file:
    file.write(chunk)


print(
    f"Generated {len(chunk)} digits "
    f"starting at {next_position}"
)