import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "Irish Intellectual History: The Hidden Tradition",
  description: "Duns Scotus had more Renaissance editions than Ficino. From Eriugena to Boyle, Irish scholars were central to European thought—but are rarely framed as Irish.",
  slug: "irish-intellect",
  date: "2025-12-27",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function IrishIntellect() {
  return (
    <BlogLayout
      title="Irish Intellectual History: The Hidden Tradition"
      tag="Research"
      slug="irish-intellect"
      prevPost={{ href: "/blog/ficino-network", title: "Mapping the Transmission" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        Duns Scotus, the "Subtle Doctor," had <strong>191 editions</strong> in the Universal Short
        Title Catalogue. Marsilio Ficino—founder of Renaissance Neoplatonism, translator of Plato—had
        <strong> 106</strong>. The Irish scholastic was printed nearly twice as often as the Florentine
        humanist. Yet we speak of the "Italian Renaissance," not the "Irish contribution to European thought."
      </p>

      <figure style={{
        margin: '40px 0',
        textAlign: 'center',
      }}>
        <a href="/irish_intellect.html" target="_blank">
          <img
            src="/irish_intellect_preview.png"
            alt="Irish Intellectual History Timeline"
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
          <a href="/irish_intellect.html" target="_blank" style={{ color: '#c9a227' }}>
            → Open interactive visualization
          </a>
        </figcaption>
      </figure>

      <h2>The Hidden Tradition</h2>

      <p>
        We analyzed the USTC to track Irish intellectual history across a millennium. What we found
        challenges the standard narrative: Irish thinkers were deeply integrated into European
        networks at every period—but they're rarely categorized as "Irish."
      </p>

      <p>
        Instead, they're filed under other labels: scholastics, chemists, Counter-Reformation
        theologians, Enlightenment philosophers. The Irish dimension disappears.
      </p>

      <h2>The Arc: From Eriugena to Hutcheson</h2>

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
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Period</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Key Figure</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#1a1612' }}>Editions</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Significance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#9b59b6', fontWeight: 600 }}>9th c.</td>
              <td style={{ padding: '12px', color: '#444' }}>John Scotus Eriugena</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>2</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Greatest philosopher between Augustine & Aquinas</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#9b59b6', fontWeight: 600 }}>14th c.</td>
              <td style={{ padding: '12px', color: '#444', fontWeight: 600 }}>Duns Scotus</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#9b59b6', fontWeight: 600 }}>191</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>"Subtle Doctor" — rival of Aquinas</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#9b59b6', fontWeight: 600 }}>14th c.</td>
              <td style={{ padding: '12px', color: '#444' }}>Thomas Hibernicus</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>51</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Manipulus Florum — preacher's handbook</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#3498db', fontWeight: 600 }}>17th c.</td>
              <td style={{ padding: '12px', color: '#444', fontWeight: 600 }}>Robert Boyle</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#3498db', fontWeight: 600 }}>264</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Founder of modern chemistry (born Lismore, Ireland)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#3498db', fontWeight: 600 }}>17th c.</td>
              <td style={{ padding: '12px', color: '#444' }}>James Ussher</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>144</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Archbishop of Armagh, chronologist</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#c9a227', fontWeight: 600 }}>16th c.</td>
              <td style={{ padding: '12px', color: '#444' }}>Thomas Stapleton</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>180</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Counter-Reformation theologian, Louvain</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', color: '#c9a227', fontWeight: 600 }}>17th c.</td>
              <td style={{ padding: '12px', color: '#444' }}>Luke Wadding</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>32</td>
              <td style={{ padding: '12px', color: '#666', fontSize: '13px' }}>Founded St Isidore's College, Rome</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h2>The Early Medieval: Island of Saints and Scholars</h2>

      <p>
        When the Roman Empire collapsed and learning retreated on the continent, Irish monasteries
        preserved classical texts. Irish monks then re-exported that learning to Europe during the
        Carolingian Renaissance.
      </p>

      <p>
        <strong>John Scotus Eriugena</strong> (c. 815-877) was the greatest philosopher of his age.
        At the court of Charles the Bald, he translated Pseudo-Dionysius from Greek—a text that
        would shape medieval mysticism. His <em>De divisione naturae</em> was so original it was
        later condemned for pantheism. Only 2 editions in the USTC, because his works were suppressed.
      </p>

      <p>
        <strong>Dungalus Hibernicus</strong> defended icons against Claudius of Turin.
        <strong>Sedulius Scottus</strong> wrote <em>De rectoribus Christianis</em>—a "mirror for
        princes" that influenced medieval political thought. These Carolingian Irish scholars
        shaped European culture, but they're rarely taught as "Irish history."
      </p>

      <h2>The High Medieval: Duns Scotus and the Schoolmen</h2>

      <p>
        <strong>Duns Scotus</strong> (c. 1266-1308) was the most printed scholastic philosopher
        after Thomas Aquinas. His 191 editions—mainly from Venice, Lyon, and Paris—show he remained
        central to philosophical education throughout the Renaissance.
      </p>

      <figure style={{
        background: 'rgba(155,89,182,0.1)',
        border: '1px solid rgba(155,89,182,0.3)',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#9b59b6' }}>
          Duns Scotus: The Numbers
        </h3>
        <ul style={{ color: '#444', lineHeight: 1.8 }}>
          <li><strong>191 editions</strong> in USTC (1450-1700)</li>
          <li><strong>Venice: 87</strong> | Lyon: 28 | Paris: 26</li>
          <li>Printed from <strong>1472</strong> (incunabula) through 1700</li>
          <li>More editions than Ficino (106), Pico (72), or Bruno (15)</li>
        </ul>
      </figure>

      <p>
        His birthplace is disputed—Ireland, Scotland, or northern England. The name "Scotus" meant
        "Irish" in medieval Latin (hence "Eriugena" = "Irish-born"). But whether Irish or Scottish,
        he represents the Celtic contribution to scholastic philosophy.
      </p>

      <p>
        <strong>Thomas Hibernicus</strong> (51 editions) compiled the <em>Manipulus Florum</em>—a
        "Handbook of Flowers" collecting quotations from the Church Fathers. It was a standard
        reference for preachers across Europe. The "Hibernicus" in his name explicitly marks him
        as Irish.
      </p>

      <h2>The Reformation Divide: Two Irish Traditions</h2>

      <p>
        After 1534, Irish intellectual life split into two parallel traditions:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#3498db' }}>
              Protestant → British Networks
            </h3>
            <ul style={{ color: '#444', lineHeight: 1.8, fontSize: '14px' }}>
              <li><strong>Robert Boyle</strong> (264 ed) — Royal Society</li>
              <li><strong>James Ussher</strong> (144 ed) — Church of Ireland</li>
              <li><strong>William Molyneux</strong> (7 ed) — Dublin Phil. Society</li>
              <li><strong>John Toland</strong> (11 ed) — Deism</li>
            </ul>
            <p style={{ color: '#666', fontSize: '13px', marginTop: '12px' }}>
              Published in <strong>English</strong> via <strong>London/Oxford/Dublin</strong>
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#c9a227' }}>
              Catholic → Continental Exile
            </h3>
            <ul style={{ color: '#444', lineHeight: 1.8, fontSize: '14px' }}>
              <li><strong>Thomas Stapleton</strong> (180 ed) — Counter-Reformation</li>
              <li><strong>Richard Stanihurst</strong> (59 ed) — Irish history</li>
              <li><strong>Luke Wadding</strong> (32 ed) — Franciscan Rome</li>
              <li><strong>John Colgan</strong> (6 ed) — Irish saints, Louvain</li>
            </ul>
            <p style={{ color: '#666', fontSize: '13px', marginTop: '12px' }}>
              Published in <strong>Latin</strong> via <strong>Louvain/Rome/Antwerp</strong>
            </p>
          </div>
        </div>
      </figure>

      <h3>Protestant Irish: The Scientific Revolution</h3>

      <p>
        <strong>Robert Boyle</strong> (1627-1691), born at Lismore Castle in County Waterford, was
        one of the founders of modern chemistry. With 264 editions, he's the most printed Irish-born
        author in the USTC. <em>The Sceptical Chymist</em> (1661) attacked Aristotelian elements;
        Boyle's Law remains fundamental to physics. He was a founding member of the Royal Society.
      </p>

      <p>
        <strong>William Molyneux</strong> founded the Dublin Philosophical Society (1683) and
        corresponded extensively with John Locke. He raised the famous "Molyneux Problem" (if a
        blind man gains sight, will he recognize shapes by sight alone?)—a question Locke addressed
        in his <em>Essay Concerning Human Understanding</em>. His <em>Case of Ireland</em> (1698)
        anticipated American colonial arguments for self-governance.
      </p>

      <p>
        <strong>John Toland</strong> (1670-1722), born in Donegal, wrote <em>Christianity Not
        Mysterious</em> (1696)—one of the founding texts of Deism. The book was burned by the
        Irish Parliament, but Toland's ideas spread through London freethinking circles.
      </p>

      <h3>Catholic Irish: The Exile Colleges</h3>

      <p>
        After the Reformation, Irish Catholics who wanted education or religious life often had to
        leave. A network of "Irish Colleges" emerged across Catholic Europe:
      </p>

      <ul>
        <li><strong>Louvain</strong> (1607) — Irish Franciscan College of St Anthony</li>
        <li><strong>Rome</strong> (1625) — St Isidore's College, founded by Luke Wadding</li>
        <li><strong>Salamanca</strong> (1592), <strong>Paris</strong> (1578), <strong>Douai</strong></li>
      </ul>

      <p>
        These colleges produced scholarship that preserved Irish culture while engaging with
        Counter-Reformation theology. <strong>John Colgan's</strong> <em>Acta Sanctorum Hiberniae</em>
        documented Irish saints; <strong>Michael O'Clery's</strong> dictionary preserved the Irish
        language (printed at Louvain, not Dublin).
      </p>

      <figure style={{
        background: 'rgba(201,162,39,0.1)',
        border: '1px solid rgba(201,162,39,0.3)',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#c9a227' }}>
          The Irony
        </h3>
        <p style={{ color: '#444', lineHeight: 1.7 }}>
          Irish-language publishing was almost entirely done by <strong>Catholic exiles at Louvain</strong>,
          not in Ireland itself. Of only <strong>29 Irish-language works</strong> in the entire USTC,
          most were printed in the Spanish Netherlands. The Protestants controlled Dublin printing
          but published in English; the Catholics in exile preserved Gaelic.
        </p>
      </figure>

      <h2>The Pipeline to the Scottish Enlightenment</h2>

      <p>
        The Ulster Presbyterian tradition created an intellectual pipeline to Scotland. Many Ulster
        Scots studied at Glasgow and Edinburgh. <strong>Francis Hutcheson</strong> (1694-1746)—born
        in Ulster, educated at Glasgow, eventually Professor of Moral Philosophy there—is sometimes
        called the "father of the Scottish Enlightenment." His students included Adam Smith.
      </p>

      <p>
        Hutcheson post-dates the USTC (which ends at 1700), but the networks were already forming:
        Molyneux corresponded with Locke; Toland moved in London Whig circles; Boyle shaped
        experimental philosophy. The Irish contribution to Enlightenment thought was substantial—but
        framed as "British" or "Scottish" rather than Irish.
      </p>

      <h2>Why Does This Matter?</h2>

      <p>
        The framing of intellectual history is not neutral. When we speak of the "Italian Renaissance"
        or the "Scottish Enlightenment," we create categories that shape what we notice. Irish
        thinkers get absorbed into other traditions:
      </p>

      <ul>
        <li>Eriugena becomes a "Carolingian" philosopher</li>
        <li>Duns Scotus becomes a "scholastic"</li>
        <li>Boyle becomes a "British" scientist</li>
        <li>Hutcheson becomes a "Scottish" philosopher</li>
      </ul>

      <p>
        The data tells a different story. Duns Scotus (191 editions) was more printed than Ficino
        (106). Robert Boyle (264 editions) was one of the most published authors of the 17th
        century. The Irish contribution to European thought was not marginal—it was central.
      </p>

      <figure style={{
        textAlign: 'center',
        margin: '40px 0',
      }}>
        <a
          href="/irish_intellect.html"
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
          Explore the Interactive Timeline →
        </a>
      </figure>

      <h2>Data Sources</h2>

      <p>
        All edition counts from the <a href="https://ustc.ac.uk" target="_blank" rel="noopener noreferrer"
        style={{ color: '#c9a227' }}>Universal Short Title Catalogue</a> (USTC), which records
        1.6 million editions printed in Europe between 1450 and 1700. Analysis available in
        <code>scripts/irish_intellectual_networks.json</code>.
      </p>

      <p>
        For comparison: Ficino (106 editions), Pico della Mirandola (72), Giordano Bruno (15),
        Thomas More (89), Erasmus (2,892—the most printed author of the Renaissance).
      </p>
    </BlogLayout>
  );
}
