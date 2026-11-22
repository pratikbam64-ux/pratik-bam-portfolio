/* ==================================================================
   CONFIGURATION: contact links, profile photo, book covers and links.
   Everything on the site that you may want to change lives in this file.
   Anything left empty is simply not shown, so the page never displays a
   broken link or a broken image.
   ================================================================== */

/* 1) CONTACT AND SOCIAL LINKS
   Each entry becomes an icon in the top section and a row in Contact.
   "type" picks the icon: email, whatsapp, instagram, facebook, linkedin,
   x, youtube, amazon, link.
   Links must start with https:// (or mailto: / tel:).
   "note" (optional) is the small line under the label. If left out, the
   web address is shown instead.
   The entry whose type is "amazon" is also used for the
   "Explore All My Books" button in the Books section.
   LinkedIn is intentionally not listed because no profile address was given. */
window.PORTFOLIO_CONTACT = [
  { type: "email",     label: "Email",               href: "mailto:pratikbam64@gmail.com" },
  { type: "whatsapp",  label: "WhatsApp",            href: "https://wa.me/971582930469", note: "Start a chat" },
  { type: "instagram", label: "Instagram",           href: "https://www.instagram.com/still_withinn", note: "@still_withinn" },
  { type: "facebook",  label: "Facebook",            href: "https://www.facebook.com/pra.tik.609781", note: "Facebook profile" },
  { type: "amazon",    label: "Amazon Author Page",  href: "https://www.amazon.com/author/pratikwrites", note: "amazon.com/author/pratikwrites" }
];

/* 2) YOUR PROFILE PHOTO
   Portrait JPG, about 900 x 1125 pixels (4:5), stored in the images folder.
   To change it, replace images/portrait.jpg or point to another file here. */
window.PORTFOLIO_PROFILE = {
  portrait: "images/portrait.jpg"
};

/* 3) BOOK COVERS AND AMAZON LINKS
   cover:  front cover image in images/covers/
   amazon: the book's Amazon page (opens in a new tab)
   The titles, order and cover proportions are set in js/main.js (BOOKS). */
window.PORTFOLIO_BOOKS = {
  loved:       { cover: "images/covers/loved.jpg",       amazon: "https://a.co/d/08Y72Sq3" },  // I Loved You Without Being Yours
  perspective: { cover: "images/covers/perspective.jpg", amazon: "https://a.co/d/0iKhxwaE" },  // Perhaps It's Your Perspective
  struggle:    { cover: "images/covers/struggle.jpg",    amazon: "https://a.co/d/013uUKdT" },  // From Struggle to Strength
  world:       { cover: "images/covers/world.jpg",       amazon: "https://a.co/d/08VwhyHF" },  // In a World Where You're Mine
  mind:        { cover: "images/covers/mind.jpg",        amazon: "https://a.co/d/02SlK6jK" },  // You Simply Cross My Mind
  bible:       { cover: "images/covers/bible.jpg",       amazon: "https://a.co/d/07tkq7i7" },  // The Bible Explained
  listen:      { cover: "images/covers/listen.jpg",      amazon: "https://a.co/d/0cf40m2d" },  // Listen, I Have Fallen in Love With You
  care:        { cover: "images/covers/care.jpg",        amazon: "https://a.co/d/0hRqjCST" },  // Take Care of Yourself
  between:     { cover: "images/covers/between.jpg",     amazon: "https://a.co/d/0h4lvK3w" }   // Somewhere Between Love and Letting Go
};
