/* Editorial Garden Modernism: asymmetrical architecture-led layout, forest/cream/brass palette, portfolio-like interactions. */
import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, Play, Maximize2, X } from "lucide-react";
import { Carousel, SiteHeader } from "@/components/SiteChrome";
import { ContactDock } from "@/components/ExpansionBlocks";
import { LeadPopup, SiteFooter } from "@/components/FinalChrome";

const storage = {
  hero: "/meraqui-hero_69f6afeb.webp",
  arrival: "/meraqui-arrival_7a2cecde.webp",
  master: "/master-plan_64b1dacc.webp",
  facade: "/clubhouse-facade_94904d49.webp",
  video: "/gillcovideo_71045890.mp4",
  generatedHero: "/meraqui-hero-atmosphere_3f359ec9.webp",
  pool: "/meraqui-pool-courtyard_c9f3cb09.webp",
  club: "/meraqui-clubhouse-evening_17dea46e.jpg",
  mark: "/meraqui-wing-mark_7a6cc4a0.png",
  plan3150: "/plan-3150_66bea140.webp",
  plan3200: "/plan-3200_7016787a.webp",
  plan3500: "/plan-3500_1ec533cb.webp",
  plan4350: "/plan-4350_85e1cb37.webp",
  plan4550: "/plan-4550_499b2df6.webp",
};

const plans = [
  { size: "3,150", type: "3+1 BHK", note: "Compact unit", img: storage.plan3150 },
  { size: "3,200", type: "3+1 BHK", note: "Standard unit", img: storage.plan3200 },
  { size: "3,500", type: "3+1 BHK", note: "Extended balcony", img: storage.plan3500 },
  { size: "4,350", type: "4 BHK", note: "Standard unit", img: storage.plan4350 },
  { size: "4,550", type: "4 BHK", note: "Extended balcony", img: storage.plan4550 },
];
const homeSchema = JSON.stringify({ '@context':'https://schema.org', '@graph':[ { '@type':'RealEstateListing', name:'Gillco Meraqui', description:'Gillco Meraqui is a RERA-approved luxury residential project offering 3+1 and 4 BHK dual-core flats on Airport Road, Sector 126, Mohali.', url:'https://gillcomeraqui-mohali.com/' }, { '@type':'FAQPage', mainEntity:[ { '@type':'Question', name:'Where is Gillco Meraqui located?', acceptedAnswer:{ '@type':'Answer', text:'Gillco Meraqui is presented on Airport Road in Sector 126, Mohali. Confirm the exact project address and map pin with the sales team before visiting.' } }, { '@type':'Question', name:'What residence sizes are available?', acceptedAnswer:{ '@type':'Answer', text:'The project presents 3+1 and 4 BHK layouts. Refer to the latest official floor-plan and availability information before making a decision.' } }, { '@type':'Question', name:'How can I arrange a visit?', acceptedAnswer:{ '@type':'Answer', text:'Call the sales team, use WhatsApp, or submit an enquiry to request a private site visit.' } } ] } ] });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<typeof plans[number] | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div className="site-shell">
      <SiteHeader />

      <main id="top"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:homeSchema}} />
        <section className="hero video-only-hero" aria-label="Gillco Meraqui project film">
          <video className="hero-video" src={storage.video} autoPlay muted loop playsInline preload="auto" aria-label="Gillco Meraqui project video" />
        </section>
        <Carousel title="Gillco Meraqui" cover={storage.hero} />

        <section className="facts-rail">
          <div className="fact-intro"><span className="eyebrow">A considered address</span><p>Everything has been planned around one idea: more meaningful space for the way modern families live.</p></div>
          {[['12', 'acres of landscape'], ['06', 'residential towers'], ['444', 'private residences'], ['2030', 'possession target']].map(([value, label]) => <div className="fact" key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </section>

        <section className="story section" id="story">
          <div className="section-label"><span>02</span><span className="label-line" /><span>THE RESIDENCE</span></div>
          <div className="story-grid">
            <div className="story-heading"><p className="eyebrow">A dual-core way of living</p><h2>Space that gives<br />the day room<br /><i>to breathe.</i></h2></div>
            <div className="story-copy"><p className="lead">Gillco Meraqui is a collection of 3+1 and 4 BHK residences in Sector 126, Mohali — designed around the quiet luxury of privacy, landscape, and generous proportions.</p><p>Each home is shaped by a dual-core planning philosophy: fewer homes per floor, better separation between private and shared moments, and an easier connection to the outdoors. Here, the plan is not an afterthought. It is the beginning of the experience.</p><button className="text-link" onClick={() => scrollTo("plans")}>View the floor plans <ArrowUpRight size={16} /></button></div>
          </div>
          <div className="story-image-wrap"><img src={storage.arrival} alt="Meraqui contemporary residential architecture" /><div className="image-caption"><span>Built around light, landscape, and long views.</span><span>Gillco Meraqui · Sector 126</span></div></div>
        </section>

        <section className="video-band">
          <div className="video-poster"><img src={storage.generatedHero} alt="Atmospheric view of a landscaped residence" /><div className="video-shade" /></div>
          <div className="video-copy"><p className="eyebrow light">The Meraqui film</p><h2>Come home<br /><i>to a feeling.</i></h2><button className="button button-light" onClick={() => setShowVideo(true)}><Play size={14} fill="currentColor" /> Watch film</button></div>
        </section>

        <section className="amenities section" id="amenities">
          <div className="section-label"><span>03</span><span className="label-line" /><span>THE EVERYDAY, ELEVATED</span></div>
          <div className="amenities-heading"><div><p className="eyebrow">A life well-placed</p><h2>Days with<br /><i>better edges.</i></h2></div><p>From a morning lap in the pool to long evenings under the trees, the amenity landscape is designed to make everyday rituals feel a little more intentional.</p></div>
          <div className="amenity-grid"><article className="amenity-card large"><img src={storage.pool} alt="Landscaped pool courtyard" /><div><span>01 / WATER & WELLNESS</span><h3>The long blue line</h3><p>A pool, a quiet garden, and a slower start.</p></div></article><article className="amenity-card"><img src={storage.facade} alt="Clubhouse facade" /><div><span>02 / CLUBHOUSE</span><h3>Room to gather</h3><p>Spaces that move easily from coffee to conversation.</p></div></article><article className="amenity-card dark-card"><div className="card-mark">✦</div><span>03 / SPORTS & RECREATION</span><h3>Move<br />your way</h3><p>Thoughtful active spaces for unhurried routines and energetic days.</p><button className="text-link light-link" onClick={() => scrollTo("contact")}>Explore amenities <ArrowUpRight size={16} /></button></article></div>
        </section>

        <section className="plans section" id="plans">
          <div className="section-label"><span>04</span><span className="label-line" /><span>THE FLOOR PLAN LIBRARY</span></div>
          <div className="plans-heading"><div><p className="eyebrow">Five ways to come home</p><h2>Choose your<br /><i>right-sized</i> life.</h2></div><p>From the considered 3+1 BHK to the expansive 4 BHK, every plan is designed for flow, privacy, and a generous relationship with the outdoors.</p></div>
          <div className="plan-grid">{plans.map((plan, index) => <button className={index === 3 ? "plan-card featured" : "plan-card"} key={plan.size} onClick={() => setActivePlan(plan)}><div className="plan-image"><img src={plan.img} alt={`${plan.size} sq.ft. ${plan.type} floor plan`} /><span className="plan-open"><Maximize2 size={15} /></span></div><div className="plan-meta"><span>{plan.type}</span><strong>{plan.size}<small> sq.ft.</small></strong><em>{plan.note}</em></div></button>)}</div>
          <div className="plan-foot"><span>All plans are indicative. Dimensions and specifications subject to final approval.</span><button className="text-link" onClick={() => scrollTo("contact")}>Request the complete plan set <ArrowUpRight size={16} /></button></div>
        </section>

        <section className="master section" id="location"><div className="master-image"><img src={storage.master} alt="Gillco Meraqui master plan" /><span className="master-stamp">MASTER<br />PLAN</span></div><div className="master-copy"><p className="eyebrow">05 / THE BIGGER PICTURE</p><h2>Close to the<br /><i>city,</i> away from<br />the noise.</h2><p>On Airport Road in Sector 126, Meraqui sits in the middle of Mohali's next chapter — connected to Chandigarh, the airport corridor, and the everyday essentials that make a location feel like home.</p><div className="location-list"><div><strong>03.5 km</strong><span>to Chandigarh</span></div><div><strong>15 min</strong><span>to international airport</span></div><div><strong>2 highways</strong><span>at your doorstep</span></div></div><button className="button button-dark" onClick={() => scrollTo("contact")}>Plan a private visit <ArrowUpRight size={16} /></button></div></section>

        <section className="contact section" id="contact"><div className="contact-copy"><p className="eyebrow">The next step is personal</p><h2>See the space<br /><i>for yourself.</i></h2><p>Request a private appointment, the complete floor plan set, or a conversation about your preferred residence.</p><div className="contact-details"><a href="tel:+919779799705"><Phone size={16} /> +91 97797 99705</a><span><MapPin size={16} /> Sector 126, Airport Road, Mohali</span></div></div><form className="enquiry-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you. Our team will be in touch shortly.'); }}><label>Your name<input required placeholder="Enter your name" /></label><label>Phone number<input required placeholder="+91" /></label><label>What are you looking for?<select defaultValue=""><option value="" disabled>Select an option</option><option>Floor plans</option><option>Site visit</option><option>Project details</option></select></label><button className="button button-brass" type="submit">Send enquiry <ArrowUpRight size={16} /></button><small>By submitting, you agree to be contacted about Gillco Meraqui. Price: On Request.</small></form></section>
      </main>

      <SiteFooter />
      <ContactDock />
      <LeadPopup />

      {activePlan && <div className="modal" onClick={() => setActivePlan(null)}><div className="modal-card" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setActivePlan(null)}><X /></button><div className="modal-image"><img src={activePlan.img} alt={`${activePlan.size} sq.ft. floor plan`} /></div><div className="modal-info"><span>{activePlan.type}</span><h3>{activePlan.size} <small>sq.ft.</small></h3><p>{activePlan.note}. Request the complete specification set from our team.</p><button className="button button-dark" onClick={() => { setActivePlan(null); scrollTo('contact'); }}>Request details <ArrowUpRight size={16} /></button></div></div></div>}
      {showVideo && <div className="modal video-modal" onClick={() => setShowVideo(false)}><div className="video-frame" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowVideo(false)}><X /></button><video src={storage.video} controls autoPlay playsInline /></div></div>}
    </div>
  );
}
