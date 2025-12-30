#!/usr/bin/env python3
"""
Add geographic coordinates to incunabula printing locations.
"""

import json
import re
from pathlib import Path

INPUT_FILE = Path(__file__).parent.parent / "viz/public/incunabula_books.json"
OUTPUT_FILE = INPUT_FILE  # Overwrite

# Major 15th century printing centers with coordinates
CITY_COORDS = {
    # Italy
    "Venice": (45.4408, 12.3155),
    "Rome": (41.9028, 12.4964),
    "Milan": (45.4642, 9.1900),
    "Florence": (43.7696, 11.2558),
    "Naples": (40.8518, 14.2681),
    "Bologna": (44.4949, 11.3426),
    "Ferrara": (44.8381, 11.6199),
    "Padua": (45.4064, 11.8768),
    "Verona": (45.4384, 10.9916),
    "Brescia": (45.5416, 10.2118),
    "Mantua": (45.1564, 10.7914),
    "Pavia": (45.1847, 9.1582),
    "Vicenza": (45.5455, 11.5354),
    "Treviso": (45.6669, 12.2420),
    "Modena": (44.6471, 10.9252),
    "Perugia": (43.1107, 12.3908),
    "Siena": (43.3188, 11.3308),
    "Parma": (44.8015, 10.3279),
    "Reggio Emilia": (44.6989, 10.6297),
    "Cremona": (45.1333, 10.0333),
    "Piacenza": (45.0526, 9.6930),
    "Lucca": (43.8376, 10.4951),
    "Savona": (44.3091, 8.4772),
    "Genoa": (44.4056, 8.9463),
    "Turin": (45.0703, 7.6869),
    "Aquila": (42.3498, 13.3995),
    "Messina": (38.1938, 15.5540),
    "Palermo": (38.1157, 13.3615),

    # Germany
    "Mainz": (49.9929, 8.2473),
    "Cologne": (50.9375, 6.9603),
    "Nuremberg": (49.4521, 11.0767),
    "Augsburg": (48.3705, 10.8978),
    "Strassburg": (48.5734, 7.7521),
    "Strasbourg": (48.5734, 7.7521),
    "Leipzig": (51.3397, 12.3731),
    "Basel": (47.5596, 7.5886),
    "Ulm": (48.4011, 9.9876),
    "Bamberg": (49.8988, 10.9028),
    "Speyer": (49.3173, 8.4411),
    "Erfurt": (50.9787, 11.0328),
    "Heidelberg": (49.3988, 8.6724),
    "Lubeck": (53.8655, 10.6866),
    "Lübeck": (53.8655, 10.6866),
    "Magdeburg": (52.1205, 11.6276),
    "Reutlingen": (48.4919, 9.2108),
    "Memmingen": (47.9838, 10.1807),
    "Passau": (48.5665, 13.4319),
    "Ingolstadt": (48.7665, 11.4258),
    "Munich": (48.1351, 11.5820),
    "Freiburg": (47.9990, 7.8421),
    "Hagenau": (48.8156, 7.7906),
    "Esslingen": (48.7433, 9.3048),
    "Wittenberg": (51.8661, 12.6502),
    "Frankfurt": (50.1109, 8.6821),
    "Constance": (47.6779, 9.1732),

    # France
    "Paris": (48.8566, 2.3522),
    "Lyons": (45.7640, 4.8357),
    "Lyon": (45.7640, 4.8357),
    "Rouen": (49.4432, 1.0999),
    "Toulouse": (43.6047, 1.4442),
    "Poitiers": (46.5802, 0.3404),
    "Troyes": (48.2973, 4.0744),
    "Caen": (49.1829, -0.3707),
    "Angers": (47.4784, -0.5632),
    "Albi": (43.9298, 2.1480),
    "Avignon": (43.9493, 4.8055),
    "Grenoble": (45.1885, 5.7245),
    "Chambéry": (45.5646, 5.9178),
    "Abbeville": (50.1057, 1.8362),
    "Dijon": (47.3220, 5.0415),
    "Nantes": (47.2184, -1.5536),
    "Orléans": (47.9029, 1.9039),
    "Chablis": (47.8144, 3.8017),

    # Low Countries
    "Antwerp": (51.2194, 4.4025),
    "Bruges": (51.2093, 3.2247),
    "Brussels": (50.8503, 4.3517),
    "Ghent": (51.0543, 3.7174),
    "Louvain": (50.8798, 4.7005),
    "Leuven": (50.8798, 4.7005),
    "Deventer": (52.2551, 6.1639),
    "Gouda": (52.0115, 4.7104),
    "Delft": (52.0116, 4.3571),
    "Leiden": (52.1601, 4.4970),
    "Zwolle": (52.5168, 6.0830),
    "Utrecht": (52.0907, 5.1214),
    "'s-Hertogenbosch": (51.6978, 5.3037),
    "Hertogenbosch": (51.6978, 5.3037),

    # Spain & Portugal
    "Seville": (37.3891, -5.9845),
    "Barcelona": (41.3851, 2.1734),
    "Salamanca": (40.9688, -5.6631),
    "Valencia": (39.4699, -0.3763),
    "Valladolid": (41.6523, -4.7245),
    "Burgos": (42.3439, -3.6969),
    "Toledo": (39.8628, -4.0273),
    "Zaragoza": (41.6488, -0.8891),
    "Lisbon": (38.7223, -9.1393),
    "Coimbra": (40.2033, -8.4103),
    "Leiria": (39.7436, -8.8071),
    "Braga": (41.5454, -8.4265),
    "Pamplona": (42.8125, -1.6458),
    "Granada": (37.1773, -3.5986),
    "Alcalá": (40.4818, -3.3635),
    "Alcalá de Henares": (40.4818, -3.3635),
    "Saragossa": (41.6488, -0.8891),
    "Segovia": (40.9429, -4.1088),
    "Zamora": (41.5034, -5.7467),
    "Palencia": (42.0095, -4.5271),
    "Murcia": (37.9922, -1.1307),
    "Medina del Campo": (41.3119, -4.9139),
    "Monterey": (42.0781, -7.4517),
    "Híjar": (41.1794, -0.4472),

    # England
    "London": (51.5074, -0.1278),
    "Westminster": (51.4975, -0.1357),
    "Oxford": (51.7520, -1.2577),
    "Cambridge": (52.2053, 0.1218),
    "St Albans": (51.7526, -0.3410),
    "York": (53.9591, -1.0815),

    # Switzerland
    "Zurich": (47.3769, 8.5417),
    "Geneva": (46.2044, 6.1432),
    "Bern": (46.9480, 7.4474),

    # Austria & Central Europe
    "Vienna": (48.2082, 16.3738),
    "Salzburg": (47.8095, 13.0550),
    "Innsbruck": (47.2692, 11.4041),
    "Prague": (50.0755, 14.4378),
    "Brno": (49.1951, 16.6068),
    "Pilsen": (49.7384, 13.3736),
    "Kuttenberg": (49.9489, 15.2683),
    "Winterberg": (49.0596, 13.5294),
    "Cracow": (50.0647, 19.9450),
    "Krakow": (50.0647, 19.9450),
    "Budapest": (47.4979, 19.0402),

    # Scandinavia
    "Copenhagen": (55.6761, 12.5683),
    "Stockholm": (59.3293, 18.0686),
    "Odense": (55.4038, 10.4024),

    # More German cities
    "Würzburg": (49.7913, 9.9534),
    "Wurzburg": (49.7913, 9.9534),
    "Urach": (48.4917, 9.4000),
    "Tübingen": (48.5216, 9.0576),
    "Tubingen": (48.5216, 9.0576),
    "Rostock": (54.0924, 12.0991),
    "Pforzheim": (48.8922, 8.6947),
    "Marienthal": (50.0167, 8.0167),
    "Blaubeuren": (48.4119, 9.7847),
    "Eichstätt": (48.8922, 11.1839),
    "Stendal": (52.6047, 11.8594),
    "Münster": (51.9607, 7.6261),
    "Merseburg": (51.3608, 11.9928),

    # More Low Countries
    "Haarlem": (52.3874, 4.6462),
    "Schoonhoven": (51.9450, 4.8514),
    "Alost": (50.9378, 4.0403),
    "Aalst": (50.9378, 4.0403),
    "Hasselt": (50.9307, 5.3375),
    "Culemborg": (51.9550, 5.2286),

    # More Spanish cities
    "Lérida": (41.6176, 0.6200),
    "Lerida": (41.6176, 0.6200),
    "Lleida": (41.6176, 0.6200),
    "Huete": (40.1489, -2.6903),
    "Montserrat": (41.5944, 1.8378),
    "Tarragona": (41.1189, 1.2445),
    "Gerona": (41.9794, 2.8214),
    "Girona": (41.9794, 2.8214),
    "Tortosa": (40.8125, 0.5216),

    # More French cities
    "Vienne": (45.5250, 4.8747),
    "Besançon": (47.2378, 6.0241),
    "Cluny": (46.4344, 4.6592),
    "Angoulême": (45.6486, 0.1562),
    "La Réole": (44.5803, -0.0403),
    "Limoges": (45.8336, 1.2611),
    "Périgueux": (45.1847, 0.7211),
    "Béziers": (43.3442, 3.2158),
    "Perpignan": (42.6887, 2.8948),

    # More Italian cities
    "Pescia": (43.9019, 10.6892),
    "Aquila": (42.3498, 13.3995),
    "L'Aquila": (42.3498, 13.3995),
    "Gaeta": (41.2114, 13.5714),
    "Casale Monferrato": (45.1333, 8.4500),
    "Novi Ligure": (44.7603, 8.7869),
    "Ascoli Piceno": (42.8536, 13.5750),
    "Trani": (41.2761, 16.4167),
    "Cosenza": (39.2989, 16.2517),
    "Colle": (43.4222, 11.1114),
    "Colle di Val d'Elsa": (43.4222, 11.1114),

    # Eastern Europe
    "Danzig": (54.3520, 18.6466),
    "Gdansk": (54.3520, 18.6466),
    "Breslau": (51.1079, 17.0385),
    "Wroclaw": (51.1079, 17.0385),
    "Riga": (56.9496, 24.1052),
    "Königsberg": (54.7104, 20.4522),
    "Vilnius": (54.6872, 25.2797),

    # Special locations
    "Subiaco": (41.9253, 13.0931),
    "Fivizzano": (44.2333, 10.1167),
    "Mondovi": (44.3930, 7.8214),
    "Savigliano": (44.6469, 7.6567),
    "Trevi": (42.8786, 12.7458),
    "Cividale": (46.0931, 13.4308),
    "Como": (45.8081, 9.0852),
    "Soncino": (45.4000, 9.8833),
    "Casal Maggiore": (44.9833, 10.4167),
    "Sant'Orso": (45.7369, 7.3269),
    "Santorso": (45.7369, 7.3269),
    "Caselle": (45.1781, 7.6506),
    "Scandiano": (44.5983, 10.6903),
    "Nonantola": (44.6778, 11.0389),
}

def normalize_place(place):
    """Clean up place name for matching."""
    if not place:
        return None
    # Remove brackets and question marks
    place = re.sub(r'[\[\]?]', '', place)
    place = place.strip()
    # Handle "X or Y" patterns - take first
    if ' or ' in place:
        place = place.split(' or ')[0].strip()
    return place

def main():
    print("Loading data...")
    with open(INPUT_FILE) as f:
        data = json.load(f)
    print(f"Loaded {len(data):,} records")

    # Add coordinates
    matched = 0
    unmatched_places = {}

    for record in data:
        place = record.get("place", "")
        normalized = normalize_place(place)

        if normalized and normalized in CITY_COORDS:
            lat, lon = CITY_COORDS[normalized]
            record["lat"] = lat
            record["lon"] = lon
            matched += 1
        else:
            # Try partial matching for common variations
            found = False
            if normalized:
                for city, coords in CITY_COORDS.items():
                    if city.lower() in normalized.lower() or normalized.lower() in city.lower():
                        record["lat"] = coords[0]
                        record["lon"] = coords[1]
                        matched += 1
                        found = True
                        break

            if not found and normalized:
                unmatched_places[normalized] = unmatched_places.get(normalized, 0) + 1

    print(f"Matched: {matched:,} ({100*matched/len(data):.1f}%)")

    # Show top unmatched
    if unmatched_places:
        top_unmatched = sorted(unmatched_places.items(), key=lambda x: -x[1])[:20]
        print("\nTop unmatched places:")
        for place, count in top_unmatched:
            print(f"  {place}: {count}")

    # Save
    print(f"\nSaving to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, "w") as f:
        json.dump(data, f)
    print("Done!")

if __name__ == "__main__":
    main()
