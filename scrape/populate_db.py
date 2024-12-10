from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import requests
from dotenv import load_dotenv
load_dotenv()
URI = os.getenv("DB_URL")



def get_pokemon(name: str):
    pokemon = send_request(f"https://pokeapi.co/api/v2/pokemon/{name}/")
    species = send_request(f"https://pokeapi.co/api/v2/pokemon-species/{name}/")
    evolution_chain = send_request(species["evolution_chain"]["url"])

    evolutions = [evolution_chain["chain"]["species"]["name"]]
    chain = evolution_chain["chain"]["evolves_to"]
    while chain:
        evolutions.append(chain[0]["species"]["name"])
        chain = chain[0]["evolves_to"]

    pokemon["color"] = species["color"]["name"]
    pokemon["evolutions"] = evolutions

    return pokemon

def send_request(url: str):
    r = requests.get(url)
    while r.status_code != 200:
        print("Retrying... " + url)
        r = requests.get(url)
    return r.json()

def populate_db(collection):
    with open("scrape/pokemon_names_id.txt", "r") as f:
        names = f.read().splitlines()
        for name in names:
            pokemond_id = name.split(",")[0]
            while pokemond_id[0] == "0":
                pokemond_id = pokemond_id[1:]
            pokemon = get_pokemon(pokemond_id)
            collection.insert_one(pokemon)
            print("Inserted:", pokemon["name"])


if __name__ == "__main__":
    client = MongoClient(URI, server_api=ServerApi('1'))
    db = client["PokemonDB"]
    collection = db["pokemon"]

    populate_db(collection)

