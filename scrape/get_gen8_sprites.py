import os
import requests


def get_all():
    alternate_url = ["scarlet-violet", "sun-moon", "x-y"]

    with open("scrape/pokemon_names_id.txt", "r") as f:
        names = f.read().splitlines()
        for name in names:
            pokemon_id, name = name.split(",")
            while pokemon_id[0] == "0":
                pokemon_id = pokemon_id[1:]
            name = name.lower().replace(" ", "-").replace(".", "").replace("'", "")
            url = f"https://img.pokemondb.net/sprites/sword-shield/normal/{name}.png"
            r = requests.get(url)
            if r.status_code == 200:
                with open(f"scrape/sprites/{pokemon_id}.png", "wb") as f:
                    f.write(r.content)
            elif r.status_code == 404:
                for alt in alternate_url:
                    url = f"https://img.pokemondb.net/sprites/{alt}/normal/{name}.png"
                    r = requests.get(url)
                    if r.status_code == 200:
                        with open(f"scrape/sprites/{pokemon_id}.png", "wb") as f:
                            f.write(r.content)
                        break
            else:
                print(f"Error: {name} - {r.status_code}")
                continue



if __name__ == "__main__":
    get_all()