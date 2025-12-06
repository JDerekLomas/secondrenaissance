"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Work {
  id: string;
  author: string;
  author_dates?: string;
  title: string;
  original_date?: string;
  ustc_editions?: number;
  genre?: string;
  language_difficulty?: string;
  estimated_length?: string;
  translation_status?: string;
  existing_translations?: string;
  significance?: string;
  digitization?: string;
  bph_relevance?: string;
  scores?: {
    historical_impact?: number;
    translation_gap?: number;
    feasibility?: number;
    audience?: number;
    total_score?: number;
  };
  total_score?: number;
  notes?: string;
}

interface USTCWork {
  author: string;
  title: string;
  editions: number;
  genre: string;
}

interface Tier {
  description: string;
  works: Work[];
  bph_categories?: string[];
}

const roadmapData = {
  tiers: {
    tier_1_highest_priority: {
      description: "Major gaps with significant historical impact - ideal starting projects",
      works: [
        {
          id: "mantuanus_parthenice",
          author: "Baptista Mantuanus",
          author_dates: "1447-1516",
          title: "Parthenice Mariana",
          original_date: "1481",
          ustc_editions: 442,
          genre: "Religious Epic Poetry",
          language_difficulty: "moderate",
          estimated_length: "medium (single book)",
          translation_status: "completely_untranslated",
          existing_translations: "Eclogues translated (Piepho 1989), but religious epics completely unavailable",
          significance: "600+ editions by 1600. Set precedent for religious epic, influenced Sannazaro and Milton. Required grammar school reading across Europe.",
          scores: { historical_impact: 9, translation_gap: 10, feasibility: 7, audience: 8, total_score: 8.6 },
          notes: "High impact, moderate length. Good visibility project."
        },
        {
          id: "conring_origine_juris",
          author: "Hermann Conring",
          author_dates: "1606-1681",
          title: "De Origine Juris Germanici",
          original_date: "1643",
          ustc_editions: 510,
          genre: "Legal History",
          language_difficulty: "difficult",
          estimated_length: "medium",
          translation_status: "completely_untranslated",
          existing_translations: "Only 'New Discourse on the Roman-German Emperor' translated",
          significance: "Foundational work - 'founder of German legal history'. Disproved Lotharian legend.",
          scores: { historical_impact: 9, translation_gap: 10, feasibility: 5, audience: 7, total_score: 7.9 },
          notes: "THE foundational text for German legal history."
        },
        {
          id: "villa_dei_doctrinale",
          author: "Alexander de Villa Dei",
          author_dates: "c. 1175-1240",
          title: "Doctrinale puerorum",
          original_date: "c. 1200",
          ustc_editions: 568,
          genre: "Grammar/Pedagogy",
          language_difficulty: "moderate",
          estimated_length: "medium (2,645 verses)",
          translation_status: "excerpts_only",
          existing_translations: "Excerpts in Copeland & Sluiter (2012)",
          significance: "Perhaps THE most important medieval pedagogical text. Fundamental throughout 13th-16th centuries.",
          scores: { historical_impact: 9, translation_gap: 9, feasibility: 7, audience: 7, total_score: 8.1 },
          notes: "Verse format. Valuable for medieval education studies."
        },
        {
          id: "lipsius_collected",
          author: "Justus Lipsius",
          author_dates: "1547-1606",
          title: "Collected Letters and Minor Works",
          original_date: "various",
          ustc_editions: 558,
          genre: "Philosophy/Letters",
          language_difficulty: "moderate",
          estimated_length: "large (if comprehensive)",
          translation_status: "partially_translated",
          existing_translations: "De Constantia (multiple), Politica. But 4,000+ letters unavailable.",
          significance: "80+ editions of De Constantia. Foundational for Neostoicism.",
          scores: { historical_impact: 9, translation_gap: 7, feasibility: 4, audience: 9, total_score: 7.4 },
          notes: "Letters could be done selectively. High crossover appeal."
        },
        {
          id: "vives_de_anima",
          author: "Juan Luis Vives",
          author_dates: "1493-1540",
          title: "De Anima et Vita (complete)",
          original_date: "1538",
          ustc_editions: 446,
          genre: "Philosophy/Psychology",
          language_difficulty: "moderate",
          estimated_length: "medium (3 books)",
          translation_status: "partially_translated",
          existing_translations: "Only Book 3 translated (Noreña 1990). Books 1-2 unavailable.",
          significance: "Called 'father of modern psychology'. First empirical study of emotions.",
          scores: { historical_impact: 8, translation_gap: 7, feasibility: 6, audience: 9, total_score: 7.6 },
          notes: "Completing this would be major contribution."
        }
      ]
    },
    tier_2_lutheran_theology: {
      description: "Major Lutheran Orthodox theologians - specialized but underserved audience",
      works: [
        {
          id: "martini_anti_socinian",
          author: "Jakob Martini",
          author_dates: "1570-1649",
          title: "Anti-Socinian Works",
          original_date: "1614-1647",
          ustc_editions: 836,
          genre: "Polemical Theology",
          language_difficulty: "difficult",
          estimated_length: "large",
          translation_status: "completely_untranslated",
          significance: "836 editions - among highest in USTC. Leading opponent of Socinianism.",
          scores: { historical_impact: 10, translation_gap: 10, feasibility: 4, audience: 6, total_score: 7.6 },
          notes: "Extremely high edition count but specialized."
        },
        {
          id: "meisner_meditationes",
          author: "Balthasar Meisner",
          author_dates: "1587-1626",
          title: "Meditationes in Evangelia Dominicalia",
          original_date: "1619",
          ustc_editions: 451,
          genre: "Devotional/Sermons",
          language_difficulty: "moderate",
          estimated_length: "medium",
          translation_status: "minimal",
          significance: "Leading Lutheran theologian 1611-1626.",
          scores: { historical_impact: 8, translation_gap: 8, feasibility: 6, audience: 6, total_score: 7.0 },
          notes: "Devotional genre more accessible."
        }
      ]
    },
    tier_3_reformed_theology: {
      description: "Dutch Reformed theologians - gap in anglophone scholarship",
      works: [
        {
          id: "hoornbeek_homiletics",
          author: "Johannes Hoornbeek",
          author_dates: "1617-1666",
          title: "De Ratione Concionandi",
          original_date: "1645",
          ustc_editions: 460,
          genre: "Homiletics/Preaching",
          language_difficulty: "moderate",
          estimated_length: "medium",
          translation_status: "completely_untranslated",
          significance: "First systematic Reformed treatise on preaching post-Reformation.",
          scores: { historical_impact: 8, translation_gap: 10, feasibility: 7, audience: 7, total_score: 8.0 },
          notes: "Practical preaching manual. Seminary/pastoral audience."
        },
        {
          id: "leusden_philologus",
          author: "Johannes Leusden",
          author_dates: "1624-1699",
          title: "Philologus Hebraeus",
          original_date: "1656",
          ustc_editions: 372,
          genre: "Hebrew Studies/Judaism",
          language_difficulty: "difficult",
          estimated_length: "medium-large",
          translation_status: "completely_untranslated",
          significance: "Comprehensive study of Judaism and Jewish life. His Hebrew Bible first with numbered verses.",
          scores: { historical_impact: 7, translation_gap: 10, feasibility: 4, audience: 7, total_score: 7.0 },
          notes: "Christian Hebraism is growing field."
        }
      ]
    },
    tier_4_legal_political: {
      description: "Legal and political texts - specialized but foundational",
      works: [
        {
          id: "besold_political",
          author: "Christoph Besold",
          author_dates: "1577-1638",
          title: "Political Works",
          original_date: "1625-1648",
          ustc_editions: 405,
          genre: "Political Theory",
          language_difficulty: "difficult",
          estimated_length: "medium",
          translation_status: "completely_untranslated",
          significance: "Natural right to believe. Critique of absolutism.",
          scores: { historical_impact: 7, translation_gap: 10, feasibility: 5, audience: 7, total_score: 7.2 },
          notes: "Religious freedom angle has modern relevance."
        }
      ]
    },
    tier_5_grammar_pedagogy: {
      description: "Educational texts - foundational for understanding Renaissance learning",
      works: [
        {
          id: "donatus_ars_major",
          author: "Aelius Donatus",
          author_dates: "fl. 4th century",
          title: "Ars Grammatica (Ars Major)",
          original_date: "4th century",
          ustc_editions: 901,
          genre: "Grammar",
          language_difficulty: "moderate",
          estimated_length: "short",
          translation_status: "partially_translated",
          existing_translations: "Ars Minor translated. Ars Major unavailable.",
          significance: "Most popular medieval Latin textbook for 1000+ years.",
          scores: { historical_impact: 10, translation_gap: 7, feasibility: 9, audience: 6, total_score: 8.0 },
          notes: "Short, foundational, high impact. Good quick-win."
        },
        {
          id: "nebrija_introductiones",
          author: "Antonio de Nebrija",
          author_dates: "1444-1522",
          title: "Introductiones Latinae",
          original_date: "1481",
          ustc_editions: 546,
          genre: "Grammar",
          language_difficulty: "moderate",
          estimated_length: "medium",
          translation_status: "minimal",
          significance: "Official Latin textbook in Spanish universities. ~100 reprints in New World.",
          scores: { historical_impact: 9, translation_gap: 9, feasibility: 7, audience: 6, total_score: 7.8 },
          notes: "Spanish/Latin American studies angle."
        }
      ]
    },
    tier_6_hermetica: {
      description: "BPH Priority - Hermetic and Prisca Theologia texts",
      bph_categories: ["hermetica", "neoplatonism"],
      works: [
        {
          id: "patrizi_nova_universis",
          author: "Francesco Patrizi",
          author_dates: "1529-1597",
          title: "Nova de universis philosophia",
          original_date: "1591",
          ustc_editions: 3,
          genre: "Hermetic Philosophy",
          language_difficulty: "difficult",
          estimated_length: "large (4 parts)",
          translation_status: "completely_untranslated",
          significance: "Major Hermetic cosmology integrating Hermes Trismegistus, Zoroaster, Orpheus. Dedicated to Pope Gregory XIV.",
          bph_relevance: "Core text for understanding Renaissance Hermeticism. Central to prisca theologia tradition.",
          scores: { historical_impact: 7, translation_gap: 10, feasibility: 4, audience: 9, total_score: 7.6 },
          notes: "Foundational for BPH collection themes."
        },
        {
          id: "steuco_perenni_philosophia",
          author: "Agostino Steuco",
          author_dates: "1497-1548",
          title: "De perenni philosophia libri X",
          original_date: "1540",
          ustc_editions: 5,
          genre: "Perennial Philosophy",
          language_difficulty: "difficult",
          estimated_length: "large (10 books)",
          translation_status: "completely_untranslated",
          significance: "Coined 'philosophia perennis' - later adopted by Leibniz and Aldous Huxley.",
          bph_relevance: "Origin of 'perennial philosophy' concept central to esoteric thought.",
          scores: { historical_impact: 8, translation_gap: 10, feasibility: 4, audience: 9, total_score: 7.8 },
          notes: "Connects to modern perennialism (Guenon, Schuon)."
        }
      ]
    },
    tier_7_alchemy: {
      description: "BPH Priority - Alchemical and Chymical texts",
      bph_categories: ["alchemy"],
      works: [
        {
          id: "severinus_idea_medicinae",
          author: "Petrus Severinus",
          author_dates: "1540-1602",
          title: "Idea medicinae philosophicae",
          original_date: "1571",
          ustc_editions: 5,
          genre: "Paracelsian Medicine",
          language_difficulty: "difficult",
          estimated_length: "medium",
          translation_status: "completely_untranslated",
          significance: "THE foundational systematization of Paracelsus. Royal physician to Frederick II of Denmark.",
          bph_relevance: "Essential for understanding Paracelsianism's spread. BPH core theme.",
          scores: { historical_impact: 9, translation_gap: 10, feasibility: 5, audience: 8, total_score: 8.1 },
          notes: "TOP PRIORITY for esoteric/BPH track."
        },
        {
          id: "maier_atalanta_fugiens",
          author: "Michael Maier",
          author_dates: "1568-1622",
          title: "Atalanta fugiens",
          original_date: "1617",
          ustc_editions: 2,
          genre: "Alchemical Emblem Book",
          language_difficulty: "moderate",
          estimated_length: "medium",
          translation_status: "partially_translated",
          existing_translations: "De Jong 1969, Godwin 1989 - but dated or expensive",
          significance: "50 emblems, 50 fugues (musical), 50 epigrams. Alchemical symbolism at its most sophisticated.",
          bph_relevance: "Iconic alchemical emblem book. BPH holds early editions.",
          scores: { historical_impact: 8, translation_gap: 6, feasibility: 7, audience: 9, total_score: 7.6 },
          notes: "Fresh open-access version would serve wide audience."
        },
        {
          id: "khunrath_amphitheatrum",
          author: "Heinrich Khunrath",
          author_dates: "1560-1605",
          title: "Amphitheatrum Sapientiae Aeternae",
          original_date: "1595/1609",
          ustc_editions: 3,
          genre: "Christian Alchemy",
          language_difficulty: "very_difficult",
          estimated_length: "medium-large",
          translation_status: "minimal",
          significance: "Fusion of Paracelsian alchemy, Kabbalah, and Christian mysticism. Famous Laboratory-Oratory engravings.",
          bph_relevance: "Core BPH text. Bridges alchemy and Christian Kabbalah.",
          scores: { historical_impact: 8, translation_gap: 9, feasibility: 4, audience: 8, total_score: 7.4 },
          notes: "Difficult Latin with neologisms and wordplay."
        }
      ]
    },
    tier_8_kabbalah: {
      description: "BPH Priority - Christian Kabbalistic texts",
      bph_categories: ["kabbalah", "magic"],
      works: [
        {
          id: "reuchlin_de_verbo_mirifico",
          author: "Johannes Reuchlin",
          author_dates: "1455-1522",
          title: "De verbo mirifico",
          original_date: "1494",
          ustc_editions: 4,
          genre: "Christian Kabbalah",
          language_difficulty: "very_difficult",
          estimated_length: "medium",
          translation_status: "completely_untranslated",
          significance: "Reuchlin's FIRST kabbalistic work. Dialogue on the wonder-working word (Tetragrammaton).",
          bph_relevance: "Essential early Christian Kabbalah text.",
          scores: { historical_impact: 8, translation_gap: 10, feasibility: 5, audience: 8, total_score: 7.9 },
          notes: "Should be translated alongside De arte cabalistica."
        },
        {
          id: "giorgi_de_harmonia_mundi",
          author: "Francesco Giorgi",
          author_dates: "1466-1540",
          title: "De harmonia mundi totius",
          original_date: "1525",
          ustc_editions: 4,
          genre: "Kabbalistic Cosmology",
          language_difficulty: "difficult",
          estimated_length: "very_large",
          translation_status: "completely_untranslated",
          significance: "Venetian Franciscan's synthesis of Pythagorean harmony, Kabbalah, and Neoplatonism. Influenced Dee, Fludd.",
          bph_relevance: "Musical/Kabbalistic cosmology. Central to BPH themes.",
          scores: { historical_impact: 8, translation_gap: 10, feasibility: 3, audience: 8, total_score: 7.2 },
          notes: "Very large work. Musical/mathematical content requires specialized knowledge."
        }
      ]
    },
    tier_9_rosicrucian: {
      description: "BPH Priority - Rosicrucian and Theosophical texts",
      bph_categories: ["rosicrucianism", "theosophy"],
      works: [
        {
          id: "schweighardt_speculum",
          author: "Theophilus Schweighardt",
          author_dates: "1596-1635",
          title: "Speculum Sophicum Rhodo-Stauroticum",
          original_date: "1618",
          ustc_editions: 2,
          genre: "Rosicrucian",
          language_difficulty: "moderate",
          estimated_length: "short",
          translation_status: "completely_untranslated",
          significance: "Key early Rosicrucian text with famous 'Collegium Fraternitatis' engraving.",
          bph_relevance: "Core Rosicrucian primary source.",
          scores: { historical_impact: 7, translation_gap: 10, feasibility: 8, audience: 8, total_score: 8.2 },
          notes: "Short, accessible, highly relevant. Good quick win."
        },
        {
          id: "fludd_utriusque_cosmi",
          author: "Robert Fludd",
          author_dates: "1574-1637",
          title: "Utriusque Cosmi Historia",
          original_date: "1617-1621",
          ustc_editions: 4,
          genre: "Rosicrucian Cosmology",
          language_difficulty: "difficult",
          estimated_length: "very_large",
          translation_status: "minimal",
          existing_translations: "Only excerpts. Godwin selections (1979).",
          significance: "Massive illustrated cosmological encyclopedia. Famous De Bry engravings. Defended Rosicrucians against Kepler.",
          bph_relevance: "Essential Rosicrucian encyclopedia. BPH holds early editions.",
          scores: { historical_impact: 9, translation_gap: 8, feasibility: 2, audience: 9, total_score: 7.0 },
          notes: "Strategic selection of tractates more feasible than complete translation."
        }
      ]
    },
    tier_10_natural_magic: {
      description: "BPH Priority - Natural Magic and Occult Philosophy",
      bph_categories: ["magic", "neoplatonism"],
      works: [
        {
          id: "bruno_latin_magical",
          author: "Giordano Bruno",
          author_dates: "1548-1600",
          title: "Latin Magical Works",
          original_date: "1589-1591",
          ustc_editions: 0,
          genre: "Natural Magic/Memory",
          language_difficulty: "very_difficult",
          estimated_length: "medium",
          translation_status: "partially_translated",
          existing_translations: "De magia translated by Dillon (2004). De vinculis less available.",
          significance: "Bruno's mature magical philosophy. Theory of bonds linking magician to cosmos. Executed for heresy 1600.",
          bph_relevance: "Major figure in Renaissance magic. Bruno central to esoteric tradition.",
          scores: { historical_impact: 9, translation_gap: 6, feasibility: 5, audience: 9, total_score: 7.4 },
          notes: "Collected accessible edition would be valuable."
        },
        {
          id: "kircher_oedipus_aegyptiacus",
          author: "Athanasius Kircher",
          author_dates: "1602-1680",
          title: "Oedipus Aegyptiacus",
          original_date: "1652-1654",
          ustc_editions: 2,
          genre: "Egyptology/Hermeticism",
          language_difficulty: "difficult",
          estimated_length: "very_large",
          translation_status: "minimal",
          significance: "Monumental attempt to decode hieroglyphics through Hermetic lens. Treasure trove of Renaissance Hermeticism.",
          bph_relevance: "Encyclopedic Hermeticism. BPH holds copies.",
          scores: { historical_impact: 9, translation_gap: 9, feasibility: 1, audience: 8, total_score: 6.6 },
          notes: "Impractical to translate completely. Thematic selections could work."
        }
      ]
    },
    tier_11_early_science: {
      description: "BPH Priority - Early Science (where esoteric meets empirical)",
      bph_categories: ["alchemy", "neoplatonism"],
      works: [
        {
          id: "cardano_de_subtilitate",
          author: "Girolamo Cardano",
          author_dates: "1501-1576",
          title: "De subtilitate rerum",
          original_date: "1550",
          ustc_editions: 12,
          genre: "Natural Philosophy",
          language_difficulty: "difficult",
          estimated_length: "large (21 books)",
          translation_status: "completely_untranslated",
          significance: "Renaissance polymath's encyclopedia of nature. Physics, metals, animals, universe. Influenced scientific revolution.",
          bph_relevance: "Bridges Renaissance natural magic and emerging science.",
          scores: { historical_impact: 9, translation_gap: 10, feasibility: 3, audience: 8, total_score: 7.5 },
          notes: "Major gap. Cardano fundamental to history of science."
        },
        {
          id: "della_porta_magia_naturalis",
          author: "Giambattista della Porta",
          author_dates: "1535-1615",
          title: "Magiae naturalis libri XX",
          original_date: "1558/1589",
          ustc_editions: 25,
          genre: "Natural Magic/Science",
          language_difficulty: "moderate",
          estimated_length: "large",
          translation_status: "partially_translated",
          existing_translations: "1658 English translation archaic.",
          significance: "Most influential natural magic text. 25+ editions. Optics, magnetism, alchemy, cryptography. Founded first scientific society.",
          bph_relevance: "Definitive natural magic compendium. Transition from magic to experimental science.",
          scores: { historical_impact: 9, translation_gap: 6, feasibility: 4, audience: 9, total_score: 7.2 },
          notes: "1658 translation outdated. Modern annotated edition needed."
        },
        {
          id: "porta_physiognomonia",
          author: "Giambattista della Porta",
          author_dates: "1535-1615",
          title: "De humana physiognomonia",
          original_date: "1586",
          ustc_editions: 12,
          genre: "Physiognomy",
          language_difficulty: "moderate",
          estimated_length: "medium",
          translation_status: "minimal",
          significance: "Most influential Renaissance physiognomy. Famous human-animal comparison woodcuts. Influenced Darwin.",
          bph_relevance: "Microcosm-macrocosm correspondence. Natural signatures.",
          scores: { historical_impact: 8, translation_gap: 9, feasibility: 6, audience: 8, total_score: 7.8 },
          notes: "Famous images. Good crossover to art history, psychology."
        },
        {
          id: "libavius_alchemia",
          author: "Andreas Libavius",
          author_dates: "1555-1616",
          title: "Alchemia",
          original_date: "1597",
          ustc_editions: 4,
          genre: "Chemistry/Alchemy",
          language_difficulty: "difficult",
          estimated_length: "very_large",
          translation_status: "completely_untranslated",
          significance: "First systematic chemistry textbook. Bridge between alchemy and modern chemistry. Famous laboratory design.",
          bph_relevance: "Transition from alchemy to chemistry. Rationalization of esoteric tradition.",
          scores: { historical_impact: 9, translation_gap: 10, feasibility: 2, audience: 8, total_score: 7.2 },
          notes: "Major gap in history of chemistry."
        },
        {
          id: "sennert_de_chymicorum",
          author: "Daniel Sennert",
          author_dates: "1572-1637",
          title: "De chymicorum consensu ac dissensu",
          original_date: "1619",
          ustc_editions: 6,
          genre: "Chemistry/Medicine",
          language_difficulty: "difficult",
          estimated_length: "medium",
          translation_status: "completely_untranslated",
          significance: "Reconciling Paracelsian chemistry with Aristotle/Galen. Atomist. Influenced Boyle.",
          bph_relevance: "Integration of chemical philosophy into academic medicine.",
          scores: { historical_impact: 8, translation_gap: 10, feasibility: 5, audience: 7, total_score: 7.5 },
          notes: "Key for understanding how alchemy became chemistry."
        }
      ]
    }
  } as Record<string, Tier>,
  recommended_sequence: {
    phase_1: ["donatus_ars_major", "mantuanus_parthenice"],
    phase_2: ["villa_dei_doctrinale", "vives_de_anima", "hoornbeek_homiletics"],
    phase_3: ["conring_origine_juris", "lipsius_collected", "nebrija_introductiones"]
  }
};

const tierLabels: Record<string, string> = {
  tier_1_highest_priority: "Tier 1: Highest Priority",
  tier_2_lutheran_theology: "Tier 2: Lutheran Theology",
  tier_3_reformed_theology: "Tier 3: Reformed Theology",
  tier_4_legal_political: "Tier 4: Legal & Political",
  tier_5_grammar_pedagogy: "Tier 5: Grammar & Pedagogy",
  tier_6_hermetica: "BPH: Hermetica & Prisca Theologia",
  tier_7_alchemy: "BPH: Alchemy & Paracelsianism",
  tier_8_kabbalah: "BPH: Christian Kabbalah",
  tier_9_rosicrucian: "BPH: Rosicrucianism",
  tier_10_natural_magic: "BPH: Natural Magic",
  tier_11_early_science: "BPH: Early Science"
};

const tierColors: Record<string, { border: string; bg: string }> = {
  tier_1_highest_priority: { border: "#9e4a3a", bg: "#9e4a3a15" },
  tier_2_lutheran_theology: { border: "#546b8a", bg: "#546b8a15" },
  tier_3_reformed_theology: { border: "#8b9a7d", bg: "#8b9a7d15" },
  tier_4_legal_political: { border: "#c9a86c", bg: "#c9a86c15" },
  tier_5_grammar_pedagogy: { border: "#9e4a3a", bg: "#9e4a3a15" },
  tier_6_hermetica: { border: "#c9a86c", bg: "#c9a86c15" },
  tier_7_alchemy: { border: "#c9a86c", bg: "#c9a86c15" },
  tier_8_kabbalah: { border: "#9e4a3a", bg: "#9e4a3a15" },
  tier_9_rosicrucian: { border: "#9e4a3a", bg: "#9e4a3a15" },
  tier_10_natural_magic: { border: "#546b8a", bg: "#546b8a15" },
  tier_11_early_science: { border: "#8b9a7d", bg: "#8b9a7d15" }
};

const difficultyColors: Record<string, string> = {
  moderate: "#8b9a7d",
  difficult: "#c9a86c",
  very_difficult: "#9e4a3a"
};

const statusColors: Record<string, { bg: string; color: string }> = {
  completely_untranslated: { bg: "#9e4a3a20", color: "#9e4a3a" },
  minimal: { bg: "#c9a86c20", color: "#c9a86c" },
  excerpts_only: { bg: "#c9a86c20", color: "#c9a86c" },
  partially_translated: { bg: "#546b8a20", color: "#546b8a" }
};

export default function RoadmapPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"score" | "editions" | "feasibility">("score");
  const [ustcWorks, setUstcWorks] = useState<USTCWork[]>([]);
  const [ustcFilter, setUstcFilter] = useState("");
  const [ustcGenreFilter, setUstcGenreFilter] = useState<string | null>(null);
  const [showUstcBrowser, setShowUstcBrowser] = useState(false);
  const [ustcPage, setUstcPage] = useState(0);
  const USTC_PAGE_SIZE = 50;

  useEffect(() => {
    fetch("/top_1200_latin_works.json")
      .then(res => res.json())
      .then(data => setUstcWorks(data.works || []))
      .catch(err => console.error("Failed to load USTC works:", err));
  }, []);

  const ustcGenres = Array.from(new Set(ustcWorks.map(w => w.genre))).sort();

  const filteredUstcWorks = ustcWorks.filter(w => {
    const matchesSearch = !ustcFilter ||
      w.author.toLowerCase().includes(ustcFilter.toLowerCase()) ||
      w.title.toLowerCase().includes(ustcFilter.toLowerCase());
    const matchesGenre = !ustcGenreFilter || w.genre === ustcGenreFilter;
    return matchesSearch && matchesGenre;
  });

  const paginatedUstcWorks = filteredUstcWorks.slice(
    ustcPage * USTC_PAGE_SIZE,
    (ustcPage + 1) * USTC_PAGE_SIZE
  );

  const getAllWorks = () => {
    const works: (Work & { tier: string })[] = [];
    Object.entries(roadmapData.tiers).forEach(([tierKey, tier]) => {
      tier.works.forEach(work => {
        works.push({ ...work, tier: tierKey });
      });
    });
    return works.sort((a, b) => {
      if (sortBy === "score") {
        return (b.scores?.total_score || 0) - (a.scores?.total_score || 0);
      } else if (sortBy === "editions") {
        return (b.ustc_editions || 0) - (a.ustc_editions || 0);
      } else {
        return (b.scores?.feasibility || 0) - (a.scores?.feasibility || 0);
      }
    });
  };

  const getWorksToDisplay = () => {
    if (selectedTier) {
      return roadmapData.tiers[selectedTier]?.works.map(w => ({ ...w, tier: selectedTier })) || [];
    }
    return getAllWorks();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fdfcf9', color: '#1a1612' }}>
      <header style={{ borderBottom: '1px solid #e8e4dc' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/blog" style={{ color: '#9e4a3a', textDecoration: 'none', fontSize: '12px', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            &larr; RESEARCH ESSAYS
          </Link>
          <a
            href="https://www.ancientwisdomtrust.org/become-a-patron"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              background: '#9e4a3a',
              color: '#fff',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            Support This Work
          </a>
        </div>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 32px 24px 32px' }}>
          <h1 style={{ fontSize: '42px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginTop: '16px', marginBottom: '8px' }}>Translation Roadmap</h1>
          <p style={{ color: '#444', fontFamily: 'Newsreader, serif', marginTop: '8px' }}>
            Prioritized Latin works for SourceLibrary.org
          </p>
          <p style={{ color: '#888', fontSize: '14px', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}>
            USTC contains <span style={{ color: '#9e4a3a', fontWeight: 500 }}>1.65 million editions</span> (all languages, 1450-1700)
            {" "}| <span style={{ color: '#9e4a3a', fontWeight: 500 }}>533,000+ Latin editions</span>
            {" "}| Est. <span style={{ color: '#9e4a3a', fontWeight: 500 }}>~100,000 unique Latin works</span>
          </p>
        </div>
      </header>

      <main style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 32px' }}>
        {/* Scoring explanation */}
        <section style={{ marginBottom: '48px', background: '#f5f0e8', border: '1px solid #e0d8c8', borderRadius: '8px', padding: '24px' }}>
          <h2 style={{ fontSize: '24px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginBottom: '16px' }}>Scoring Methodology</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
            <div>
              <span style={{ color: '#9e4a3a', fontWeight: 500 }}>Historical Impact</span>
              <span style={{ color: '#888', marginLeft: '8px' }}>(30%)</span>
              <p style={{ color: '#444', marginTop: '4px' }}>USTC edition count as proxy for importance</p>
            </div>
            <div>
              <span style={{ color: '#9e4a3a', fontWeight: 500 }}>Translation Gap</span>
              <span style={{ color: '#888', marginLeft: '8px' }}>(30%)</span>
              <p style={{ color: '#444', marginTop: '4px' }}>10 = completely untranslated</p>
            </div>
            <div>
              <span style={{ color: '#9e4a3a', fontWeight: 500 }}>Feasibility</span>
              <span style={{ color: '#888', marginLeft: '8px' }}>(20%)</span>
              <p style={{ color: '#444', marginTop: '4px' }}>Length and difficulty for translator</p>
            </div>
            <div>
              <span style={{ color: '#9e4a3a', fontWeight: 500 }}>Audience</span>
              <span style={{ color: '#888', marginLeft: '8px' }}>(20%)</span>
              <p style={{ color: '#444', marginTop: '4px' }}>Modern scholarly and general interest</p>
            </div>
          </div>
        </section>

        {/* Recommended sequence */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginBottom: '16px' }}>Recommended Sequence</h2>

          {/* Track A: General */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', color: '#444', marginBottom: '12px' }}>Track A: General Renaissance/Reformation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#fff', border: '1px solid #e8e4dc', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: '#9e4a3a', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Phase 1: Foundation</h4>
                <ul style={{ fontSize: '14px', fontFamily: 'Newsreader, serif', color: '#444', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '4px' }}>Donatus - Ars Major (quick win)</li>
                  <li>Mantuanus - Parthenice Mariana</li>
                </ul>
                <p style={{ color: '#888', fontSize: '12px', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}>Build credibility and audience</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e8e4dc', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: '#546b8a', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Phase 2: Expansion</h4>
                <ul style={{ fontSize: '14px', fontFamily: 'Newsreader, serif', color: '#444', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '4px' }}>Villa Dei - Doctrinale</li>
                  <li style={{ marginBottom: '4px' }}>Vives - De Anima et Vita</li>
                  <li>Hoornbeek - De Ratione Concionandi</li>
                </ul>
                <p style={{ color: '#888', fontSize: '12px', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}>Mix of genres and audiences</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e8e4dc', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: '#8b9a7d', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Phase 3: Major Projects</h4>
                <ul style={{ fontSize: '14px', fontFamily: 'Newsreader, serif', color: '#444', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '4px' }}>Conring - De Origine Juris Germanici</li>
                  <li style={{ marginBottom: '4px' }}>Lipsius - Collected Letters</li>
                  <li>Nebrija - Introductiones Latinae</li>
                </ul>
                <p style={{ color: '#888', fontSize: '12px', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}>Establish as serious resource</p>
              </div>
            </div>
          </div>

          {/* Track B: BPH/Esoteric */}
          <div>
            <h3 style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', color: '#444', marginBottom: '12px' }}>Track B: BPH/Esoteric - Hermetic, Alchemical, Kabbalistic</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#fff', border: '1px solid #e8e4dc', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: '#c9a86c', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Phase 1: Quick Wins</h4>
                <ul style={{ fontSize: '14px', fontFamily: 'Newsreader, serif', color: '#444', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '4px' }}>Schweighardt - Speculum (8.2)</li>
                  <li>Maier - Atalanta fugiens</li>
                </ul>
                <p style={{ color: '#888', fontSize: '12px', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}>Short Rosicrucian + emblem book</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e8e4dc', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: '#c9a86c', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Phase 2: Foundational</h4>
                <ul style={{ fontSize: '14px', fontFamily: 'Newsreader, serif', color: '#444', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '4px' }}>Severinus - Idea medicinae (8.1)</li>
                  <li style={{ marginBottom: '4px' }}>Reuchlin - De verbo mirifico</li>
                  <li>Steuco - De perenni philosophia</li>
                </ul>
                <p style={{ color: '#888', fontSize: '12px', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}>Core BPH themes</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e8e4dc', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: '#9e4a3a', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Phase 3: Major Works</h4>
                <ul style={{ fontSize: '14px', fontFamily: 'Newsreader, serif', color: '#444', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '4px' }}>Patrizi - Nova de universis</li>
                  <li style={{ marginBottom: '4px' }}>Khunrath - Amphitheatrum</li>
                  <li>Giorgi - De harmonia mundi</li>
                </ul>
                <p style={{ color: '#888', fontSize: '12px', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}>Landmark translations</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e8e4dc', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: '#546b8a', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Phase 4: Long-term</h4>
                <ul style={{ fontSize: '14px', fontFamily: 'Newsreader, serif', color: '#444', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '4px' }}>Theatrum Chemicum (selections)</li>
                  <li style={{ marginBottom: '4px' }}>Fludd - Utriusque Cosmi</li>
                  <li>Kircher - Oedipus Aegyptiacus</li>
                </ul>
                <p style={{ color: '#888', fontSize: '12px', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}>Encyclopedic works</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#888', marginRight: '8px' }}>Filter by tier:</label>
              <select
                value={selectedTier || ""}
                onChange={(e) => setSelectedTier(e.target.value || null)}
                style={{ background: '#fff', border: '1px solid #e8e4dc', borderRadius: '4px', padding: '6px 12px', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}
              >
                <option value="">All tiers</option>
                {Object.entries(tierLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#888', marginRight: '8px' }}>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "score" | "editions" | "feasibility")}
                style={{ background: '#fff', border: '1px solid #e8e4dc', borderRadius: '4px', padding: '6px 12px', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}
              >
                <option value="score">Total Score</option>
                <option value="editions">USTC Editions</option>
                <option value="feasibility">Feasibility</option>
              </select>
            </div>
          </div>
        </section>

        {/* Works list */}
        <section>
          <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginBottom: '16px' }}>
            {selectedTier ? tierLabels[selectedTier] : "All Works"}
            <span style={{ color: '#888', fontSize: '20px', marginLeft: '8px', fontFamily: 'Inter, sans-serif' }}>({getWorksToDisplay().length} works)</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {getWorksToDisplay().map((work) => {
              const colors = tierColors[work.tier] || { border: '#e8e4dc', bg: '#fff' };
              return (
                <div
                  key={work.id}
                  style={{
                    border: `1px solid ${colors.border}`,
                    background: colors.bg,
                    borderRadius: '8px',
                    padding: '24px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '24px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#1a1612', marginBottom: '4px' }}>{work.title}</h3>
                      <p style={{ color: '#444', fontFamily: 'Newsreader, serif', fontSize: '16px' }}>
                        {work.author}
                        {work.author_dates && <span style={{ color: '#888' }}> ({work.author_dates})</span>}
                        {work.original_date && <span style={{ color: '#888' }}> · {work.original_date}</span>}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '28px', fontWeight: 600, color: '#9e4a3a', fontFamily: 'Inter, sans-serif' }}>
                        {work.scores?.total_score?.toFixed(1)}
                      </div>
                      <div style={{ fontSize: '11px', color: '#888', fontFamily: 'Inter, sans-serif' }}>score</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {work.genre && (
                      <span style={{ padding: '4px 10px', background: '#f5f0e8', borderRadius: '4px', fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#444' }}>
                        {work.genre}
                      </span>
                    )}
                    {work.ustc_editions && (
                      <span style={{ padding: '4px 10px', background: '#f5f0e8', borderRadius: '4px', fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#444' }}>
                        {work.ustc_editions.toLocaleString()} USTC editions
                      </span>
                    )}
                    {work.language_difficulty && (
                      <span style={{
                        padding: '4px 10px',
                        background: '#f5f0e8',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontFamily: 'Inter, sans-serif',
                        color: difficultyColors[work.language_difficulty] || '#444'
                      }}>
                        {work.language_difficulty} Latin
                      </span>
                    )}
                    {work.estimated_length && (
                      <span style={{ padding: '4px 10px', background: '#f5f0e8', borderRadius: '4px', fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#444' }}>
                        {work.estimated_length}
                      </span>
                    )}
                    {work.translation_status && (
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontFamily: 'Inter, sans-serif',
                        background: statusColors[work.translation_status]?.bg || '#f5f0e8',
                        color: statusColors[work.translation_status]?.color || '#444'
                      }}>
                        {work.translation_status.replace(/_/g, " ")}
                      </span>
                    )}
                  </div>

                  {work.significance && (
                    <p style={{ color: '#444', fontSize: '15px', fontFamily: 'Newsreader, serif', marginBottom: '12px' }}>{work.significance}</p>
                  )}

                  {work.existing_translations && (
                    <p style={{ color: '#888', fontSize: '14px', fontFamily: 'Newsreader, serif', marginBottom: '12px' }}>
                      <span style={{ color: '#444' }}>Existing:</span> {work.existing_translations}
                    </p>
                  )}

                  {work.bph_relevance && (
                    <p style={{ color: '#c9a86c', fontSize: '14px', fontFamily: 'Newsreader, serif', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 600 }}>BPH Relevance:</span> {work.bph_relevance}
                    </p>
                  )}

                  {work.notes && (
                    <p style={{ color: '#888', fontSize: '14px', fontStyle: 'italic', fontFamily: 'Newsreader, serif' }}>{work.notes}</p>
                  )}

                  {/* Score breakdown */}
                  {work.scores && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e8e4dc' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                        <div>
                          <span style={{ color: '#888' }}>Impact:</span>
                          <span style={{ marginLeft: '4px', color: '#1a1612' }}>{work.scores.historical_impact}/10</span>
                        </div>
                        <div>
                          <span style={{ color: '#888' }}>Gap:</span>
                          <span style={{ marginLeft: '4px', color: '#1a1612' }}>{work.scores.translation_gap}/10</span>
                        </div>
                        <div>
                          <span style={{ color: '#888' }}>Feasibility:</span>
                          <span style={{ marginLeft: '4px', color: '#1a1612' }}>{work.scores.feasibility}/10</span>
                        </div>
                        <div>
                          <span style={{ color: '#888' }}>Audience:</span>
                          <span style={{ marginLeft: '4px', color: '#1a1612' }}>{work.scores.audience}/10</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Excluded section */}
        <section style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e8e4dc' }}>
          <h2 style={{ fontSize: '24px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginBottom: '16px', color: '#444' }}>Excluded from Roadmap</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', fontSize: '14px' }}>
            <div>
              <h3 style={{ color: '#1a1612', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Already Well-Served</h3>
              <ul style={{ color: '#888', fontFamily: 'Newsreader, serif', paddingLeft: '20px' }}>
                <li>Cicero (Loeb complete)</li>
                <li>Ovid, Virgil, Horace (Loeb)</li>
                <li>Augustine (multiple series)</li>
                <li>Erasmus major works (CWE)</li>
                <li>William Ames (Marrow)</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: '#1a1612', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Ongoing Projects Elsewhere</h3>
              <ul style={{ color: '#888', fontFamily: 'Newsreader, serif', paddingLeft: '20px' }}>
                <li>Johann Gerhard - Concordia (17 vols)</li>
                <li>Melanchthon - Newcomb (2022+)</li>
                <li>Vives - Brill series</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: '#1a1612', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Impractical for Solo Work</h3>
              <ul style={{ color: '#888', fontFamily: 'Newsreader, serif', paddingLeft: '20px' }}>
                <li>Bartolus complete commentaries</li>
                <li>Calov Systema (12 vols)</li>
                <li>Full systematic theologies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* USTC Browser - Top 1200 Works */}
        <section style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e8e4dc' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>Browse Top 1,200 Latin Works</h2>
              <p style={{ color: '#888', fontSize: '14px', fontFamily: 'Inter, sans-serif', marginTop: '4px' }}>
                Ranked by edition count in USTC (1450-1700)
              </p>
            </div>
            <button
              onClick={() => setShowUstcBrowser(!showUstcBrowser)}
              style={{
                padding: '8px 16px',
                background: '#9e4a3a',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {showUstcBrowser ? "Hide Browser" : "Show All Works"}
            </button>
          </div>

          {showUstcBrowser && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Filters */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', background: '#f5f0e8', padding: '16px', borderRadius: '8px' }}>
                <input
                  type="text"
                  placeholder="Search author or title..."
                  value={ustcFilter}
                  onChange={(e) => { setUstcFilter(e.target.value); setUstcPage(0); }}
                  style={{ padding: '8px 12px', background: '#fff', border: '1px solid #e8e4dc', borderRadius: '4px', fontSize: '14px', fontFamily: 'Inter, sans-serif', flex: 1, minWidth: '200px' }}
                />
                <select
                  value={ustcGenreFilter || ""}
                  onChange={(e) => { setUstcGenreFilter(e.target.value || null); setUstcPage(0); }}
                  style={{ padding: '8px 12px', background: '#fff', border: '1px solid #e8e4dc', borderRadius: '4px', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}
                >
                  <option value="">All Genres</option>
                  {ustcGenres.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <span style={{ color: '#888', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                  {filteredUstcWorks.length.toLocaleString()} works
                </span>
              </div>

              {/* Results table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f5f0e8' }}>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '12px', color: '#444', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>#</th>
                      <th style={{ textAlign: 'left', padding: '12px', color: '#444', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Author</th>
                      <th style={{ textAlign: 'left', padding: '12px', color: '#444', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Title</th>
                      <th style={{ textAlign: 'left', padding: '12px', color: '#444', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Genre</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#444', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Editions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUstcWorks.map((work, idx) => (
                      <tr key={`${work.author}-${work.title}-${idx}`} style={{ borderTop: '1px solid #e8e4dc' }}>
                        <td style={{ padding: '12px', color: '#888', fontFamily: 'monospace', fontSize: '12px' }}>
                          {ustcPage * USTC_PAGE_SIZE + idx + 1}
                        </td>
                        <td style={{ padding: '12px', color: '#1a1612', fontFamily: 'Newsreader, serif' }}>{work.author}</td>
                        <td style={{ padding: '12px', color: '#444', fontFamily: 'Newsreader, serif' }}>{work.title}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ padding: '4px 8px', background: '#f5f0e8', borderRadius: '4px', fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#888' }}>
                            {work.genre}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'monospace', color: '#9e4a3a' }}>
                          {work.editions.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setUstcPage(p => Math.max(0, p - 1))}
                  disabled={ustcPage === 0}
                  style={{
                    padding: '8px 16px',
                    background: ustcPage === 0 ? '#f5f0e8' : '#fff',
                    border: '1px solid #e8e4dc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    cursor: ustcPage === 0 ? 'not-allowed' : 'pointer',
                    opacity: ustcPage === 0 ? 0.5 : 1
                  }}
                >
                  Previous
                </button>
                <span style={{ color: '#888', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                  Page {ustcPage + 1} of {Math.ceil(filteredUstcWorks.length / USTC_PAGE_SIZE)}
                </span>
                <button
                  onClick={() => setUstcPage(p => p + 1)}
                  disabled={(ustcPage + 1) * USTC_PAGE_SIZE >= filteredUstcWorks.length}
                  style={{
                    padding: '8px 16px',
                    background: (ustcPage + 1) * USTC_PAGE_SIZE >= filteredUstcWorks.length ? '#f5f0e8' : '#fff',
                    border: '1px solid #e8e4dc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    cursor: (ustcPage + 1) * USTC_PAGE_SIZE >= filteredUstcWorks.length ? 'not-allowed' : 'pointer',
                    opacity: (ustcPage + 1) * USTC_PAGE_SIZE >= filteredUstcWorks.length ? 0.5 : 1
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>

        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e8e4dc' }}>
          <Link href="/blog/methodology" style={{ color: '#9e4a3a', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            &larr; View full methodology
          </Link>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #e8e4dc', padding: '32px 0', textAlign: 'center', color: '#888', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
        <p>
          Data from{" "}
          <a href="https://www.ustc.ac.uk/" style={{ color: '#9e4a3a', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
            USTC
          </a>
          {" "}| Esoteric priorities aligned with{" "}
          <a href="https://embfreem.org/" style={{ color: '#c9a86c', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
            BPH
          </a>
          {" "}| For{" "}
          <a href="https://sourcelibrary.org" style={{ color: '#9e4a3a', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
            SourceLibrary.org
          </a>
        </p>
      </footer>
    </div>
  );
}
