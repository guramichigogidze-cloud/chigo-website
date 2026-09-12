(() => {
  'use strict';
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const ka = Object.fromEntries(nodes.map(node => [node.dataset.i18n,node.textContent]));
  const en = {
    heroTitle:'Canvas printing in Batumi',brandNote:'Your memories on canvas',
    service1:'From photos to canvas',service2:'A thoughtful gift',service3:'For your home and office',service4:'High-quality printing',
    batumi:'Batumi',pricesTitle:'Sizes / Prices',order:'Order on WhatsApp',footerNote:'Photos • Memories • Emotions • Canvas',contactCue:'Contact'
  };
  const descriptions = {ka:document.querySelector('meta[name=description]').content,en:'Canvas printing in Batumi — CHIGO Printing Studio. Canvas prints, sizes, prices and orders via WhatsApp or Messenger.'};
  const imageAlts = {ka:['ტილოზე დაბეჭდილი ფოტო','ოჯახური ფოტო ტილოზე','პეიზაჟი ტილოზე'],en:['Sample photo for a canvas print','Sample family photo for a canvas print','Sample landscape for a canvas print']};
  function setLanguage(lang) {
    lang = lang === 'en' ? 'en' : 'ka';
    const dictionary = lang === 'en' ? en : ka;
    nodes.forEach(node => { node.textContent = dictionary[node.dataset.i18n]; });
    document.documentElement.lang = lang;
    document.title = lang === 'en' ? 'Canvas printing in Batumi | CHIGO Printing Studio' : 'ტილოზე ბეჭდვა ბათუმში | CHIGO Printing Studio';
    document.querySelector('meta[name=description]').content = descriptions[lang];
    document.querySelector('.lang-switch').setAttribute('aria-label',lang === 'en' ? 'Choose language' : 'ენის არჩევა');
    document.querySelector('.poster-card').setAttribute('aria-label',dictionary.heroTitle);
    document.querySelector('.brand-panel').setAttribute('aria-label',lang === 'en' ? 'CHIGO brand panel' : 'CHIGO ბრენდის პანელი');
    document.querySelectorAll('.sample-card img').forEach((image,index) => image.alt=imageAlts[lang][index]);
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.lang === lang)));
    document.querySelector('#georgian-title').hidden = lang === 'en';
    document.querySelector('#page-title').classList.toggle('visually-hidden',lang === 'ka');
    try { localStorage.setItem('chigo-language',lang); } catch {}
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click',() => setLanguage(button.dataset.lang)));
  try { if(localStorage.getItem('chigo-language') === 'en') setLanguage('en'); } catch {}

  const contactCue = document.querySelector('.mobile-contact-cue');
  const contact = document.querySelector('#contact');
  const mobile = window.matchMedia('(max-width: 900px)');
  let updatePending = false;
  function updateContactCue() {
    updatePending = false;
    contactCue.hidden = !mobile.matches || contact.getBoundingClientRect().top <= window.innerHeight - 80;
  }
  function scheduleContactCue() {
    if (!updatePending) {
      updatePending = true;
      window.requestAnimationFrame(updateContactCue);
    }
  }
  window.addEventListener('scroll', scheduleContactCue, {passive:true});
  window.addEventListener('resize', scheduleContactCue);
  window.addEventListener('load', scheduleContactCue);
  if ('ResizeObserver' in window) new ResizeObserver(scheduleContactCue).observe(document.querySelector('.poster-card'));
  contactCue.addEventListener('click', () => contact.focus({preventScroll:true}));
  updateContactCue();
})();
