/* Editorial Garden Modernism: branded recovery route that keeps users inside the Gillco Meraqui information ecosystem. */
import { ArrowUpRight, Map } from 'lucide-react';
import { Link } from 'wouter';
import { SiteHeader } from '@/components/SiteChrome';
import { ContactDock } from '@/components/ExpansionBlocks';
import { LeadPopup, SiteFooter } from '@/components/FinalChrome';

export default function NotFound(){ return <div className="internal-page"><SiteHeader/><main className="not-found-page"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>This address<br/>has <i>moved on.</i></h1><p>The page may have changed, or the link may no longer be current. Use the project sitemap or return to the Gillco Meraqui homepage to keep exploring.</p><div><Link href="/" className="button button-dark">Return home <ArrowUpRight size={15}/></Link><Link href="/sitemap" className="text-link">View all pages <Map size={15}/></Link></div></main><SiteFooter/><ContactDock/><LeadPopup/></div> }
