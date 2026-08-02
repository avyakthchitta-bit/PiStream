import os
import mpmath
print("=== Pi chunk generator v2 ===")

CHUNK_SIZE = 100000

CHUNK_FOLDER = "data/chunks"


os.makedirs(CHUNK_FOLDER, exist_ok=True)


chunks = sorted(
    file for file in os.listdir(CHUNK_FOLDER)
    if file.startswith("pi_") and file.endswith(".txt")
)


if chunks:
    last_chunk = chunks[-1]

    last_position = int(
        last_chunk.replace("pi_", "")
                  .replace(".txt", "")
    )

    next_position = last_position + CHUNK_SIZE

else:
    next_position = 0


filename = (
    f"{CHUNK_FOLDER}/"
    f"pi_{next_position:06d}.txt"
)


if os.path.exists(filename):
    print("Chunk already exists:", filename)
    exit(0)


print("Generating:", filename)


# Calculate enough digits
mpmath.mp.dps = next_position + CHUNK_SIZE + 10


pi_digits = str(mpmath.pi)

# Remove decimal point
pi_digits = pi_digits.replace(".", "")


chunk = pi_digits[
    next_position:
    next_position + CHUNK_SIZE
]


if len(chunk) != CHUNK_SIZE:
    raise Exception(
        f"Expected {CHUNK_SIZE} digits, got {len(chunk)}"
    )


with open(filename, "w") as file:
    file.write(chunk)


print(
    f"Created {filename} "
    f"with {len(chunk)} digits"
)