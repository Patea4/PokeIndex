import os
import requests


def get_all():
    alternate_url = ["scarlet-violet", "sun-moon", "x-y"]

    with open("scrape/pokemon_names.txt", "r") as f:
        names = f.read().splitlines()
        for name in names:
            name = name.lower().replace(" ", "-").replace(".", "").replace("'", "")
            url = f"https://img.pokemondb.net/sprites/sword-shield/normal/{name}.png"
            r = requests.get(url)
            if r.status_code == 200:
                with open(f"scrape/sprites/{name}.png", "wb") as f:
                    f.write(r.content)
            elif r.status_code == 404:
                for alt in alternate_url:
                    url = f"https://img.pokemondb.net/sprites/{alt}/normal/{name}.png"
                    r = requests.get(url)
                    if r.status_code == 200:
                        with open(f"scrape/sprites/{name}.png", "wb") as f:
                            f.write(r.content)
                        break
            else:
                print(f"Error: {name} - {r.status_code}")
                continue
            print("Downloaded:", name)



if __name__ == "__main__":
    get_all()