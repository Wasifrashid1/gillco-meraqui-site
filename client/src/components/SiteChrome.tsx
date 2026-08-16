/* Editorial Garden Modernism: shared navigation and carousel primitives keep the 50-page experience coherent, legible, and tactile. */
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Menu, X, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "wouter";

export const meraquiNav = [
  ['Overview','/gillco-meraqui-overview'],['Master plan','/gillco-meraqui-master-plan'],['Floor plans','/gillco-meraqui-floor-plans'],['3+1 BHK','/3-bhk-flats-gillco-meraqui'],['4 BHK','/4-bhk-flats-gillco-meraqui'],['Amenities','/gillco-meraqui-amenities'],['Location','/gillco-meraqui-location'],['Price & cost sheet','/gillco-meraqui-price'],['Payment plan','/gillco-meraqui-payment-plan'],['RERA approval','/gillco-meraqui-rera-approved'],['Gallery','/gillco-meraqui-gallery'],['Video walkthrough','/gillco-meraqui-video-walkthrough'],['Virtual tour','/gillco-meraqui-virtual-tour'],['Brochure','/gillco-meraqui-brochure'],['Book a site visit','/gillco-meraqui-book-site-visit'],['FAQ','/gillco-meraqui-faq']
] as const;
export const groupNav = [['About Gillco Group','/gillco-group-about'],['Legacy projects','/gillco-group-projects'],['Why invest in Meraqui','/gillco-meraqui-investment-benefits'],['Contact Gillco Meraqui','/contact-gillco-meraqui'],['Journal: Airport Road','/blog/airport-road-mohali-real-estate-hotspot'],['Journal: 25-year legacy','/blog/gillco-group-25-years-legacy']] as const;

export function SiteHeader(){
  const [open,setOpen]=useState<string|null>(null); const [mobile,setMobile]=useState(false); const [location]=useLocation();
  const goBack = () => { if (window.history.length > 1) window.history.back(); else window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const isHomepage = location === '/';
  const brand = <Link href="/" className="brand" aria-label="Gillco Group home"><img src="/manus-storage/gillco-logo-original_0766c458.png" alt="Gillco Group" className="brand-logo" /></Link>;
  const navigation = <nav className={mobile?'nav open':'nav'} aria-label="Primary navigation"><div className="nav-dropdown"><button aria-expanded={open==='meraqui'} onClick={()=>setOpen(open==='meraqui'?null:'meraqui')}>Meraqui <ChevronDown size={14}/></button>{open==='meraqui'&&<div className="dropdown-panel">{meraquiNav.map(([label,href])=><Link className={location===href?'active':''} key={href} href={href} onClick={()=>{setOpen(null);setMobile(false)}}>{label}</Link>)}</div>}</div><div className="nav-dropdown"><button aria-expanded={open==='group'} onClick={()=>setOpen(open==='group'?null:'group')}>Gillco Group <ChevronDown size={14}/></button>{open==='group'&&<div className="dropdown-panel group-panel">{groupNav.map(([label,href])=><Link className={location===href?'active':''} key={href} href={href} onClick={()=>{setOpen(null);setMobile(false)}}>{label}</Link>)}</div>}</div><Link href="/gillco-meraqui-amenities" onClick={()=>setMobile(false)}>Amenities</Link><Link href="/journal" onClick={()=>setMobile(false)}>Journal</Link><Link href="/sitemap" onClick={()=>setMobile(false)}>All pages</Link><Link className="nav-cta" href="/contact-gillco-meraqui" onClick={()=>setMobile(false)}>Enquire now <ArrowUpRight size={15}/></Link></nav>;
  return <header className={`site-header ${isHomepage ? 'home-header' : ''}`}>{isHomepage && brand}{!isHomepage && <button className="global-back" onClick={goBack} aria-label="Go back"><ArrowLeft size={15}/><span>Back</span></button>}{!isHomepage && brand}{navigation}<button className="menu-toggle" onClick={()=>setMobile(!mobile)} aria-label="Toggle navigation">{mobile?<X/>:<Menu/>}</button></header>
}

export const carouselAssets = [
  ['/manus-storage/meraqui-architecture_2a0a8e4c.jpg','Gillco Meraqui contemporary architectural exterior'],
  ['/manus-storage/meraqui-garden_2b491524.png','Gillco Meraqui landscaped garden promenade'],
  ['/manus-storage/meraqui-pool_e560bf19.png','Gillco Meraqui resort-style pool and private cabanas'],
  ['/manus-storage/meraqui-yoga-lawn_2983fb32.png','Gillco Meraqui yoga lawn and wellbeing setting'],
  ['/manus-storage/meraqui-editorial_6d04c439.jpg','Gillco Meraqui editorial lifestyle visual'],
  ['/manus-storage/carousel-meraqui-exterior_5bc99d66.avif','Gillco Meraqui residential exterior on Airport Road'],
  ['/manus-storage/carousel-lifestyle-pool_f26af76c.jpg','Meraqui poolside landscape and private pavilion'],
  ['/manus-storage/carousel-tower-aerial_4dd41b6f.jpg','Meraqui tower and landscaped arrival court'],
  ['/manus-storage/meraqui-arrival_7a2cecde.webp','Meraqui architectural arrival and facade'],
  ['/manus-storage/clubhouse-facade_94904d49.webp','Meraqui clubhouse facade and amenity frontage'],
  ['/manus-storage/meraqui-pool-courtyard_c9f3cb09.jpg','Meraqui landscaped pool courtyard'],
];

export function Carousel({title,cover}:{title:string;cover?:string}){
  const assets = useMemo(()=>{const usableCover = cover && !cover.toLowerCase().endsWith('.mp4') ? cover : undefined; const base = usableCover ? [[usableCover,`${title} cover image`]] : []; return [...base,...carouselAssets.filter(a=>a[0]!==usableCover)].slice(0,5)},[cover,title]);
  const [index,setIndex]=useState(0); useEffect(()=>{const timer=window.setInterval(()=>setIndex(i=>(i+1)%assets.length),5200);return()=>window.clearInterval(timer)},[assets.length]);
  if(!assets.length)return null; const [src,alt]=assets[index];
  return <section className="page-carousel" aria-label={`${title} image carousel`}><div className="carousel-frame"><img src={src} alt={alt}/><button className="carousel-arrow prev" aria-label="Previous image" onClick={()=>setIndex((index-1+assets.length)%assets.length)}><ChevronLeft/></button><button className="carousel-arrow next" aria-label="Next image" onClick={()=>setIndex((index+1)%assets.length)}><ChevronRight/></button><div className="carousel-caption"><span>{String(index+1).padStart(2,'0')} / {String(assets.length).padStart(2,'0')}</span><span>{title}</span></div></div><div className="carousel-dots">{assets.map((_,i)=><button key={i} className={i===index?'active':''} aria-label={`Show image ${i+1}`} onClick={()=>setIndex(i)}/>)}</div></section>
}
