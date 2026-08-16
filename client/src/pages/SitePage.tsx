/* Editorial Garden Modernism: all internal pages use the same calm editorial shell, brass wayfinding, and document-like media treatment. */
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Maximize2, Phone } from "lucide-react";
import { Link } from "wouter";
import { PageConfig } from "@/lib/siteData";
import { Carousel, SiteHeader } from "@/components/SiteChrome";
import { BlogLongform, BlogShare, ContactDock, ContactInformation, EMICalculator, JournalListing, PageFAQ, RelatedLinks, SitemapListing } from "@/components/ExpansionBlocks";
import { LeadPopup, SiteFooter } from "@/components/FinalChrome";
import { JournalArticleContent } from "@/components/JournalArticleContent";

const plans = [
  ['/manus-storage/plan-3150_66bea140.webp','3,150 sq.ft.','3+1 BHK'], ['/manus-storage/plan-3200_7016787a.webp','3,200 sq.ft.','3+1 BHK'], ['/manus-storage/plan-3500_1ec533cb.webp','3,500 sq.ft.','3+1 BHK'], ['/manus-storage/plan-4350_85e1cb37.webp','4,350 sq.ft.','4 BHK'], ['/manus-storage/plan-4550_499b2df6.webp','4,550 sq.ft.','4 BHK']
];

export default function SitePage({ page }: { page: PageConfig }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const isVideo = page.kind === 'video';
  const isPlan = page.kind === 'plan' || page.kind === 'plans';
  const isJournalArticle = page.kind === 'journalArticle';
  const isForm = page.kind === 'form' || page.kind === 'rera' || page.kind === 'faq' || page.kind === 'thankyou';
  const faqItems = [[`What is ${page.title}?`, `${page.intro} Contact the official project team for the latest approved information.`], ['How can I verify details?', 'Request current documentation, confirm information with the authorised sales team, and independently verify details that influence your decision.'], ['How do I enquire?', 'Use the contact form, phone number, or WhatsApp link to arrange a private conversation or site visit.']];
  const schema = { '@context':'https://schema.org', '@graph':[ { '@type':page.slug.startsWith('gillco-group') ? 'Organization' : 'RealEstateListing', name:page.title, description:page.intro, url:`https://www.gillcomeraqui-mohali.com/${page.slug}` }, { '@type':'FAQPage', mainEntity:faqItems.map(([name,text])=>({ '@type':'Question', name, acceptedAnswer:{'@type':'Answer', text} })) }, { '@type':'BreadcrumbList', itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://www.gillcomeraqui-mohali.com/'},{'@type':'ListItem',position:2,name:page.title,item:`https://www.gillcomeraqui-mohali.com/${page.slug}`}] } ] };
  useEffect(() => { const title = page.metaTitle || (page.title.length > 60 ? `${page.title.slice(0,56)} | Meraqui` : `${page.title} | Gillco Meraqui`); document.title = title; const description = page.metaDescription || `${page.intro} Explore current details with Gillco Meraqui.`.slice(0,158); const keywords = page.keywords?.join(', ') || `${page.title.toLowerCase()}, Gillco Meraqui, Sector 126 Mohali, Airport Road flats, luxury residences, RERA approved homes`; const upsert = (name:string, content:string) => { let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null; if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); } el.content = content; }; upsert('description', description); upsert('keywords', keywords); window.scrollTo(0,0); }, [page.title, page.intro, page.metaTitle, page.metaDescription, page.keywords]);
  return     <div className="internal-page">
    <SiteHeader />
    {isJournalArticle ? <JournalArticleContent page={page} /> : <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
      <section className={`internal-hero ${isVideo ? 'internal-hero-video' : ''}`}>
        {isVideo ? <video src={page.image} controls autoPlay muted playsInline /> : <img src={page.image || '/manus-storage/meraqui-hero_69f6afeb.webp'} alt="Gillco Meraqui" />}
        <div className="internal-hero-shade" />
        <div className="internal-hero-copy"><p className="eyebrow light">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></div>
      </section>
      <section className="internal-body">
        <div className="internal-sidebar"><span className="eyebrow">Meraqui / {page.kind === 'blog' ? 'Journal' : 'Project information'}</span><div className="sidebar-rule" /><p>RERA APPROVED<br/>SECTOR 126, AIRPORT ROAD<br/>MOHALI</p><Link href="/contact-gillco-meraqui" className="button button-dark">Start a conversation <ArrowUpRight size={15}/></Link></div>
        <div className="internal-content"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{page.title}</span></nav><p className="answer-block">{page.intro}</p><p className="internal-lead">{page.intro}</p>{page.kind === 'blog' && <BlogShare title={page.title} />}<Carousel title={page.title} cover={page.image} /><div className="content-sections">{page.sections.map((section,index)=><article key={section}><span className="section-index">0{index+1}</span><div><h2>{questionHeading(section,page)}</h2><p>{copyFor(section,page)}</p>{index === 0 && page.image && !isVideo && !isPlan && <img className="section-photo" src={page.image} alt={`${page.title} — ${section}`} />}</div></article>)}</div>
          {isPlan && <PlanLibrary single={page.kind==='plan'} selected={page.image} onOpen={setLightbox} />}
          {page.kind === 'gallery' && <Gallery onOpen={setLightbox} />}
          {page.kind === 'master' && <div className="document-preview" onClick={()=>setLightbox(page.image || '')}><img src={page.image} alt="Gillco Meraqui master plan"/><span><Maximize2 size={15}/> Open full master plan</span></div>}
          {isVideo && <div className="video-inline"><video src={page.image} controls playsInline /><p>Use the supplied walkthrough to explore the architectural language and intended atmosphere of Meraqui.</p></div>}
          {page.kind === 'emi' && <EMICalculator />}
          {page.slug === 'contact-gillco-meraqui' && <ContactInformation />}
          {page.kind === 'journal' && <JournalListing />}
          {page.kind === 'blog' && <BlogLongform page={page} />}
          {page.kind === 'sitemap' && <SitemapListing />}
          {isForm && page.kind !== 'thankyou' && <EnquiryForm />}
          {page.kind === 'thankyou' && <div className="thankyou-box"><Check size={28}/><h3>Your enquiry is in.</h3><p>A member of the Gillco Meraqui team will contact you shortly.</p><Link href="/" className="button button-dark">Return to homepage <ArrowUpRight size={15}/></Link></div>}
          {!isForm && page.kind !== 'thankyou' && <div className="internal-cta"><div><p className="eyebrow">Continue the conversation</p><h3>Make the next step<br/><i>personal.</i></h3></div><Link href="/contact-gillco-meraqui" className="button button-brass">Enquire now <ArrowUpRight size={15}/></Link></div>}
          <PageFAQ page={page} />
          <RelatedLinks page={page} />
        </div>
      </section>
    </main>}
    <SiteFooter />
    <ContactDock />
    <LeadPopup />
    {lightbox && <div className="modal" onClick={()=>setLightbox(null)}><div className="modal-card plan-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setLightbox(null)}>×</button><img src={lightbox} alt="Meraqui document" /></div></div>}
  </div>;
}

function questionHeading(section:string,page:PageConfig){ return page.kind === 'blog' || page.kind === 'guide' ? `What should buyers know about ${section.toLowerCase()}?` : `How does ${section.toLowerCase()} shape the Meraqui experience?`; }
function copyFor(section:string,page:PageConfig){
  const context = page.kind === 'blog' ? `This journal guide approaches ${section.toLowerCase()} as a practical research question rather than a sales claim. Start with the needs of your household, compare official information, and keep a written list of the details that matter before you visit.` : page.kind === 'plan' ? `The plan should be read as a relationship between rooms, circulation, daylight, balconies, and the privacy needs of the household. It is useful to compare the drawing against your own routine: where people work, entertain, rest, store belongings, and spend time together.` : page.kind === 'legal' ? `This information is presented for website transparency and should be read together with the final approved project documents. If a point may affect a booking, payment, or legal decision, request the current source document and seek independent professional advice where appropriate.` : `At Gillco Meraqui, ${section.toLowerCase()} is part of a broader conversation about planning a more considered home. Prospective buyers should look beyond a single feature and understand how the setting, specifications, planning, maintenance, access, and everyday routines work together.`;
  const verify = `Before relying on any feature, timeline, distance, price, or availability statement, ask the authorised project team for the latest written information. The final decision should be based on current documentation, your independent assessment, and the needs of your household.`;
  return `${context} ${verify}`;
}
function PlanLibrary({single,selected,onOpen}:{single:boolean;selected?:string;onOpen:(s:string)=>void}){const visible=single?plans.filter(p=>p[0]===selected):plans;return <div className="internal-plan-grid">{visible.map(p=><button key={p[1]} onClick={()=>onOpen(p[0])}><img src={p[0]} alt={p[1]}/><span>{p[2]} · {p[1]} <Maximize2 size={13}/></span></button>)}</div>}
function Gallery({onOpen}:{onOpen:(s:string)=>void}){const imgs=['/manus-storage/meraqui-architecture_2a0a8e4c.jpg','/manus-storage/meraqui-garden_2b491524.png','/manus-storage/meraqui-pool_e560bf19.png','/manus-storage/meraqui-yoga-lawn_2983fb32.png','/manus-storage/meraqui-editorial_6d04c439.jpg','/manus-storage/meraqui-hero_69f6afeb.webp','/manus-storage/meraqui-arrival_7a2cecde.webp','/manus-storage/master-plan_64b1dacc.webp'];return <div className="gallery-grid">{imgs.map(i=><button key={i} onClick={()=>onOpen(i)}><img src={i} alt="Meraqui project gallery"/><span><Maximize2 size={13}/></span></button>)}</div>}
function EnquiryForm(){return <form className="internal-form" onSubmit={e=>{e.preventDefault();window.location.assign('/thank-you')}}><div><label>Name<input required placeholder="Your name"/></label><label>Phone<input required placeholder="+91"/></label></div><label>What would you like to explore?<select defaultValue=""><option value="" disabled>Select an option</option><option>Floor plans</option><option>Pricing</option><option>Site visit</option><option>Brochure</option></select></label><button className="button button-dark" type="submit">Send enquiry <ArrowUpRight size={15}/></button><small>Price: On Request · RERA registration: PBRERA-SAS81-PR1390-062026</small></form>}
