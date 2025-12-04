import React from "react";
import "../stylesheet/landing.css";

export default function LandingPage() {
  return (
    <div className="landing-page">

      {/* HERO SECTION */}
      <section className="hero-hero">
        <div className="hero-floating">
          <img
            className="float f1"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnk8gXM2RkrstjHDH_E0OQKtZydStQ7DOgyqNTezJUDPU-dgVJ7mnXqzMjAuXH1OVkKLPZ0UYoF4gTnzQzjNaIXlZekJtQS0DuVNc2EkBPjNm2S-oG7pQKCsOU_YlPEAFnB7Gmi9VOIN3OiBaH-uUL0EREUoq14KZ1msOnWdkub01vowL02dH6Noj1nO00VtkoXobPNIxhF6mE37s9ypQxmPyF6sF2m_ZSrPeIaaJgVOcy8JjtjhY6-cR40YnlmRS3a9O_fR-ygaHF"
            alt="floating gadget 1"
          />
          <img
            className="float f2"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz19EdjLd_wfilzeSGC-Pj6AQkjeX8FrbmmG3d0yVjJzP98n9HvJSBHCpkJEaN6jfPwl-bdemE3puh4Lda43gQFEFUiLbi2gN1xJ5MfIA6_QFBkBq-WBCfulQroM_jI0Xwmvmw2497z3s2PvJez8lX67s9UYo988olsW2S86vvH9wQ9jhn0Sn0mAGLkHNIjTLi_AZrxbbWHLepf7fRs2Gra7BW_q6P3Jays7qCk0Rg0BvVFWPYMrV_fzs4LvMclj2tfne5jSagP4CP"
            alt="floating gadget 2"
          />
          <img
            className="float f3"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt_o1oHbYaEil-DE0Ip9lc6fI-8j3C5YlQI8J5szfmPOyVK1yU8yaCUNBOO43GR3Nw4XWarmLdhfnxjhuQcpH7dLKXniG71bwszMBPQYwnwjPxSZJzc_-tyYzR-SQ9Je7C_SxWS64O110bHeAna_FDrIzW4fnd36uoTFT6aeIgNgjMvs2-H7uDHbxg1ZBorJS1OGiZb-K9SjkpYSx9SCvPBXRP1LjsS1oHRP88t0pW3sDJHUdA14ccMQ1tMnGvyLK2DmSPh5qZrReX"
            alt="floating gadget 3"
          />
          <img
            className="float f4"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJQIzOoxMLBz3_4Pqe09sJJYCHYdtG_fOF73zZP6Lhnh3VJ4-NDB9kZZaZ6qBsfqfs9NqJwDeL54Fp_f795NwwyuwKISWs6CCrsYek-9SptedMa5CZ69KmnXJSmABJj_d1SknpnO0GdE4e3JU_TD4_wvLUFQtHqKBHTK6qQAPQjjOPsQ5RG3IB7IXfvaKkvP-57aJ9vuwyc4vFSw_qQ5xcmcUGVs95qPJkUXRkXfkclXYRdP5hdKJ2JJS6q-gL2ve-FY0oYLRUE_wM"
            alt="floating gadget 4"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">GetEverythingHere</h1>
          <p className="hero-sub">
            <b>Just what you need:</b> your tech, your style, your world.
          </p>
          <a className="hero-cta" href="/store">
            Explore Store
          </a>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="about-section" id="about">
        <div className="about-inner">
          <div className="about-text">
            <h2>About Us</h2>
            <h3>Empowering Your Digital Life</h3>
            <p>
              At GetEverythingHere, we curate the latest in technology — from
              smartphones to smart home devices — delivering quality products
              and great service across Ghana.
            </p>
          </div>

          <div className="about-cards">

            {/* Our Mission Card */}
            <div className="about-card">
              <div
                className="about-img"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnk8gXM2RkrstjHDH_E0OQKtZydStQ7DOgyqNTezJUDPU-dgVJ7mnXqzMjAuXH1OVkKLPZ0UYoF4gTnzQzjNaIXlZekJtQS0DuVNc2EkBPjNm2S-oG7pQKCsOU_YlPEAFnB7Gmi9VOIN3OiBaH-uUL0EREUoq14KZ1msOnWdkub01vowL02dH6Noj1nO00VtkoXobPNIxhF6mE37s9ypQxmPyF6sF2m_ZSrPeIaaJgVOcy8JjtjhY6-cR40YnlmRS3a9O_fR-ygaHF')",
                }}
              />
              <div className="about-info">
                <h4>Our Mission</h4>
                <p>
                  To be the leading provider of innovative tech solutions in
                  Ghana, empowering individuals and businesses with
                  cutting-edge technology.
                </p>
              </div>
            </div>

            {/* Our Vision Card */}
            <div className="about-card">
              <div
                className="about-img"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAz19EdjLd_wfilzeSGC-Pj6AQkjeX8FrbmmG3d0yVjJzP98n9HvJSBHCpkJEaN6jfPwl-bdemE3puh4Lda43gQFEFUiLbi2gN1xJ5MfIA6_QFBkBq-WBCfulQroM_jI0Xwmvmw2497z3s2PvJez8lX67s9UYo988olsW2S86vvH9wQ9jhn0Sn0mAGLkHNIjTLi_AZrxbbWHLepf7fRs2Gra7BW_q6P3Jays7qCk0Rg0BvVFWPYMrV_fzs4LvMclj2tfne5jSagP4CP')",
                }}
              />
              <div className="about-info">
                <h4>Our Vision</h4>
                <p>
                  To create a future where technology seamlessly integrates into
                  every aspect of life, making it more connected, efficient, and
                  enjoyable.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section className="services-section" id="services">
        <div className="services-inner">
          <h2>Our Services</h2>

          <div className="services-grid">

            <div className="service">
              <div
                className="service-img"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAt_o1oHbYaEil-DE0Ip9lc6fI-8j3C5YlQI8J5szfmPOyVK1yU8yaCUNBOO43GR3Nw4XWarmLdhfnxjhuQcpH7dLKXniG71bwszMBPQYwnwjPxSZJzc_-tyYzR-SQ9Je7C_SxWS64O110bHeAna_FDrIzW4fnd36uoTFT6aeIgNgjMvs2-H7uDHbxg1ZBorJS1OGiZb-K9SjkpYSx9SCvPBXRP1LjsS1oHRP88t0pW3sDJHUdA14ccMQ1tMnGvyLK2DmSPh5qZrReX')",
                }}
              />
              <h4>Expert Tech Support</h4>
              <p>
                Get personalized assistance from our tech experts to help you
                choose the right products and troubleshoot any issues.
              </p>
            </div>

            <div className="service">
              <div
                className="service-img"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJQIzOoxMLBz3_4Pqe09sJJYCHYdtG_fOF73zZP6Lhnh3VJ4-NDB9kZZaZ6qBsfqfs9NqJwDeL54Fp_f795NwwyuwKISWs6CCrsYek-9SptedMa5CZ69KmnXJSmABJj_d1SknpnO0GdE4e3JU_TD4_wvLUFQtHqKBHTK6qQAPQjjOPsQ5RG3IB7IXfvaKkvP-57aJ9vuwyc4vFSw_qQ5xcmcUGVs95qPJkUXRkXfkclXYRdP5hdKJ2JJS6q-gL2ve-FY0oYLRUE_wM')",
                }}
              />
              <h4>Fast & Reliable Delivery</h4>
              <p>
                Enjoy fast and reliable delivery across Ghana, ensuring your
                gadgets arrive safely and on time.
              </p>
            </div>

            <div className="service">
              <div
                className="service-img"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbT84tDcRQCaqFHyHpGpMiGgqevH0VH16e6l9lq3G3rq5iYIAJ_vj18Gzg2sPrRi_t1OMOZwpxKHU8SPxpYLd2z1v0zNQUXbCb9FYHMK8yRHdx5VmiEK1Y7OjiJJxp-lcv6wYr3h_a2sCuRqT6LGnrr_1OPzUWOsXdNUViIXR-KQE8RN7JkfNIMb8MAowCnvOYY1Q_12HdrA1obLQUyk1HWU5ajWHLG73JkyAWf01kmYl-WkRI_mlYTY3s3cJnMW7OGvtxyXl4eRQF')",
                }}
              />
              <h4>Hassle-Free Returns</h4>
              <p>
                Shop with confidence knowing you can return products easily if
                they don’t meet your expectations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Have a question or need assistance? Reach out to us.</p>

        <form
          className="contact-box"
          onSubmit={(e) => {
            e.preventDefault();
            const name = e.target[0].value;
            const message = e.target[1].value;
            const subject = encodeURIComponent("Inquiry from Website");
            const body = encodeURIComponent(`Name: ${name}\nMessage: ${message}`);
            window.location.href = `mailto:sbrayka19@gmail.com?subject=${subject}&body=${body}`;
          }}
        >
          <input type="text" placeholder="Your Name" required />
          <textarea placeholder="Your Message" rows="5" required />

          <div className="contact-buttons">
            <button className="btn-submit" type="submit">
              Submit
            </button>
            <button
              type="button"
              className="btn-whatsapp"
              onClick={() =>
                window.open(
                  "https://wa.me/233547149360?text=Hello!%20I%20would%20like%20to%20inquire.",
                  "_blank"
                )
              }
            >
              Contact via WhatsApp
            </button>
          </div>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#4B2E2A] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center gap-6">
          {/* Social Icons */}
          <div className="flex gap-6">
            <a
              href="https://twitter.com/YourUsername"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:-translate-y-1 transition"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg"
                alt="Twitter"
                className="w-6 h-6 filter brightness-0 invert"
              />
            </a>

            <a
              href="https://facebook.com/YourUsername"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:-translate-y-1 transition"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
                alt="Facebook"
                className="w-6 h-6 filter brightness-0 invert"
              />
            </a>

            <a
              href="https://instagram.com/YourUsername"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:-translate-y-1 transition"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
                alt="Instagram"
                className="w-6 h-6 filter brightness-0 invert"
              />
            </a>
          </div>

          {/* Footer Text */}
          <div className="text-sm text-center opacity-90">
            © 2025 Digital Hub Ghana. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );        
}          
