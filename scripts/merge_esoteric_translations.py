#!/usr/bin/env python3
"""Merge esoteric/specialist translator findings into the Latin translations master CSV.

Sources:
- Godwin: Maier, Fludd, Kircher, Colonna, Andreae (from CSV)
- Brill: Academic Latin translations 2001-2024 (from CSV)
- Dykes/Cazimi Press: Medieval astrology (Bonatti, Firmicus, Sahl, etc.)
- Peterson: Grimoires (Lemegeton, Arbatel, Sworn Book, etc.)
- Skinner/Golden Hoard: Grimoires (Trithemius, Ars Notoria, etc.)
- Greer/Warnock: Picatrix, De Imaginibus
- Hand/Project Hindsight: Medieval astrology (Bonatti, Lull, etc.)
- Holden/AFA: Morin's Astrologia Gallica, medieval astrology
- McLean/Magnum Opus: Alchemical texts
- Allen/ITRL: Ficino (likely already in master)
- Salaman: Ficino Letters, Hermetica
- Copenhaver: I Tatti editions (likely already in master)
- Purdue: Agrippa (Inner Traditions)
- Attrell/Porreca: Picatrix (Penn State)
- Fanger: Liber florum (PIMS)
- Augustine/New City Press: Works of Saint Augustine series
"""

import csv, re, os

BASE = '/Users/dereklomas/secondrenaissance/scripts'
MASTER = f'{BASE}/latin_translations_master.csv'
PUBLIC = '/Users/dereklomas/secondrenaissance/viz/public/latin_translations_master.csv'

def normalize_key(author, title):
    skip = {'saint', 'st', 'pseudo', 'the', 'of', 'von', 'de', 'van', 'various', 'attr', 'attributed'}
    words = re.sub(r'[^a-z\s]', '', (author or '').lower()).split()
    author_key = next((w for w in words if w not in skip and len(w) > 1), '')
    title_key = re.sub(r'[^a-z0-9]', '', (title or '').lower())[:40]
    return f"{author_key}|{title_key}"

def classify_era(year):
    try:
        y = int(str(year).replace('c.', '').replace('~', '').strip().split('-')[0].split('/')[0])
    except (ValueError, TypeError):
        return ''
    if y < 500: return 'classical'
    if y < 1400: return 'medieval'
    if y < 1600: return 'renaissance'
    if y < 1800: return 'early_modern'
    return 'modern'

def make_row(source, author, title, translator, pub_year, publisher, series='', original_year='', era=''):
    if not era:
        era = classify_era(original_year)
    return {
        'source': source,
        'series': series,
        'author': author,
        'english_title': title,
        'original_title': '',
        'translator': translator,
        'pub_year': str(pub_year),
        'place': '',
        'publisher': publisher,
        'country': '',
        'original_year': str(original_year),
        'era': era,
        'canonical_author': author,
        'canonical_work': title,
    }

# ============================================================
# ALL NEW ENTRIES
# ============================================================

new_entries = []

# --- BENJAMIN DYKES / CAZIMI PRESS ---
dykes = [
    (2007, 'Guido Bonatti', 'The Book of Astronomy (Liber Astronomiae, complete)', 'Benjamin Dykes', 'Cazimi Press', '', 'c. 1277'),
    (2008, 'Sahl ibn Bishr / Masha\'allah', 'Works of Sahl & Masha\'allah', 'Benjamin Dykes', 'Cazimi Press', '', 'c. 800-850'),
    (2009, 'Masha\'allah / Abu Ali al-Khayyat', 'Persian Nativities I: Masha\'allah and Abu Ali', 'Benjamin Dykes', 'Cazimi Press', 'Persian Nativities', 'c. 800'),
    (2010, 'Umar al-Tabari / Abu Bakr', 'Persian Nativities II: Umar al-Tabari and Abu Bakr', 'Benjamin Dykes', 'Cazimi Press', 'Persian Nativities', 'c. 800-850'),
    (2010, 'Abu Ma\'shar', 'Persian Nativities III: Abu Ma\'shar on Solar Revolutions', 'Benjamin Dykes', 'Cazimi Press', 'Persian Nativities', 'c. 850'),
    (2010, 'Abu Ma\'shar / al-Qabisi', 'Introductions to Traditional Astrology', 'Benjamin Dykes', 'Cazimi Press', '', 'c. 850'),
    (2011, 'Hermann of Carinthia', 'The Search of the Heart', 'Benjamin Dykes', 'Cazimi Press', '', 'c. 1140'),
    (2011, 'al-Kindi', 'The Forty Chapters of al-Kindi', 'Benjamin Dykes', 'Cazimi Press', '', 'c. 850'),
    (2011, 'Various', 'The Book of the Nine Judges', 'Benjamin Dykes', 'Cazimi Press', '', 'c. 1140'),
    (2012, 'al-Kindi / Sahl ibn Bishr', 'Choices and Inceptions: Traditional Electional Astrology', 'Benjamin Dykes', 'Cazimi Press', '', 'c. 850'),
    (2013, 'Various', 'Astrology of the World I: The Ptolemaic Inheritance', 'Benjamin Dykes', 'Cazimi Press', 'Astrology of the World', ''),
    (2014, 'Various', 'Astrology of the World II: Revolutions & History', 'Benjamin Dykes', 'Cazimi Press', 'Astrology of the World', ''),
    (2015, 'Leopold of Austria', 'A Compilation on the Science of the Stars', 'Benjamin Dykes', 'Cazimi Press', '', 'c. 1271'),
    (2023, 'Julius Firmicus Maternus', 'Mathesis', 'Benjamin Dykes', 'Cazimi Press', '', 'c. 334'),
]
for pub_year, author, title, translator, publisher, series, orig_year in dykes:
    new_entries.append(make_row('Cazimi Press', author, title, translator, pub_year, publisher, series, orig_year))

# --- JOSEPH PETERSON / IBIS PRESS ---
peterson = [
    (2001, 'Anonymous (Solomonic)', 'The Lesser Key of Solomon: Lemegeton Clavicula Salomonis', 'Joseph H. Peterson', 'Weiser Books', '', 'c. 1600'),
    (2003, 'John Dee', 'John Dee\'s Five Books of Mystery (Mysteriorum Libri Quinque)', 'Joseph H. Peterson', 'Red Wheel/Weiser', '', '1583'),
    (2009, 'Anonymous', 'Arbatel: Concerning the Magic of the Ancients', 'Joseph H. Peterson', 'Ibis Press', '', '1575'),
    (2016, 'Honorius of Thebes', 'The Sworn Book of Honorius: Liber Iuratus Honorii', 'Joseph H. Peterson', 'Ibis Press', '', 'c. 1250'),
    (2021, 'Peter of Abano', 'Elucidation of Necromancy (Lucidarium) and Heptameron', 'Joseph H. Peterson', 'Ibis Press', '', 'c. 1300'),
]
for pub_year, author, title, translator, publisher, series, orig_year in peterson:
    new_entries.append(make_row('Ibis Press', author, title, translator, pub_year, publisher, series, orig_year))

# --- STEPHEN SKINNER / GOLDEN HOARD ---
skinner = [
    (2008, 'attr. Solomon', 'The Veritable Key of Solomon', 'Stephen Skinner & David Rankine', 'Golden Hoard Press', 'Sourceworks of Ceremonial Magic', 'medieval'),
    (2009, 'attr. Cyprian', 'The Grimoire of St. Cyprian: Clavis Inferni', 'Stephen Skinner & David Rankine', 'Golden Hoard Press', 'Sourceworks of Ceremonial Magic', 'c. 1700'),
    (2019, 'Pseudo-Solomon', 'Ars Notoria Vol. I, Version A', 'Stephen Skinner & Daniel Clark', 'Golden Hoard Press', 'Sourceworks of Ceremonial Magic', 'c. 1250'),
    (2021, 'Pseudo-Solomon', 'Ars Notoria: The Method, Version B', 'Stephen Skinner & Daniel Clark', 'Golden Hoard Press', 'Sourceworks of Ceremonial Magic', 'c. 1250'),
    (2024, 'Johannes Trithemius', 'The Steganographia, Books I-IV', 'Stephen Skinner & Daniel Clark', 'Golden Hoard Press', '', '1500'),
    (2024, 'Johannes Trithemius', 'Antipalus Maleficiorum', 'Stephen Skinner & Daniel Clark', 'Golden Hoard Press', '', 'c. 1508'),
    (2024, 'Berengarius Ganelli', 'Summa Sacre Magice, Books 1 & 2', 'Stephen Skinner & Daniel Clark', 'Golden Hoard Press', 'Sourceworks of Ceremonial Magic', '1346'),
    (2025, 'Berengarius Ganelli', 'Summa Sacre Magice, Books 3 & 4', 'Stephen Skinner & Daniel Clark', 'Golden Hoard Press', 'Sourceworks of Ceremonial Magic', '1346'),
]
for pub_year, author, title, translator, publisher, series, orig_year in skinner:
    new_entries.append(make_row('Golden Hoard Press', author, title, translator, pub_year, publisher, series, orig_year))

# --- GREER / WARNOCK / RENAISSANCE ASTROLOGY ---
greer_warnock = [
    (2010, 'Pseudo-Maslama al-Majriti', 'The Complete Picatrix', 'John Michael Greer & Christopher Warnock', 'Renaissance Astrology Press', '', 'c. 1256'),
    (2009, 'Thabit Ibn Qurra', 'Astral High Magic: De Imaginibus', 'John Michael Greer & Christopher Warnock', 'Renaissance Astrology Press', '', 'c. 900'),
    (2022, 'Hermes Trismegistus', 'De Quindecim Stellis: Hermes on the Fifteen Fixed Stars', 'Christopher Warnock & Regulus Hess', 'Renaissance Astrology Press', '', 'c. 1250'),
]
for pub_year, author, title, translator, publisher, series, orig_year in greer_warnock:
    new_entries.append(make_row('Renaissance Astrology Press', author, title, translator, pub_year, publisher, series, orig_year))

# --- ATTRELL / PORRECA ---
new_entries.append(make_row('Penn State UP', 'Pseudo-Maslama al-Majriti', 'Picatrix: A Medieval Treatise on Astral Magic', 'Dan Attrell & David Porreca', 2019, 'Pennsylvania State University Press', 'Magic in History', 'c. 1256'))

# --- ERIC PURDUE ---
new_entries.append(make_row('Inner Traditions', 'Heinrich Cornelius Agrippa', 'Three Books of Occult Philosophy', 'Eric Purdue', 2021, 'Inner Traditions', '', '1533'))

# --- ROBERT HAND / PROJECT HINDSIGHT ---
hand = [
    (1993, 'Al-Kindi', 'On the Stellar Rays (De Radiis Stellarum)', 'Robert Zoller / Robert Hand', 'Golden Hind Press', 'Project Hindsight Latin Track', 'c. 850'),
    (1993, 'Hermes Trismegistus', 'Liber Hermetis, Parts I-II', 'Robert Zoller / Robert Hand', 'Golden Hind Press', 'Project Hindsight Latin Track', 'c. 500'),
    (1994, 'Ramon Lull', 'Treatise on Astronomy', 'Robert Hand', 'Golden Hind Press', 'Project Hindsight Latin Track', 'c. 1297'),
    (1994, 'Guido Bonatti', 'Liber Astronomiae, Part I', 'Robert Zoller / Robert Hand', 'Golden Hind Press', 'Project Hindsight Latin Track', 'c. 1277'),
    (1995, 'Guido Bonatti', 'Liber Astronomiae, Part II', 'Robert Zoller / Robert Hand', 'Golden Hind Press', 'Project Hindsight Latin Track', 'c. 1277'),
    (1995, 'Antonius de Montulmo', 'On the Judgment of Nativities, Part 1', 'Robert Hand', 'Golden Hind Press', 'Project Hindsight Latin Track', 'c. 1400'),
    (1996, 'Guido Bonatti', 'Liber Astronomiae, Part IV: On Horary', 'Robert Hand', 'Golden Hind Press', 'Project Hindsight Latin Track', 'c. 1277'),
    (2001, 'Johannes Schoener', 'On the Judgments of Nativities, Book 1', 'Robert Hand', 'ARHAT', '', '1545'),
]
for pub_year, author, title, translator, publisher, series, orig_year in hand:
    new_entries.append(make_row('Project Hindsight', author, title, translator, pub_year, publisher, series, orig_year))

# --- JAMES HOLDEN / AFA ---
holden = [
    (1994, 'Jean-Baptiste Morin', 'Astrologia Gallica, Book 22', 'James Herschel Holden', 'AFA', 'Astrologia Gallica', '1661'),
    (2000, 'Jean-Baptiste Morin', 'Astrologia Gallica, Book 23 (Revolutions)', 'James Herschel Holden', 'AFA', 'Astrologia Gallica', '1661'),
    (2006, 'Jean-Baptiste Morin', 'Astrologia Gallica, Book 24 (Progressions & Transits)', 'James Herschel Holden', 'AFA', 'Astrologia Gallica', '1661'),
    (2007, 'Jean-Baptiste Morin', 'Astrologia Gallica, Books 13-15, 19', 'James Herschel Holden', 'AFA', 'Astrologia Gallica', '1661'),
    (2008, 'Various', 'Five Medieval Astrologers', 'James Herschel Holden', 'AFA', '', 'medieval'),
    (2008, 'Jean-Baptiste Morin', 'Astrologia Gallica, Book 25', 'James Herschel Holden', 'AFA', 'Astrologia Gallica', '1661'),
    (2009, 'Abu Ali al-Khayyat', 'The Judgments of Nativities', 'James Herschel Holden', 'AFA', '', 'c. 800'),
    (2009, 'Rhetorius the Egyptian', 'Astrological Compendium', 'James Herschel Holden', 'AFA', '', 'c. 600'),
    (2010, 'Jean-Baptiste Morin', 'Astrologia Gallica, Book 16', 'James Herschel Holden', 'AFA', 'Astrologia Gallica', '1661'),
    (2011, 'Jean-Baptiste Morin', 'Astrologia Gallica, Book 17', 'James Herschel Holden', 'AFA', 'Astrologia Gallica', '1661'),
    (2012, 'Sahl ibn Bishr', 'The Introduction to the Science of the Judgments of the Stars', 'James Herschel Holden', 'AFA', '', 'c. 850'),
]
for pub_year, author, title, translator, publisher, series, orig_year in holden:
    new_entries.append(make_row('AFA', author, title, translator, pub_year, publisher, series, orig_year))

# --- ADAM McLEAN / MAGNUM OPUS ---
mclean = [
    (1979, 'attr. Theodorus de Bry', 'The Magical Calendar', 'Adam McLean', 'Magnum Opus Hermetic Sourceworks', 'MOHS', 'c. 1620'),
    (1980, 'Daniel Stolcius', 'Hermetic Garden of Stolcius', 'Adam McLean', 'Magnum Opus Hermetic Sourceworks', 'MOHS', '1624'),
    (1980, 'Anonymous', 'The Rosary of the Philosophers (Rosarium Philosophorum)', 'Adam McLean', 'Magnum Opus Hermetic Sourceworks', 'MOHS', 'c. 1550'),
    (1988, 'Daniel Cramer', 'Rosicrucian Emblems of Daniel Cramer', 'Adam McLean', 'Phanes Press', 'MOHS', '1617'),
    (2010, 'Giovanni Agostino Panteo', 'Voarchadumia', 'Paul Ferguson / Adam McLean', 'Magnum Opus Hermetic Sourceworks', 'MOHS', '1530'),
    (2011, 'attr. Thomas Aquinas', 'Aurora Consurgens', 'Paul Ferguson / Adam McLean', 'Magnum Opus Hermetic Sourceworks', 'MOHS', 'c. 1400'),
    (2023, 'Heinrich Nollius', 'The Birthing Bed of the Philosophers\' Stone', 'Adam McLean', 'Self-published', 'Alchemical Translations', 'c. 1613'),
    (2023, 'Johann Daniel Mylius', 'The Twelve Grades of Alchemy', 'Adam McLean', 'Self-published', 'Alchemical Translations', '1622'),
    (2023, 'Giambattista della Porta', 'First Book of Distillation', 'Adam McLean', 'Self-published', 'Alchemical Translations', '1558'),
    (2023, 'Aegidius de Vadis', 'Dialogue of Aegidius de Vadis', 'Adam McLean', 'Self-published', 'Alchemical Translations', 'c. 1400'),
]
for pub_year, author, title, translator, publisher, series, orig_year in mclean:
    new_entries.append(make_row('Magnum Opus', author, title, translator, pub_year, publisher, series, orig_year))

# --- CLEMENT SALAMAN / FICINO LETTERS ---
salaman = [
    (1975, 'Marsilio Ficino', 'The Letters of Marsilio Ficino, Vol. 1', 'Clement Salaman', 'Shepheard-Walwyn', 'Letters of Ficino', 'c. 1470'),
    (1978, 'Marsilio Ficino', 'The Letters of Marsilio Ficino, Vol. 2', 'Clement Salaman', 'Shepheard-Walwyn', 'Letters of Ficino', 'c. 1470'),
    (1981, 'Marsilio Ficino', 'The Letters of Marsilio Ficino, Vol. 3', 'Clement Salaman', 'Shepheard-Walwyn', 'Letters of Ficino', 'c. 1470'),
    (1988, 'Marsilio Ficino', 'The Letters of Marsilio Ficino, Vol. 4', 'Clement Salaman', 'Shepheard-Walwyn', 'Letters of Ficino', 'c. 1470'),
    (1994, 'Marsilio Ficino', 'The Letters of Marsilio Ficino, Vol. 5', 'Clement Salaman', 'Shepheard-Walwyn', 'Letters of Ficino', 'c. 1470'),
    (1999, 'Marsilio Ficino', 'The Letters of Marsilio Ficino, Vol. 6', 'Clement Salaman', 'Shepheard-Walwyn', 'Letters of Ficino', 'c. 1470'),
    (2004, 'Marsilio Ficino', 'The Letters of Marsilio Ficino, Vol. 7', 'Clement Salaman', 'Shepheard-Walwyn', 'Letters of Ficino', 'c. 1470'),
    (2007, 'Hermes Trismegistus', 'Asclepius: The Perfect Discourse of Hermes Trismegistus', 'Clement Salaman', 'Duckworth', '', 'c. 200'),
    (2010, 'Marsilio Ficino', 'The Letters of Marsilio Ficino, Vol. 8', 'Clement Salaman', 'Shepheard-Walwyn', 'Letters of Ficino', 'c. 1470'),
]
for pub_year, author, title, translator, publisher, series, orig_year in salaman:
    new_entries.append(make_row('Shepheard-Walwyn', author, title, translator, pub_year, publisher, series, orig_year))

# --- BRIAN COPENHAVER / SCHOLARLY ---
copenhaver = [
    (1992, 'Hermes Trismegistus', 'Hermetica: The Greek Corpus Hermeticum and the Latin Asclepius', 'Brian P. Copenhaver', 'Cambridge University Press', '', 'c. 200'),
    (2014, 'Peter of Spain', 'Summaries of Logic (Summulae Logicales)', 'Brian P. Copenhaver', 'Oxford University Press', '', 'c. 1230'),
    (2025, 'Giovanni Pico della Mirandola', '900 Conclusions (Conclusiones Nongentae)', 'Brian P. Copenhaver', 'Harvard University Press', 'ITRL', '1486'),
]
for pub_year, author, title, translator, publisher, series, orig_year in copenhaver:
    new_entries.append(make_row('Copenhaver', author, title, translator, pub_year, publisher, series, orig_year))

# --- CLAIRE FANGER / PIMS ---
new_entries.append(make_row('PIMS', 'John of Morigny', 'Liber Florum Celestis Doctrine (The Flowers of Heavenly Teaching)', 'Claire Fanger & Nicholas Watson', 2015, 'PIMS Toronto', '', 'c. 1305'))

# --- JOSCELYN GODWIN ---
godwin = [
    (1987, 'Michael Maier', 'Atalanta Fugiens: An Edition of the Fugues, Emblems and Epigrams', 'Joscelyn Godwin', 'Magnum Opus Hermetic Sourceworks', 'MOHS #22', '1617'),
    (1991, 'Johann Valentin Andreae', 'Confessio Fraternitatis', 'Joscelyn Godwin', 'Phanes Press', '', '1615'),
    (1999, 'Francesco Colonna', 'Hypnerotomachia Poliphili: The Strife of Love in a Dream', 'Joscelyn Godwin', 'Thames & Hudson', '', '1499'),
    (2019, 'Robert Fludd', 'The Greater and Lesser Worlds of Robert Fludd', 'Joscelyn Godwin', 'Inner Traditions', '', '1617'),
]
for pub_year, author, title, translator, publisher, series, orig_year in godwin:
    new_entries.append(make_row('Godwin', author, title, translator, pub_year, publisher, series, orig_year))

# --- NEW CITY PRESS / AUGUSTINE ---
augustine = [
    (1990, 'Augustine', 'Sermons 1-19 on the Old Testament (III/1)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1990, 'Augustine', 'Sermons 20-50 on the Old Testament (III/2)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1991, 'Augustine', 'The Trinity (I/5)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1991, 'Augustine', 'Sermons 51-94 on the New Testament (III/3)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1992, 'Augustine', 'Sermons 94A-147A on the New Testament (III/4)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1992, 'Augustine', 'Sermons 148-183 on the New Testament (III/5)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1993, 'Augustine', 'Sermons 184-229Z on the Liturgical Seasons (III/6)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1993, 'Augustine', 'Sermons 230-272B on the Liturgical Seasons (III/7)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1994, 'Augustine', 'Sermons 273-305A on the Saints (III/8)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1994, 'Augustine', 'Sermons 306-340A on the Saints (III/9)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1995, 'Augustine', 'Arianism and Other Heresies (I/18)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1995, 'Augustine', 'Sermons 341-400 on Various Subjects (III/10)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1996, 'Augustine', 'Teaching Christianity (De Doctrina Christiana) (I/11)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 397'),
    (1997, 'Augustine', 'The Confessions (I/1)', 'Maria Boulding OSB', 'New City Press', 'Works of Saint Augustine', 'c. 397'),
    (1997, 'Augustine', 'Answer to the Pelagians I (I/23)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 420'),
    (1997, 'Augustine', 'Sermons: Newly Discovered (III/11)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1998, 'Augustine', 'Answer to the Pelagians II (I/24)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 420'),
    (1999, 'Augustine', 'Marriage and Virginity (I/9)', 'Ray Kearney', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (1999, 'Augustine', 'Answer to the Pelagians III (I/25)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 420'),
    (1999, 'Augustine', 'Answer to the Pelagians IV (I/26)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 420'),
    (2000, 'Augustine', 'Expositions of the Psalms 1-32 (III/15)', 'Maria Boulding OSB', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2000, 'Augustine', 'Expositions of the Psalms 33-50 (III/16)', 'Maria Boulding OSB', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2001, 'Augustine', 'Letters 1-99 (II/1)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2001, 'Augustine', 'Expositions of the Psalms 51-72 (III/17)', 'Maria Boulding OSB', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2002, 'Augustine', 'On Genesis (I/13)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2002, 'Augustine', 'Expositions of the Psalms 73-98 (III/18)', 'Maria Boulding OSB', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2003, 'Augustine', 'Letters 100-155 (II/2)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2003, 'Augustine', 'Expositions of the Psalms 99-120 (III/19)', 'Maria Boulding OSB', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2004, 'Augustine', 'Letters 156-210 (II/3)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2004, 'Augustine', 'Expositions of the Psalms 121-150 (III/20)', 'Maria Boulding OSB', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2005, 'Augustine', 'On Christian Belief (I/8)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2005, 'Augustine', 'Letters 211-270 (II/4)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2006, 'Augustine', 'The Manichean Debate (I/19)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2007, 'Augustine', 'Answer to Faustus, a Manichean (I/20)', 'Roland J. Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2008, 'Augustine', 'Responses to Miscellaneous Questions (I/12)', 'Boniface Ramsey', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2008, 'Augustine', 'Homilies on the First Epistle of John (III/14)', 'Boniface Ramsey', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2009, 'Augustine', 'Homilies on the Gospel of John 1-40 (III/12)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2010, 'Augustine', 'Revisions (Retractationes) (I/2)', 'Boniface Ramsey', 'New City Press', 'Works of Saint Augustine', 'c. 427'),
    (2012, 'Augustine', 'The City of God 1-10 (I/6)', 'William Babcock', 'New City Press', 'Works of Saint Augustine', 'c. 413'),
    (2013, 'Augustine', 'The City of God 11-22 (I/7)', 'William Babcock', 'New City Press', 'Works of Saint Augustine', 'c. 426'),
    (2014, 'Augustine', 'New Testament I and II (I/15-16)', 'Kim Paffenroth / Roland Teske SJ', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2016, 'Augustine', 'Writings on the Old Testament (I/14)', 'Joseph T. Lienhard SJ', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2019, 'Augustine', 'The Donatist Controversy I (I/21)', 'Maureen Tilley / Boniface Ramsey', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2021, 'Augustine', 'Homilies on the Gospel of John 41-124 (III/13)', 'Edmund Hill OP', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2023, 'Augustine', 'Morality and Christian Asceticism (I/10)', 'Boniface Ramsey', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2024, 'Augustine', 'New Testament III (I/17)', 'Boniface Ramsey', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
    (2025, 'Augustine', 'The Donatist Controversy II (I/22)', 'Boniface Ramsey', 'New City Press', 'Works of Saint Augustine', 'c. 400'),
]
for pub_year, author, title, translator, publisher, series, orig_year in augustine:
    new_entries.append(make_row('New City Press', author, title, translator, pub_year, publisher, series, orig_year, 'classical'))

# --- BRILL (from CSV) ---
brill_csv = f'{BASE}/brill_latin_translations.csv'
if os.path.exists(brill_csv):
    with open(brill_csv, encoding='utf-8') as f:
        for r in csv.DictReader(f):
            new_entries.append(make_row(
                'Brill',
                r.get('author', ''),
                r.get('title', ''),
                r.get('translator', ''),
                r.get('year', ''),
                r.get('publisher', 'Brill'),
                r.get('series', ''),
                '',
            ))

print(f"Total new entries to check: {len(new_entries)}", flush=True)

# ============================================================
# LOAD MASTER AND DEDUPLICATE
# ============================================================

print("Loading master CSV...", flush=True)
master_keys = set()
master_rows = []
with open(MASTER, encoding='utf-8') as f:
    reader = csv.DictReader(f)
    master_fields = reader.fieldnames
    for r in reader:
        master_rows.append(r)
        key = normalize_key(r.get('author', '') or r.get('canonical_author', ''),
                           r.get('english_title', ''))
        master_keys.add(key)
print(f"  Master: {len(master_rows)} records, {len(master_keys)} unique keys", flush=True)

# Merge
added = 0
skipped = 0
by_source = {}
for entry in new_entries:
    key = normalize_key(entry.get('author', ''), entry.get('english_title', ''))
    if key in master_keys or not key.strip('|'):
        skipped += 1
        continue
    master_keys.add(key)
    master_rows.append(entry)
    added += 1
    src = entry.get('source', 'unknown')
    by_source[src] = by_source.get(src, 0) + 1

print(f"\n=== MERGE RESULTS ===", flush=True)
print(f"New entries added: {added}", flush=True)
print(f"Duplicates skipped: {skipped}", flush=True)
print(f"New master total: {len(master_rows)}", flush=True)
print(f"\nBy source:", flush=True)
for src, count in sorted(by_source.items(), key=lambda x: -x[1]):
    print(f"  {src}: {count}", flush=True)

# Write updated master
with open(MASTER, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=master_fields)
    writer.writeheader()
    writer.writerows(master_rows)
print(f"\nMaster CSV updated: {MASTER}", flush=True)

# Copy to public
import shutil
shutil.copy2(MASTER, PUBLIC)
print(f"Copied to {PUBLIC}", flush=True)

# Show samples of what was added
print(f"\n--- Sample new entries (first 25) ---", flush=True)
sample_count = 0
for entry in new_entries:
    key = normalize_key(entry.get('author', ''), entry.get('english_title', ''))
    # Check if it was actually added (not skipped)
    if entry in master_rows[-added:] if added > 0 else False:
        print(f"  {entry['pub_year']:>4} | {entry.get('source',''):20s} | {entry.get('author','')[:20]:20s} | {entry.get('english_title','')[:50]}", flush=True)
        sample_count += 1
        if sample_count >= 25:
            break
