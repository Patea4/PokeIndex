from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import requests
import time
from dotenv import load_dotenv
load_dotenv()
URI = os.getenv("MONGODB_URI")



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
    pokemon["generation"] = species["generation"]["name"] # needs to be updated
    pokemon["evolutions"] = evolutions
    pokemon["description"] = get_latest_english_flavor_text(species)
    types = []
    for t in pokemon["types"]:
        types.append(t["type"]["name"])
    pokemon["types"] = types

    return pokemon

def send_request(url: str):
    r = requests.get(url)
    while r.status_code != 200:
        print("Retrying... " + url)
        r = requests.get(url)
    return r.json()

def populate_db(collection):
    db.pokemon.delete_many({})
    with open("scrape/pokemon_names_id.txt", "r") as f:
        names = f.read().splitlines()
        pokemons = {}
        for name in names:
            pokemond_id = name.split(",")[0]
            while pokemond_id[0] == "0":
                pokemond_id = pokemond_id[1:]
            pokemons[name] = get_pokemon(pokemond_id)
            print("Got " + name.split(",")[1])
        pokemons = get_evolution_ids(pokemons)
        for name, pokemon in pokemons.items():
            db.pokemon.insert_one(pokemon)
            print("Inserted:" + name)



def load_pokemons():
    name_to_id = {}
    with open("scrape/pokemon_names_id.txt", "r") as f:
        for line in f:
            id_str, name = line.strip().lower().split(",", 1)
            name_to_id[name] = id_str
    return name_to_id

def get_evolution_ids(pokemons):
    name_to_id = load_pokemons()
    for name, pokemon in pokemons.items():
        if pokemon["evolutions"]:
            evolution_ids = []
            for evolution in pokemon["evolutions"]:
                if evolution == "farfetchd":
                    evolution = "Farfetch'd"
                elif evolution == "mime-jr":
                    evolution = "Mime Jr."
                elif evolution == "mr-mime":
                    evolution = "Mr. Mime"
                elif evolution == "mr-rime":
                    evolution = "Mr. Rime"
                elif evolution == "flabebe":
                    evolution = "FlabÃ©bÃ©"
                elif evolution == "tapu-koko":
                    evolution = "Tapu Koko"
                elif evolution == "tapu-lele":
                    evolution = "Tapu Lele"
                elif evolution == "tapu-bulu":
                    evolution = "Tapu Bulu"
                elif evolution == "tapu-fini":
                    evolution = "Tapu Fini"

                evolution_id = name_to_id.get(evolution)
                if evolution_id:
                    evolution_ids.append(evolution_id)
                else:
                    print(f"Warning: Evolution '{evolution}' for Pokémon '{name}' not found in mapping.")
                    evolution_ids.append(None)
            pokemon["evolutions"] = evolution_ids
    return pokemons



def get_latest_english_flavor_text(species):
    """
    Extracts the most recent English flavor text from the species data.

    Parameters:
    - species (dict): A dictionary containing the species data with a key "flavor_text_entries",
                      which is a list of flavor text entry dictionaries.

    Returns:
    - str or None: The most recent English flavor text if available, otherwise None.
    """

    # 1. Define the ordered list of version names from oldest to newest.
    #    Each sublist contains all version.name's that correspond to the same generation.
    #    Replace the placeholders with actual API version names.
    ordered_versions = [
        ['red', 'blue'],                            # Generation I
        ['yellow'],                                 # Generation I
        ['gold', 'silver'],                         # Generation II
        ['crystal'],                                # Generation II
        ['ruby', 'sapphire'],                       # Generation III
        ['firered', 'leafgreen'],                   # Generation III
        ['emerald'],                                # Generation III
        ['diamond', 'pearl'],                       # Generation IV
        ['platinum'],                               # Generation IV
        ['heartgold', 'soulsilver'],                # Generation IV
        ['black', 'white'],                         # Generation V
        ['black-2', 'white-2'],                     # Generation V
        ['x', 'y'],                                 # Generation VI
        ['omega-ruby', 'alpha-sapphire'],           # Generation VI
        ['sun', 'moon'],                            # Generation VII
        ['ultra-sun', 'ultra-moon'],                # Generation VII
        ['lets-go-pikachu', 'lets-go-eevee'],       # Generation VII
        ['sword', 'shield'],                        # Generation VIII
        ['brilliant-diamond', 'shining-pearl'],     # Generation VIII
        ['legends-arceus'],                         # Generation VIII
        ['scarlet', 'violet'],                      # Generation VIII
    ]

    # 2. Create a mapping from version name to its order index.
    #    This helps in determining which version is more recent.
    version_order = {}
    for index, version_group in enumerate(ordered_versions, 1):
        for version_name in version_group:
            version_order[version_name] = index

    # 3. Initialize variables to track the latest English flavor text.
    latest_flavor_text = None
    latest_version_order = -1

    # 4. Iterate through each flavor text entry.
    for entry in species.get('flavor_text_entries', []):
        # Check if the language is English.
        if entry.get('language', {}).get('name') == 'en':
            version_name = entry.get('version', {}).get('name')

            # Check if the version name exists in our ordered_versions list.
            if version_name in version_order:
                current_order = version_order[version_name]

                # Update if this version is more recent than the current latest.
                if current_order > latest_version_order:
                    latest_version_order = current_order
                    latest_flavor_text = entry.get('flavor_text')
            else:
                # Log a warning if the version is not found in the ordered_versions list.
                print(f"Warning: Version '{version_name}' not found in ordered_versions list.")

    return latest_flavor_text

if __name__ == "__main__":
    client = MongoClient(URI, server_api=ServerApi('1'))
    db = client["PokemonDB"]
    collection = db["pokemon"]

    populate_db(collection)

