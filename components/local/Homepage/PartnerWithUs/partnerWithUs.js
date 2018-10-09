// Partner with us main HTML body
const partnerWithUsHomepageHTML =
  "<div id='partner_with_us_homepage_body'>" +
  "<div id='partner_with_us_homepage_title_body'>" +
  "<div id='partner_with_us_homepage_title_text'>PARTNER WITH US</div>" +
  "</div>" +
  "<div id='partner_with_us_homepage_button_body'>" +
  "<div id='partner_with_us_homepage_button'>" +
  "<div id='partner_with_us_homepage_button_text'>LEARN MORE</div>" +
  "</div>" +
  "</div>" +
  "</div>";

// Create the partner with us section of the homepage
const addPartnerWithUsHomepage = () => {
  bodyPointer.insertAdjacentHTML("beforeend", partnerWithUsHomepageHTML);
};
