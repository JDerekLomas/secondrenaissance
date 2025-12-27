import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "Mapping the Transmission: From Ficino's Academy to Copernicus",
  description: "An interactive network visualization of 57 Renaissance scholars connected by 116 documented relationships. Each node links to real USTC publication data.",
  slug: "ficino-network",
  date: "2025-12-25",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function FicinoNetwork() {
  return (
    <BlogLayout
      title="Mapping the Transmission: From Ficino's Academy to Copernicus"
      tag="Visualization"
      slug="ficino-network"
      prevPost={{ href: "/blog/famous-humanists", title: "Even Ficino Isn't Fully Translated" }}
      nextPost={{ href: "/blog/irish-intellect", title: "Irish Intellectual History" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        How did Renaissance Neoplatonism travel from a villa outside Florence to reshape
        European cosmology? We built an interactive network visualization connecting 57 scholars
        across a century of intellectual transmission—and linked each one to their actual
        publication record in the Universal Short Title Catalogue.
      </p>

      <figure style={{
        margin: '40px 0',
        textAlign: 'center',
      }}>
        <a href="/ficino_network_v2.html" target="_blank">
          <img
            src="/ficino_network_preview.png"
            alt="Ficino Network Visualization"
            style={{
              maxWidth: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          />
        </a>
        <figcaption style={{
          marginTop: '12px',
          fontSize: '14px',
          color: '#666',
          fontStyle: 'italic'
        }}>
          <a href="/ficino_network_v2.html" target="_blank" style={{ color: '#c9a227' }}>
            → Open interactive visualization
          </a>
        </figcaption>
      </figure>

      <h2>The Question</h2>

      <p>
        In 1462, Cosimo de' Medici gave Marsilio Ficino a villa at Careggi and a complete
        manuscript of Plato's dialogues. Ficino spent the next thirty years translating Plato,
        Plotinus, and the Hermetic corpus into Latin. Around him gathered the informal
        "Platonic Academy"—poets, philosophers, artists, and scholars who would reshape
        European thought.
      </p>

      <p>
        Eighty years later, in 1543, Nicolaus Copernicus published <em>De revolutionibus</em>.
        In it, he placed the Sun at the center of the cosmos, citing—of all people—Hermes
        Trismegistus, the legendary Egyptian sage whose texts Ficino had translated.
      </p>

      <p>
        How did the ideas get from Florence to Frauenburg? What were the transmission vectors?
        Who taught whom, who read whom, who published whom?
      </p>

      <h2>The Network</h2>

      <p>
        The visualization maps 57 scholars connected by 116 documented relationships: teacher-student
        bonds, patron-client ties, correspondence networks, intellectual influence, and direct
        citation. The scholars span from Gemistos Plethon (1355-1452), who sparked Cosimo's
        interest in Plato at the Council of Florence, to Johannes Kepler (1571-1630), who
        explicitly credited Pythagorean harmonics in his planetary laws.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
          Key Transmission Paths
        </h3>
        <ul style={{ color: '#444', lineHeight: 2 }}>
          <li><strong>Plethon → Cosimo → Ficino → Pico</strong> — The founding chain</li>
          <li><strong>Ficino → Novara → Copernicus</strong> — Florentine Neoplatonism reaches astronomy</li>
          <li><strong>Argyropoulos → Reuchlin → Trithemius → Agrippa</strong> — Greek learning to German occultism</li>
          <li><strong>Pico → Egidio da Viterbo → Galatino</strong> — Christian Cabala in Rome</li>
          <li><strong>Cusanus → Lefèvre → Bovelles</strong> — Mathematical mysticism to Paris</li>
          <li><strong>Copernicus → Rheticus → Kepler</strong> — The heliocentric tradition</li>
        </ul>
      </figure>

      <h2>The Data: USTC Edition Counts</h2>

      <p>
        Each node in the network links to real publication data from the <strong>Universal Short
        Title Catalogue</strong> (USTC), which records 1.6 million editions printed in Europe
        between 1450 and 1700. Click any scholar to see their actual editions—title, year,
        place, printer, format—with direct links to the USTC records.
      </p>

      <p>
        Some findings surprised us:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '0',
        margin: '32px 0',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#e0d8c8' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Scholar</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#1a1612' }}>Editions</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Observation</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Paracelsus</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>326</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Most published in the network—largely posthumous</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Filippo Beroaldo</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>255</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Bologna humanist, Copernicus's teacher—now forgotten</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Cornelius Agrippa</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>171</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Occult philosophy was a bestselling genre</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Agostino Nifo</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>168</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Pomponazzi's opponent—Aristotelian commentaries</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Guarino Veronese</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>155</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Grammar textbooks dominated early printing</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Marsilio Ficino</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>106</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Central to the network, but not the most published</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Nicolaus Copernicus</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>5</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Revolutionized cosmology with just 5 editions</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', color: '#444' }}>Johannes Argyropoulos</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>1</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Crucial teacher, but his translations credited to Aristotle</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h2>Publishers vs. Influencers</h2>

      <p>
        The visualization distinguishes between scholars who published (solid nodes with glow)
        and those who influenced through other means (dashed outline, no glow). Some of the
        most important figures in the network never published at all:
      </p>

      <figure style={{
        background: 'rgba(102,102,102,0.1)',
        border: '1px dashed #666',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#666' }}>
          Non-Publishing Influencers
        </h3>
        <ul style={{ color: '#555', lineHeight: 1.8 }}>
          <li><strong>Cosimo de' Medici</strong> — Funded Ficino's entire project, never wrote a book</li>
          <li><strong>Leonardo da Vinci</strong> — 7,000 pages of notebooks, none published in his lifetime</li>
          <li><strong>Paolo Toscanelli</strong> — Connected Cusanus to Florence, advised Columbus, left no publications</li>
          <li><strong>Domenico Maria Novara</strong> — Copernicus's astronomy teacher, taught through observation</li>
          <li><strong>Andrea del Verrocchio</strong> — Leonardo's teacher, influenced through the workshop</li>
        </ul>
      </figure>

      <p>
        This reveals a limitation of bibliographic data: publication records capture only one
        mode of intellectual transmission. Teaching, conversation, manuscript circulation, and
        patronage networks leave fewer traces—but may have been equally important.
      </p>

      <h2>Research Implications</h2>

      <p>
        The network suggests several research directions:
      </p>

      <h3>1. The Bologna Connection</h3>

      <p>
        Copernicus studied at Bologna from 1496 to 1500. The visualization shows he was embedded
        in a rich humanist environment: Domenico Maria Novara (astronomy), Filippo Beroaldo
        (rhetoric, 255 editions), Antonio Urceo Codro (Greek), and the patronage network of
        Giovanni II Bentivoglio. How much did this Bolognese context shape his later thinking?
      </p>

      <h3>2. The Printer as Node</h3>

      <p>
        Aldus Manutius appears with 108 editions—not as author, but as printer. He published
        Poliziano, worked with Bembo, corresponded with Pico. Printers weren't passive
        conduits; they shaped what got transmitted. The Aldine Press's Greek editions
        created the textual foundation for Renaissance Hellenism.
      </p>

      <h3>3. The Paracelsus Anomaly</h3>

      <p>
        Why does the controversial, marginalized Paracelsus have more editions (326) than
        anyone else? Most were posthumous, published decades after his death in 1541. His
        vernacular medical writings found an audience that Latin scholasticism couldn't reach.
        The edition counts suggest a counter-tradition running beneath official academic philosophy.
      </p>

      <h3>4. The Greek Transmission</h3>

      <p>
        The network includes 8 Byzantine Greek scholars who brought manuscripts and teaching
        to Italy after 1453. But their publication records vary wildly: Theodorus Gaza (56 editions),
        George of Trebizond (80), but Demetrius Chalcondyles (2) and Argyropoulos (1).
        Their translations often circulated under the ancient author's name. How do we trace
        influence when the translator is invisible?
      </p>

      <h3>5. The Occult Underground</h3>

      <p>
        Trithemius (139 editions), Agrippa (171), and the Cabalist network (Egidio, Galatino,
        Giorgio) represent a tradition that modern scholarship has often marginalized. But
        the edition counts suggest these texts were widely read. The occult wasn't
        fringe—it was mainstream Renaissance publishing.
      </p>

      <h2>Limitations and Caveats</h2>

      <p>
        The visualization has important limitations:
      </p>

      <ul>
        <li>
          <strong>Primary authorship only:</strong> We count only editions where the scholar
          is listed as primary author (author_name_1 in USTC). Translations, commentaries,
          and edited works often credited to the ancient author aren't captured.
        </li>
        <li>
          <strong>USTC coverage:</strong> The USTC is comprehensive but not complete.
          Some editions, especially from smaller print shops, may be missing.
        </li>
        <li>
          <strong>Edition ≠ influence:</strong> High edition counts indicate market demand,
          not necessarily intellectual importance. Grammar textbooks outsold philosophy.
        </li>
        <li>
          <strong>Manuscript circulation:</strong> Before ~1480, and for certain kinds of
          texts throughout the period, manuscript remained the primary medium. This is invisible
          in print data.
        </li>
      </ul>

      <h2>Try It Yourself</h2>

      <p>
        The visualization is interactive:
      </p>

      <ul>
        <li><strong>Click any node</strong> to see full bibliographic records from USTC</li>
        <li><strong>Toggle "Timeline"</strong> to arrange scholars by birth year</li>
        <li><strong>Hover</strong> to see connection types (teacher, patron, correspondent, etc.)</li>
        <li><strong>Click edition links</strong> to go directly to USTC records</li>
      </ul>

      <figure style={{
        textAlign: 'center',
        margin: '40px 0',
      }}>
        <a
          href="/ficino_network_v2.html"
          target="_blank"
          style={{
            display: 'inline-block',
            background: '#c9a227',
            color: '#1a1612',
            padding: '16px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '18px',
          }}
        >
          Open the Ficino Network Visualization →
        </a>
      </figure>

      <h2>What's Next</h2>

      <p>
        This visualization is a starting point. Future work could:
      </p>

      <ul>
        <li>Expand the network to include more scholars and connections</li>
        <li>Add manuscript evidence from catalogues like Iter Italicum</li>
        <li>Track specific texts (like Ficino's Plato) through their citation networks</li>
        <li>Compare publication geography—where were these ideas printed?</li>
        <li>Link to digitized editions where available</li>
      </ul>

      <p>
        The data is there. The USTC alone contains 1.6 million editions. What stories are
        waiting to be told?
      </p>
    </BlogLayout>
  );
}
