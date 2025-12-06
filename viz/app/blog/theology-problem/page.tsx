"use client";

import BlogLayout from "../BlogLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Stacked area chart data - Latin works by topic over time
const topicData = [
  { decade: 1470, Religious: 1264, Law: 421, Philosophy: 132, Medicine: 99, Science: 56, Literature: 403, History: 112 },
  { decade: 1480, Religious: 2410, Law: 530, Philosophy: 225, Medicine: 130, Science: 112, Literature: 372, History: 83 },
  { decade: 1490, Religious: 2961, Law: 772, Philosophy: 392, Medicine: 205, Science: 177, Literature: 706, History: 126 },
  { decade: 1500, Religious: 3697, Law: 910, Philosophy: 414, Medicine: 285, Science: 232, Literature: 1309, History: 176 },
  { decade: 1510, Religious: 4224, Law: 1079, Philosophy: 389, Medicine: 312, Science: 253, Literature: 1831, History: 262 },
  { decade: 1520, Religious: 4167, Law: 900, Philosophy: 276, Medicine: 298, Science: 198, Literature: 1198, History: 207 },
  { decade: 1530, Religious: 3474, Law: 1249, Philosophy: 214, Medicine: 458, Science: 230, Literature: 1587, History: 251 },
  { decade: 1540, Religious: 4122, Law: 1547, Philosophy: 245, Medicine: 614, Science: 315, Literature: 2043, History: 268 },
  { decade: 1550, Religious: 4540, Law: 1601, Philosophy: 345, Medicine: 800, Science: 387, Literature: 2232, History: 401 },
  { decade: 1560, Religious: 5359, Law: 1517, Philosophy: 306, Medicine: 672, Science: 330, Literature: 1951, History: 445 },
  { decade: 1570, Religious: 4936, Law: 1717, Philosophy: 238, Medicine: 600, Science: 311, Literature: 1883, History: 361 },
  { decade: 1580, Religious: 6269, Law: 1819, Philosophy: 340, Medicine: 741, Science: 329, Literature: 2244, History: 440 },
  { decade: 1590, Religious: 5966, Law: 1802, Philosophy: 370, Medicine: 805, Science: 337, Literature: 2076, History: 480 },
  { decade: 1600, Religious: 6237, Law: 1757, Philosophy: 433, Medicine: 737, Science: 368, Literature: 1950, History: 638 },
  { decade: 1610, Religious: 7490, Law: 2050, Philosophy: 423, Medicine: 671, Science: 455, Literature: 2027, History: 680 },
  { decade: 1620, Religious: 6940, Law: 1802, Philosophy: 440, Medicine: 748, Science: 360, Literature: 1494, History: 577 },
  { decade: 1630, Religious: 5196, Law: 1004, Philosophy: 398, Medicine: 538, Science: 347, Literature: 1151, History: 471 },
  { decade: 1640, Religious: 5885, Law: 1291, Philosophy: 486, Medicine: 638, Science: 410, Literature: 1027, History: 576 },
  { decade: 1650, Religious: 5780, Law: 1564, Philosophy: 657, Medicine: 685, Science: 503, Literature: 1105, History: 729 },
  { decade: 1660, Religious: 6082, Law: 2158, Philosophy: 645, Medicine: 844, Science: 488, Literature: 1098, History: 719 },
  { decade: 1670, Religious: 6140, Law: 2294, Philosophy: 569, Medicine: 798, Science: 467, Literature: 1110, History: 705 },
  { decade: 1680, Religious: 5372, Law: 1738, Philosophy: 505, Medicine: 739, Science: 459, Literature: 917, History: 589 },
  { decade: 1690, Religious: 5301, Law: 1674, Philosophy: 469, Medicine: 576, Science: 348, Literature: 861, History: 532 },
];

const COLORS = {
  Religious: '#9e4a3a',
  Law: '#546b8a',
  Philosophy: '#8b9a7d',
  Medicine: '#c9a86c',
  Science: '#7c6f9e',
  Literature: '#5a8a7b',
  History: '#8a7c5a',
};

export default function TheologyProblem() {
  return (
    <BlogLayout
      title="The Elephant in the Room: 114,000 Latin Theological Works"
      tag="Research"
      prevPost={{ href: "/blog/forgotten-1600s", title: "Forgotten Authors of the 1600s" }}
      nextPost={{ href: "/blog/methodology", title: "Methodology" }}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        We don&apos;t lead with theology on this site. There&apos;s a reason for that—and it&apos;s worth
        explaining why the largest category in the Latin corpus is also the most complicated.
      </p>

      <h2>The Numbers</h2>

      <p>
        Theology and religious works constitute the single largest category in the USTC.
        Of the 503,000 Latin works printed between 1450 and 1700, approximately
        <strong> 114,000</strong>—nearly a quarter—are classified as religious.
      </p>

      {/* Stacked Area Chart */}
      <figure style={{
        background: '#fff',
        border: '1px solid #e8e4dc',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <figcaption style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          color: '#888',
          marginBottom: '16px',
        }}>
          LATIN WORKS BY SUBJECT, 1470–1700
        </figcaption>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <AreaChart data={topicData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" />
              <XAxis
                dataKey="decade"
                tick={{ fontSize: 11, fill: '#888' }}
                tickFormatter={(v) => `${v}`}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#888' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e8e4dc',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
                formatter={(value: number, name: string) => [`${value.toLocaleString()} works`, name]}
                labelFormatter={(label) => `${label}s`}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }}
              />
              <Area type="monotone" dataKey="Religious" stackId="1" stroke={COLORS.Religious} fill={COLORS.Religious} fillOpacity={0.8} />
              <Area type="monotone" dataKey="Law" stackId="1" stroke={COLORS.Law} fill={COLORS.Law} fillOpacity={0.8} />
              <Area type="monotone" dataKey="Literature" stackId="1" stroke={COLORS.Literature} fill={COLORS.Literature} fillOpacity={0.8} />
              <Area type="monotone" dataKey="Medicine" stackId="1" stroke={COLORS.Medicine} fill={COLORS.Medicine} fillOpacity={0.8} />
              <Area type="monotone" dataKey="Philosophy" stackId="1" stroke={COLORS.Philosophy} fill={COLORS.Philosophy} fillOpacity={0.8} />
              <Area type="monotone" dataKey="Science" stackId="1" stroke={COLORS.Science} fill={COLORS.Science} fillOpacity={0.8} />
              <Area type="monotone" dataKey="History" stackId="1" stroke={COLORS.History} fill={COLORS.History} fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: '#aaa',
          marginTop: '12px',
        }}>
          Religious works (rust) consistently form the largest category. Note the peak in the 1610s during the Thirty Years&apos; War era.
        </p>
      </figure>

      <p>
        For comparison:
      </p>

      <ul>
        <li>Law: ~68,000 works</li>
        <li>Philosophy: ~42,000 works</li>
        <li>Medicine: ~38,000 works</li>
        <li>Natural Philosophy (Science): ~31,000 works</li>
      </ul>

      <p>
        Theology dwarfs everything else. And yet we&apos;ve deliberately placed it lower in our
        presentation of the untranslated corpus. Here&apos;s why.
      </p>

      <h2>The Perception Problem</h2>

      <p>
        When people hear &ldquo;500,000 untranslated Latin books,&rdquo; many immediately think:
        <em> medieval monks debating how many angels can dance on the head of a pin.</em>
      </p>

      <p>
        This perception is unfair but understandable. Popular culture has trained us to see
        pre-modern religious thought as irrelevant scholastic hair-splitting. The phrase
        &ldquo;angels on a pin&rdquo; (which no medieval theologian ever actually debated) has become
        shorthand for useless intellectual activity.
      </p>

      <p>
        If we lead with theology, we risk confirming this stereotype and losing the audience
        before we can explain what&apos;s actually in the corpus—and why it matters.
      </p>

      <h2>What&apos;s Actually There</h2>

      <p>
        The &ldquo;Religious&rdquo; classification in the USTC covers an enormous range:
      </p>

      <ul>
        <li><strong>Biblical commentary</strong> — Interpretations of scripture that shaped
        how Europeans understood their world</li>
        <li><strong>Reformation polemics</strong> — The debate that split Europe, in the
        words of the participants</li>
        <li><strong>Moral theology</strong> — Practical ethics for everyday life, from
        business to family</li>
        <li><strong>Mystical texts</strong> — Accounts of religious experience that
        influenced literature and psychology</li>
        <li><strong>Church history</strong> — Primary sources for understanding institutions</li>
        <li><strong>Liturgy and devotion</strong> — Texts that structured daily life for millions</li>
        <li><strong>Sermons</strong> — The main form of public discourse for most Europeans</li>
      </ul>

      <p>
        Much of this material is directly relevant to historians—of ideas, institutions,
        culture, gender, economics. You cannot understand early modern Europe without
        understanding its religious thought.
      </p>

      <h2>The Top Authors</h2>

      <p>
        The most-published Latin theological authors reveal the diversity of the field:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
        overflow: 'hidden',
      }}>
        <table style={{
          width: '100%',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          borderCollapse: 'collapse',
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0d8c8' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Author</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Works</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Augustine", "859", "Church Father, foundational Western thought"],
              ["Thomas Aquinas", "747", "Scholastic synthesis of faith and reason"],
              ["Erasmus", "738", "Humanist biblical scholarship, satire"],
              ["Martin Luther", "688", "Reformation theology, biblical translation"],
              ["Philip Melanchthon", "515", "Protestant education, systematic theology"],
              ["Denis the Carthusian", "304", "Mystical theology, biblical commentary"],
              ["Johannes Eck", "304", "Catholic controversialist, Luther's opponent"],
              ["John Chrysostom", "290", "Patristic preaching, moral exhortation"],
              ["Bonaventure", "287", "Franciscan mysticism, scholastic theology"],
              ["Jeremias Drexel", "256", "Jesuit devotional literature, emblems"],
            ].map(([author, works, type], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e0d8c8' }}>
                <td style={{ padding: '12px 8px', color: '#1a1612' }}>{author}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: '#9e4a3a' }}>{works}</td>
                <td style={{ padding: '12px 8px', color: '#666' }}>{type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>

      <p>
        This list includes Church Fathers, medieval scholastics, Renaissance humanists,
        Protestant reformers, and Counter-Reformation Jesuits. It&apos;s the intellectual
        history of Western Christianity—and most of it remains untranslated.
      </p>

      <h2>The Translation Gap</h2>

      <p>
        Paradoxically, theology may be <em>less</em> translated than other fields, despite
        its cultural centrality. Why?
      </p>

      <ul>
        <li><strong>Secularization</strong> — Modern academia has moved away from
        confessional interests</li>
        <li><strong>Specialization</strong> — Theologians read Latin; why translate?</li>
        <li><strong>Volume</strong> — 114,000 works is overwhelming</li>
        <li><strong>Controversy</strong> — Some texts are polemical, uncomfortable for
        modern readers</li>
      </ul>

      <p>
        The result is that major figures remain inaccessible. Jeremias Drexel wrote 256
        editions&apos; worth of devotional literature that shaped Catholic piety for a century.
        How much is in English? Almost nothing. Denis the Carthusian produced 304 editions
        of mystical and exegetical works. English translations? A handful.
      </p>

      <h2>Why It Matters</h2>

      <p>
        You cannot understand:
      </p>

      <ul>
        <li><strong>The Reformation</strong> without reading the actual debates in Latin</li>
        <li><strong>Early modern politics</strong> without the religious controversies that
        drove wars and alliances</li>
        <li><strong>Western philosophy</strong> without its theological foundations</li>
        <li><strong>Literature</strong> without the devotional and homiletic traditions that
        shaped it</li>
        <li><strong>Science</strong> without the natural theology that motivated inquiry</li>
      </ul>

      <p>
        The separation of &ldquo;religious&rdquo; from &ldquo;secular&rdquo; intellectual history is a modern
        imposition. For early modern Europeans, theology was the queen of the sciences—the
        framework within which all other knowledge made sense.
      </p>

      <h2>Our Approach</h2>

      <p>
        We&apos;ve chosen to foreground philosophy, natural philosophy, and medicine because
        these fields have obvious relevance to modern readers. They don&apos;t require
        explaining why they matter.
      </p>

      <p>
        Theology requires context. It requires overcoming prejudices. It requires
        explaining that &ldquo;scholastic&rdquo; doesn&apos;t mean &ldquo;useless&rdquo; and that religious debates
        were often proxies for questions we still care about: What is the good life?
        How should society be organized? What do we owe each other?
      </p>

      <p>
        We&apos;re not ignoring the 114,000 religious works. We&apos;re building an audience that
        can appreciate them.
      </p>

      <h2>What Needs Translation</h2>

      <p>
        If we were to prioritize theological translation, we might start with:
      </p>

      <ul>
        <li><strong>Reformation controversies</strong> — The actual texts of the debates,
        not summaries</li>
        <li><strong>Devotional bestsellers</strong> — Works like Drexel&apos;s that shaped
        popular piety</li>
        <li><strong>Mystical texts</strong> — Accounts of religious experience with
        psychological depth</li>
        <li><strong>Moral theology</strong> — Practical ethics that reveal social history</li>
        <li><strong>Biblical commentaries</strong> — How scripture was actually interpreted</li>
      </ul>

      <p>
        The theological corpus is not a burden. It&apos;s an opportunity—once we learn to
        see it clearly.
      </p>
    </BlogLayout>
  );
}
