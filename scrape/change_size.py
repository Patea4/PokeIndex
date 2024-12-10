import os
from PIL import Image

def change_size():
    for file in os.listdir("scrape/sprites"):
        print(file)
        img = Image.open(f"scrape/sprites/{file}")
        img = img.resize((256, 256))
        img.save(f"scrape/sprites/{file}")


def remove_empty_space_from_top():
    # removes empty lines from top of image

    for file in os.listdir("scrape/sprites"):
        img = Image.open(f"scrape/sprites/{file}")
        img = img.convert("RGBA")

        pixels = img.load()

        empty_row = 0

        for y in range(img.height):
            for x in range(img.width):
                if pixels[x, y][3] > 0:
                    empty_row = y
                    break
            if empty_row > 0:
                break
        if empty_row > 0:
            img = img.crop((0, empty_row, img.width, img.height))
            img.save(f"scrape/sprites/{file}")

def remove_empty_space_from_bottom():

    for file in os.listdir("scrape/sprites"):
        img = Image.open(f"scrape/sprites/{file}")
        img = img.convert("RGBA")

        pixels = img.load()

        empty_row = 0

        for y in range(img.height-1, -1, -1):
            for x in range(img.width):
                if pixels[x, y][3] > 0:
                    empty_row = y
                    break
            if empty_row > 0:
                break
        if empty_row > 0:
            img = img.crop((0, 0, img.width, empty_row))
            img.save(f"scrape/sprites/{file}")

def remove_empty_space_from_left():

    for file in os.listdir("scrape/sprites"):
        img = Image.open(f"scrape/sprites/{file}")
        img = img.convert("RGBA")

        pixels = img.load()

        empty_column = 0

        for x in range(img.width):
            for y in range(img.height):
                if pixels[x, y][3] > 0:
                    empty_column = x
                    break
            if empty_column > 0:
                break
        if empty_column > 0:
            img = img.crop((empty_column, 0, img.width, img.height))
            img.save(f"scrape/sprites/{file}")

def remove_empty_space_from_right():
    for file in os.listdir("scrape/sprites"):
        img = Image.open(f"scrape/sprites/{file}")
        img = img.convert("RGBA")

        pixels = img.load()

        empty_column = 0

        for x in range(img.width-1, -1, -1):
            for y in range(img.height):
                if pixels[x, y][3] > 0:
                    empty_column = x
                    break
            if empty_column > 0:
                break
        if empty_column > 0:
            img = img.crop((0, 0, empty_column, img.height))
            img.save(f"scrape/sprites/{file}")

def remove_empty_space():
    remove_empty_space_from_top()
    remove_empty_space_from_bottom()
    remove_empty_space_from_left()
    remove_empty_space_from_right()


if __name__ == "__main__":
    change_size()
    remove_empty_space()
    change_size()