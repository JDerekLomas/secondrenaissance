#!/usr/bin/env python3
"""
Post-process the Open Library search results to filter down to
records that are plausibly Latin-to-English translations.

Reads: openlibrary_latin_pre1979.csv (raw search results)
Writes: openlibrary_latin_pre1979.csv (filtered, overwriting)
"""

import csv
from pathlib import Path

INPUT_PATH = Path(__file__).parent / "openlibrary_latin_pre1979.csv"
OUTPUT_PATH = INPUT_PATH  # overwrite

# Known Latin authors (original or frequently used name forms)
KNOWN_LATIN_AUTHORS = {
    # Classical (Roman Republic & Empire)
    "virgil", "vergil", "publius vergilius maro", "p. vergilius maro",
    "cicero", "marcus tullius cicero", "m. tullius cicero",
    "ovid", "publius ovidius naso", "p. ovidius naso",
    "horace", "quintus horatius flaccus", "q. horatius flaccus",
    "livy", "titus livius",
    "tacitus", "cornelius tacitus", "p. cornelius tacitus", "publius cornelius tacitus",
    "seneca", "seneca the younger", "lucius annaeus seneca", "l. annaeus seneca",
    "seneca the elder",
    "pliny", "pliny the elder", "pliny the younger", "gaius plinius secundus",
    "gaius plinius caecilius secundus",
    "juvenal", "decimus junius juvenalis",
    "martial", "marcus valerius martialis",
    "lucretius", "titus lucretius carus",
    "catullus", "gaius valerius catullus",
    "sallust", "gaius sallustius crispus",
    "caesar", "gaius julius caesar", "julius caesar",
    "quintilian", "marcus fabius quintilianus",
    "petronius", "gaius petronius arbiter", "petronius arbiter",
    "apuleius", "lucius apuleius",
    "statius", "publius papinius statius",
    "lucan", "marcus annaeus lucanus",
    "persius", "aulus persius flaccus",
    "terence", "publius terentius afer",
    "plautus", "titus maccius plautus",
    "suetonius", "gaius suetonius tranquillus",
    "vitruvius", "marcus vitruvius pollio",
    "columella", "lucius junius moderatus columella",
    "varro", "marcus terentius varro",
    "aulus gellius", "gellius",
    "valerius maximus",
    "frontinus", "sextus julius frontinus",
    "celsus", "aulus cornelius celsus",
    "vegetius", "publius flavius vegetius renatus",
    "ammianus marcellinus",
    "scriptores historiae augustae",
    "propertius", "sextus propertius",
    "tibullus", "albius tibullus",
    "silius italicus",
    "valerius flaccus",
    "claudian", "claudius claudianus",
    "ausonius", "decimus magnus ausonius",
    "macrobius", "ambrosius theodosius macrobius",
    "servius",
    "festus", "sextus pompeius festus",
    "curtius rufus", "quintus curtius rufus",
    "florus", "lucius annaeus florus",
    "eutropius",
    "orosius", "paulus orosius",
    "nemesianus",
    "calpurnius siculus",
    "ennius", "quintus ennius",
    "naevius",
    "accius",
    "pacuvius",
    "livius andronicus",
    "cato", "marcus porcius cato", "cato the elder",
    "nepos", "cornelius nepos",
    "phaedrus",

    # Church Fathers & Late Antiquity
    "augustine", "augustine of hippo", "saint augustine", "st. augustine",
    "aurelius augustinus",
    "jerome", "saint jerome", "st. jerome", "eusebius sophronius hieronymus",
    "ambrose", "saint ambrose", "st. ambrose",
    "tertullian", "quintus septimius florens tertullianus",
    "lactantius", "lucius caecilius firmianus lactantius",
    "gregory the great", "pope gregory i", "saint gregory",
    "boethius", "anicius manlius severinus boethius",
    "cassiodorus", "flavius magnus aurelius cassiodorus",
    "isidore of seville", "saint isidore",
    "minucius felix",
    "cyprian", "saint cyprian", "thascius caecilius cyprianus",
    "hilary of poitiers",
    "rufinus",
    "sulpicius severus",
    "john cassian", "cassian",
    "prosper of aquitaine",
    "salvian",
    "sidonius apollinaris",
    "paulinus of nola",
    "prudentius", "aurelius prudentius clemens",
    "venantius fortunatus",
    "benedict of nursia", "saint benedict",
    "gregory of tours",
    "arnobius",
    "novatian",
    "commodian",
    "firmicus maternus", "julius firmicus maternus",

    # Medieval
    "bede", "the venerable bede", "venerable bede",
    "alcuin",
    "einhard", "eginhard",
    "anselm", "anselm of canterbury", "saint anselm",
    "peter abelard", "abelard",
    "peter lombard",
    "bernard of clairvaux", "saint bernard",
    "hugh of saint victor", "hugh of st. victor",
    "john of salisbury",
    "hildegard of bingen", "hildegard",
    "roger bacon",
    "albertus magnus", "albert the great",
    "thomas aquinas", "saint thomas aquinas", "st. thomas aquinas",
    "duns scotus", "john duns scotus",
    "william of ockham", "ockham",
    "meister eckhart",
    "ramon llull", "raymond lully",
    "dante alighieri", "dante",
    "petrarch", "francesco petrarca",
    "boccaccio", "giovanni boccaccio",
    "william of malmesbury",
    "matthew paris",
    "geoffrey of monmouth",
    "gerald of wales", "giraldus cambrensis",
    "bartholomaeus anglicus",
    "vincent of beauvais",
    "jacobus de voragine",
    "henry of huntingdon",
    "ordericus vitalis",
    "william of newburgh",
    "adam of bremen",
    "saxo grammaticus",
    "snorri sturluson",

    # Renaissance & Early Modern
    "erasmus", "desiderius erasmus",
    "thomas more", "sir thomas more",
    "marsilio ficino", "ficino",
    "pico della mirandola", "giovanni pico della mirandola",
    "nicholas of cusa", "nicholas cusanus", "nicolaus cusanus",
    "lorenzo valla",
    "giovanni pontano",
    "angelo poliziano", "politian",
    "leonardo bruni",
    "poggio bracciolini",
    "coluccio salutati",
    "guarino veronese",
    "leon battista alberti",
    "giordano bruno",
    "cornelius agrippa", "heinrich cornelius agrippa",
    "paracelsus", "theophrastus paracelsus",
    "francis bacon",
    "thomas hobbes",
    "rene descartes", "descartes",
    "baruch spinoza", "spinoza", "benedictus de spinoza",
    "isaac newton",
    "gottfried wilhelm leibniz", "leibniz",
    "john milton",
    "george buchanan",
    "justus lipsius",
    "hugo grotius", "grotius",
    "samuel pufendorf",
    "john locke",
    "robert burton",
    "thomas browne", "sir thomas browne",
    "john owen",
    "comenius", "jan amos comenius",
    "athanasius kircher",
    "robert fludd",
    "michael maier",
    "heinrich khunrath",
    "valentin weigel",
    "jacob boehme", "jakob bohme",
    "tommaso campanella",
    "giambattista della porta",
    "julius caesar scaliger",
    "joseph justus scaliger",
    "isaac casaubon",
    "gerardus mercator",
    "copernicus", "nicolaus copernicus",
    "galileo galilei", "galileo",
    "johannes kepler", "kepler",
    "william harvey",
    "andrea vesalius", "vesalius",
    "cardano", "gerolamo cardano",
}

# Convert to lowercase set for matching
KNOWN_LATIN_AUTHORS_LOWER = {a.lower() for a in KNOWN_LATIN_AUTHORS}

# Known non-Latin authors to explicitly exclude
EXCLUDE_AUTHORS = {
    "edgar allan poe", "charles dickens", "alexandre dumas",
    "honoré de balzac", "balzac", "george eliot",
    "henry wadsworth longfellow", "mark twain", "samuel clemens",
    "jane austen", "charlotte brontë", "emily brontë",
    "william shakespeare", "shakespeare", "leo tolstoy",
    "fyodor dostoevsky", "dostoevsky", "anton chekhov",
    "victor hugo", "émile zola", "guy de maupassant",
    "jules verne", "robert louis stevenson",
    "rudyard kipling", "h.g. wells", "oscar wilde",
    "arthur conan doyle", "agatha christie",
    "james hadley chase", "thomas griffith taylor",
    "jerome klapka jérôme", "friedrich schiller",
    "alphonse daudet", "erasmus darwin",
    "juvenal l. angel",
    "walter scott", "sir walter scott",
    "jonathan swift", "daniel defoe",
    "miguel de cervantes", "cervantes",
    "voltaire", "jean-jacques rousseau", "rousseau",
    "molière", "racine", "corneille",
    "goethe", "johann wolfgang von goethe",
    # People whose names partially match Latin authors
    "virgil thomson", "ambrose bierce",
    "seneca ray stoddard", "thomas more madden",
    "pliny earle goddard", "julius caesar scaliger",  # will handle separately if needed
    "patrick augustine sheehan",
    "john horace round",
    "horace walpole", "horace mann",
    "horace greeley", "horace bushnell",
    "juvenal l. angel",
    "homer",  # Greek, not Latin
    "herodotus",  # Greek
    "thucydides",  # Greek
    "plato",  # Greek
    "aristotle",  # Greek (though sometimes translated from Latin versions)
    "sophocles",  # Greek
    "euripides",  # Greek
    "aeschylus",  # Greek
    "aristophanes",  # Greek
    "xenophon",  # Greek
    "demosthenes",  # Greek
    "pindar",  # Greek
    "hesiod",  # Greek
    "sappho",  # Greek
    "aesop",  # Greek
    "epictetus",  # Greek
    "marcus aurelius",  # Greek (Meditations written in Greek)
    "plutarch",  # Greek
    "lucian",  # Greek
    "plotinus",  # Greek
    "diogenes laertius",  # Greek
    "strabo",  # Greek
    "polybius",  # Greek
    "diodorus siculus",  # Greek
    "dio cassius",  # Greek
    "appian",  # Greek
    "arrian",  # Greek
    "pausanias",  # Greek
    "athenaeus",  # Greek
    "galen",  # Greek
    "hippocrates",  # Greek
    "euclid",  # Greek
    "archimedes",  # Greek
    "ptolemy",  # Greek
    "josephus",  # Greek
    "philo",  # Greek
}

EXCLUDE_AUTHORS_LOWER = {a.lower() for a in EXCLUDE_AUTHORS}

# Subject keywords that indicate Latin origin
LATIN_SUBJECT_KEYWORDS = [
    "latin literature", "latin poetry", "latin prose", "latin language",
    "latin authors", "translations into english",
    "roman literature", "roman poetry",
    "church fathers", "patristic",
    "classical literature",
    "loeb classical library",
    "bohn's classical library", "bohn classical library",
    "bohn's ecclesiastical library",
    "ante-nicene", "nicene and post-nicene",
    "scholastic", "medieval latin",
    "neo-latin", "renaissance latin",
    "catholic church", "canon law",
    "alchemy", "hermeticism", "hermetic",
]

# Title keywords that suggest Latin translation
LATIN_TITLE_KEYWORDS = [
    "translated from the latin", "translated from latin",
    "translation from latin", "with an english translation",
    "latin text", "latin and english",
    "with english translation", "rendered into english",
    "loeb classical", "bohn's classical", "bohn's library",
    "de rerum", "de officiis", "de finibus", "de natura",
    "de bello", "de civitate", "de consolatione",
    "de re publica", "de legibus", "de oratore",
    "de inventione", "de senectute", "de amicitia",
    "aeneid", "georgics", "eclogues", "bucolics",
    "metamorphoses", "ars amatoria", "fasti", "heroides",
    "satires", "odes", "epodes", "sermones",
    "annals", "histories", "germania", "agricola",
    "natural history", "historia naturalis",
    "confessions", "city of god", "de trinitate",
    "summa theologica", "summa theologiae",
    "consolation of philosophy",
    "praise of folly", "encomium moriae",
    "utopia",
    "gallic war", "civil war",
    "ab urbe condita",
    "bellum catilinae", "bellum jugurthinum",
    "institutio oratoria",
    "satyricon",
    "golden ass", "metamorphoses",
    "de rerum natura",
    "silvae", "thebaid", "achilleid",
    "pharsalia", "de bello civili",
    "epigrams",
    "the twelve caesars", "lives of the caesars",
    "on architecture", "de architectura",
    "attic nights", "noctes atticae",
    "patrologiae", "patrologia",
]


def author_is_known_latin(author_str: str) -> bool:
    """Check if any part of the author string matches known Latin authors.
    Uses exact match on individual author names to avoid false positives
    like 'Virgil Thomson' matching 'Virgil'."""
    author_lower = author_str.lower().strip()
    if not author_lower:
        return False

    # Check each author (may be semicolon-separated)
    for part in author_lower.split(";"):
        part = part.strip()
        # Exact match
        if part in KNOWN_LATIN_AUTHORS_LOWER:
            return True
        # Check if a multi-word known author name appears as a complete
        # substring (bounded by start/end or non-alpha chars).
        # Only for known names with 2+ words (to avoid matching "virgil" in "virgil thomson")
        for known in KNOWN_LATIN_AUTHORS_LOWER:
            words = known.split()
            if len(words) >= 2 and known in part:
                return True
    return False


def author_is_excluded(author_str: str) -> bool:
    """Check if the author is in the exclude list."""
    author_lower = author_str.lower().strip()
    for part in author_lower.split(";"):
        part = part.strip()
        if part in EXCLUDE_AUTHORS_LOWER:
            return True
        for excluded in EXCLUDE_AUTHORS_LOWER:
            if len(excluded) >= 5 and excluded in part:
                return True
    return False


def has_latin_subject(subjects_str: str) -> bool:
    """Check if subjects indicate Latin origin."""
    subjects_lower = subjects_str.lower()
    return any(kw in subjects_lower for kw in LATIN_SUBJECT_KEYWORDS)


def has_latin_title(title_str: str) -> bool:
    """Check if the title suggests a Latin work."""
    title_lower = title_str.lower()
    return any(kw in title_lower for kw in LATIN_TITLE_KEYWORDS)


def should_keep(row: dict) -> bool:
    """Decide whether to keep a record."""
    author = row.get("author", "")
    title = row.get("english_title", "")
    subjects = row.get("subjects", "")

    # Exclude known non-Latin authors
    if author_is_excluded(author):
        return False

    # Keep if author is a known Latin author
    if author_is_known_latin(author):
        return True

    # Keep if subjects strongly indicate Latin literature
    if has_latin_subject(subjects):
        return True

    # Keep if title suggests Latin work
    if has_latin_title(title):
        return True

    # Otherwise discard
    return False


def main():
    # Read all records
    with open(INPUT_PATH, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)

    print(f"Read {len(rows)} raw records from {INPUT_PATH}")

    # Filter
    kept = [r for r in rows if should_keep(r)]
    discarded = len(rows) - len(kept)

    print(f"Kept: {len(kept)}")
    print(f"Discarded: {discarded}")

    # Sort by year, then author
    kept.sort(key=lambda r: (int(r.get("pub_year", 0)), r.get("author", ""), r.get("english_title", "")))

    # Write filtered results
    with open(OUTPUT_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(kept)

    print(f"\nWrote {len(kept)} filtered records to {OUTPUT_PATH}")

    # Summary stats
    decade_counts = {}
    for r in kept:
        decade = (int(r["pub_year"]) // 10) * 10
        decade_counts[decade] = decade_counts.get(decade, 0) + 1

    print(f"\nRecords by decade:")
    for decade in sorted(decade_counts):
        count = decade_counts[decade]
        bar = "#" * (count // 3)
        print(f"  {decade}s: {count:5d} {bar}")

    # Top authors
    author_counts = {}
    for r in kept:
        a = r["author"].split(";")[0].strip()
        if a:
            author_counts[a] = author_counts.get(a, 0) + 1

    print(f"\nTop 30 authors:")
    for author, count in sorted(author_counts.items(), key=lambda x: -x[1])[:30]:
        print(f"  {count:4d}  {author}")

    # Sample some records
    print(f"\nSample records (first 10):")
    for r in kept[:10]:
        print(f"  {r['pub_year']} | {r['author'][:40]:40s} | {r['english_title'][:60]}")

    print(f"\nSample records (around 1900):")
    circa_1900 = [r for r in kept if 1895 <= int(r["pub_year"]) <= 1905]
    for r in circa_1900[:10]:
        print(f"  {r['pub_year']} | {r['author'][:40]:40s} | {r['english_title'][:60]}")


if __name__ == "__main__":
    main()
