const whatsappBrandAsset = '/manus-storage/whatsapp-brand-icon_8319cecb.png';

export function WhatsAppIcon({ size = 20 }: { size?: number }){ return <img className="official-whatsapp-icon" src={whatsappBrandAsset} alt="" aria-hidden="true" style={{ width:size, height:size }} /> }
