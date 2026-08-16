# Gillco Meraqui Domain Connection Note

The website has been prepared for the canonical public domain **https://www.gillcomeraqui-mohali.com**. The canonical tag, Open Graph URL, XML sitemap, `robots.txt`, and `llms.txt` already use this address.

## Connection steps

| Step | Action |
|---|---|
| 1 | Create a final website checkpoint, then select **Publish** from the project interface. |
| 2 | Open **Settings → Domains** in the website management panel. |
| 3 | Add `www.gillcomeraqui-mohali.com` as the custom domain and follow the DNS record instructions shown there. |
| 4 | Add the required DNS record at the domain registrar, then wait for the management panel to confirm verification and SSL provisioning. |
| 5 | Set the `www` hostname as the primary domain. If the registrar allows it, redirect the root domain `gillcomeraqui-mohali.com` to the `www` hostname. |
| 6 | After the domain is live, submit `https://www.gillcomeraqui-mohali.com/sitemap.xml` in Google Search Console and check `https://www.gillcomeraqui-mohali.com/robots.txt` and `https://www.gillcomeraqui-mohali.com/llms.txt`. |

## Files ready at the site root

| Path | Purpose |
|---|---|
| `/favicon.ico` | Gillco-logo browser and bookmark icon. |
| `/robots.txt` | Allows public crawling, excludes Thank You and API paths, and declares the XML sitemap. |
| `/sitemap.xml` | XML sitemap covering 75 public URLs. |
| `/llms.txt` | Concise project context and key links for AI answer engines. |
