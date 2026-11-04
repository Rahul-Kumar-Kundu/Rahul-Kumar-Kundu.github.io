
import { useState } from 'react'
import {
  FiArrowUpRight,
  FiChevronDown,
  FiChevronUp,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiBookOpen,
} from 'react-icons/fi'

/* =========================================
   RESEARCH INTERESTS
========================================= */

const interests = [
  {
    number: '01',
    icon: FiTarget,
    title: 'Trustworthy AI',
    subtitle: 'Robustness, Generalization & Reliability',
  },
  {
    number: '02',
    icon: FiShield,
    title: 'AI Security',
    subtitle: 'Cybersecurity, Foundation Model Security & Privacy',
  },
  {
    number: '03',
    icon: FiTrendingUp,
    title: 'Multi-Objective Optimization',
    subtitle: 'Performance, Fairness & Robustness',
  },
]

/* =========================================
   RESEARCH WORK
========================================= */

const research = [
  {
    id: 'ed-net',
    title: 'ED-Net: Colorectal Polyp Segmentation',
    area: 'Trustworthy AI',
    status: 'Published',
    venue: 'Biomedical Signal Processing and Control, 2026',
    summary:
      'Developed a hybrid deep learning framework for colorectal polyp segmentation, emphasizing cross-dataset generalization, segmentation accuracy, and computational efficiency.',
    details: [
      {
        heading: 'Methodology',
        text:
          'ED-Net combines a pretrained EfficientNetB0 encoder with a Double U-Net architecture, Atrous Spatial Pyramid Pooling for multiscale context, Squeeze-and-Excitation attention, and test-time augmentation.',
      },
      {
        heading: 'Evaluation',
        text:
          'Evaluated on Kvasir-SEG and three unseen external datasets without retraining to investigate generalization across different data distributions. Model behavior was further examined using Grad-CAM and SE-block attention.',
      },
      {
        heading: 'Research Significance',
        text:
          'The study highlights the importance of external validation, interpretability, and computational considerations when developing medical image segmentation systems for practical deployment.',
      },
    ],
    link: 'https://doi.org/10.1016/j.bspc.2026.110566',
    linkLabel: 'View Publication',
  },
  {
    id: 'data-leakage',
    title: 'Data Leakage in Clinical Machine Learning',
    area: 'Trustworthy AI',
    status: 'Submitted',
    venue: 'Systematic Review & Experimental Investigation',
    summary:
      'Investigated how data leakage across clinical machine learning pipelines can produce misleading performance estimates and compromise experimental reliability.',
    details: [
      {
        heading: 'Methodology',
        text:
          'Conducted a PRISMA-guided systematic review of 50 studies examining leakage associated with target construction, preprocessing, validation, and patient-level data partitioning.',
      },
      {
        heading: 'Experimental Analysis',
        text:
          'Complemented the review with controlled tabular-data experiments to investigate performance inflation under different leakage scenarios.',
      },
      {
        heading: 'Research Significance',
        text:
          'Identified stage-specific mitigation strategies and emphasized the importance of rigorous experimental design, data provenance, and reproducible validation.',
      },
    ],
  },
  {
    id: 'cattle',
    title: 'Cow-Independent Multimodal Behavior Recognition',
    area: 'Trustworthy AI',
    status: 'Submitted',
    venue: 'Research Assistantship · Qatar University',
    summary:
      'Developed a hierarchical sensor-vision framework for cattle behavior recognition, focusing on unseen-animal generalization, class imbalance, and incomplete visual observations.',
    details: [
      {
        heading: 'Methodology',
        text:
          'Developed RG-ROCKET, a MiniROCKET-based generalist with uncertainty-weighted rhythm guidance, and integrated it into a hierarchical sensor-vision recognition framework.',
      },
      {
        heading: 'Evaluation',
        text:
          'Used strict leave-one-cow-out validation to assess generalization to unseen animals and investigated robustness to missing camera views, localization errors, and visual perturbations.',
      },
      {
        heading: 'Research Significance',
        text:
          'The research addresses practical challenges in multimodal sensing, including incomplete observations and robust behavior recognition across individual animals.',
      },
    ],
  },
  {
    id: 'fairness',
    title: 'Demographic Fairness in Skin Lesion Segmentation',
    area: 'Multi-Objective Optimization',
    status: 'Under Review',
    venue: 'IEEE Open Journal of the Computer Society',
    summary:
      'Investigated whether age-related segmentation disparities reflected demographic bias or differences in clinical case mix, using confound-aware statistical analysis.',
    details: [
      {
        heading: 'Methodology',
        text:
          'Analyzed the HAM10000 dataset using age-targeted interventions, regression adjustment, and confound-aware fairness evaluation. Findings were examined across multiple segmentation architectures and human inter-annotator agreement.',
      },
      {
        heading: 'Key Finding',
        text:
          'Differences in lesion-type composition largely explained the observed age-related disparity. Adjustment reduced the age-associated effect by 83%, rendering it statistically non-significant.',
      },
      {
        heading: 'Research Significance',
        text:
          'The study demonstrates why subgroup performance differences should be interpreted in the context of clinical confounding before selecting or evaluating fairness interventions.',
      },
    ],
  },
  {
    id: 'phishing',
    title: 'Machine Learning for Phishing Website Detection',
    area: 'AI Security',
    status: 'Published',
    venue: 'IEEE ICCIT, 2025',
    summary:
      'Investigated machine learning approaches for identifying phishing websites, contributing to the development and evaluation of data-driven cybersecurity classification methods.',
    details: [
      {
        heading: 'Research Focus',
        text:
          'Explored the application of machine learning to phishing website detection and the identification of malicious websites from discriminative input characteristics.',
      },
      {
        heading: 'Research Significance',
        text:
          'This work motivated further interest in security-oriented machine learning, dependable classification, and robustness in environments where attack strategies can evolve.',
      },
    ],
    link: 'https://doi.org/10.1109/ICCIT68739.2025.11491653',
    linkLabel: 'View Publication',
  },
]

const filters = [
  'All',
  'Trustworthy AI',
  'AI Security',
  'Multi-Objective Optimization',
]

/* =========================================
   EXPANDABLE RESEARCH CARD
========================================= */

function ResearchCard({ item }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className={`research-card ${expanded ? 'expanded' : ''}`}
    >
      <div className="research-card-top">
        <span className="research-area">{item.area}</span>

        <span className="research-status">
          {item.status}
        </span>
      </div>

      <h3>{item.title}</h3>

      <p className="research-venue">
        {item.venue}
      </p>

      <p className="research-summary">
        {item.summary}
      </p>

      {expanded && (
        <div
          className="research-details"
          id={`research-details-${item.id}`}
        >
          {item.details.map((detail) => (
            <div
              className="research-detail"
              key={detail.heading}
            >
              <h4>{detail.heading}</h4>
              <p>{detail.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="research-card-footer">
        <button
          type="button"
          className="research-toggle"
          aria-expanded={expanded}
          aria-controls={`research-details-${item.id}`}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Read more'}

          {expanded ? (
            <FiChevronUp />
          ) : (
            <FiChevronDown />
          )}
        </button>

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="research-link"
          >
            {item.linkLabel}
            <FiArrowUpRight />
          </a>
        )}
      </div>
    </article>
  )
}

/* =========================================
   MAIN RESEARCH PAGE
========================================= */

function Research() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredResearch =
    activeFilter === 'All'
      ? research
      : research.filter(
          (item) => item.area === activeFilter
        )

  return (
    <main className="container research-page">

      {/* Introduction */}

      <header className="research-intro">
        <h1>Research</h1>

        <p>
          My research focuses on developing machine learning
          systems that are reliable, secure, and robust beyond
          controlled benchmark settings. I am particularly
          interested in understanding model failure modes,
          improving experimental reliability, and balancing
          predictive performance, fairness, and robustness.
        </p>
      </header>

      {/* Research Interests */}

      <section className="research-section">
        <div className="research-section-heading">
          <FiTarget />
          <h2>Research Interests</h2>
        </div>

        <div className="research-interests-grid">
          {interests.map((interest) => {
            const Icon = interest.icon

            return (
              <article
                className="research-interest-card"
                key={interest.number}
              >
                <div className="interest-card-header">
                  <span className="interest-icon">
                    <Icon />
                  </span>

                  <span className="interest-number">
                    {interest.number}
                  </span>
                </div>

                <h3>{interest.title}</h3>

                <p className="interest-subtitle">
                  {interest.subtitle}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      {/* Research Work */}

      <section className="research-section">
        <div className="research-section-heading">
          <FiBookOpen />
          <h2>Research Work</h2>
        </div>

        <p className="research-section-description">
          Selected published and submitted research contributions.
          Expand individual entries to explore their methodology,
          evaluation, and significance.
        </p>

        <div
          className="research-filters"
          aria-label="Filter research by area"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter ? 'active' : ''
              }
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="research-work-grid">
          {filteredResearch.map((item) => (
            <ResearchCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </section>

      {/* Research Vision */}

      <section className="research-vision">
        <h2>Research Vision</h2>

        <p>
          My long-term goal is to advance trustworthy, secure,
          and generalizable AI systems that perform reliably
          under realistic deployment conditions. I aim to
          investigate methodological challenges at the
          intersection of machine learning reliability,
          AI security, and multi-objective optimization,
          combining rigorous empirical evaluation with
          practical deployment considerations.
        </p>
      </section>

    </main>
  )
}

export default Research
