export const siteConfig = {
  name:        'Aktay Law Firm',
  nameAr:      'مكتب أكتاي للمحاماة',
  url:         'https://www.aktaylawfirm.com',
  phone:       '+201101107788',
  email:       'info@aktaylawfirmeg.com',
  address:     '103 Narges 1, New Cairo, Egypt',
  addressAr:   '103 نرجس 1، القاهرة الجديدة، مصر',
  logo:        'https://www.aktaylawfirm.com/logo.png',
  founded:     '2004',
  lat:         30.0252132,
  lng:         31.4579182,
  socials: {
    facebook:  'https://www.facebook.com/share/1E3TakzbZv/',
    instagram: 'https://www.instagram.com/aktay.law.firm',
    youtube:   'https://youtube.com/@aktaylawfirm',
  },
};

export function buildTitle(page: string, locale: string): string {
  return locale === 'ar'
    ? `${page} | مكتب أكتاي للمحاماة`
    : `${page} | Aktay Law Firm — Cairo, Egypt`;
}