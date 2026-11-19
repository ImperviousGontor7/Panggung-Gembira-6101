function Footer() {
  return (
    <footer className="relative mt-8 border-t border-(--border-glass) bg-choco">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-14 xl:px-20 2xl:px-24">
        {/* MOBILE VERSION */}
        <div className="md:hidden">
          <div className="mb-5">
            <h3 className="font-(--font-main) text-[clamp(1.6rem,7vw,2.2rem)] mb-5 leading-none tracking-tight text-(--text-main)">
              Panggung Gembira
            </h3>

              <p className="max-w-2xl text-justify text-[clamp(0.95rem,1.3vw,1.25rem)] leading-[1.9] text-(--text-h)">
                Panggung Gembira 6101 – Impervious Generation merupakan
                perwujudan kreativitas, semangat, dan dedikasi generasi muda
                dalam menghadirkan sebuah mahakarya. Melalui seni, budaya,
                dan kebersamaan, kami mengabadikan setiap proses menjadi
                bagian dari sejarah dan kenangan yang tak terlupakan.
              </p>
          </div>

          <div className="grid grid-cols-3 gap-x-4 gap-y-4">
            <a href="/our-team" className="flex items-center gap-2 text-[0.9rem] text-(--text-main) transition-all duration-300 hover:translate-x-0.5 hover:text-(--text-main)" aria-label="Our Team">
              <i className="fas fa-user-group w-4 text-center text-base" />
              <span className="truncate">Our Team</span>
            </a>

            <a href="/faq" className="flex items-center gap-2 text-[0.9rem] text-(--text-main) transition-all duration-300 hover:translate-x-0.5 hover:text-(--text-main)" aria-label="FAQ">
              <i className="fas fa-circle-question w-4 text-center text-base" />
              <span className="truncate">FAQ</span>
            </a>

            <a href="/support-center" className="flex items-center gap-2 text-[0.9rem] text-(--text-main) transition-all duration-300 hover:translate-x-0.5 hover:text-(--text-main)" aria-label="Support Center">
              <i className="fas fa-headset w-4 text-center text-base" />
              <span className="truncate">Support</span>
            </a>

            <a href="/privacy-policy" className="flex items-center gap-2 text-[0.9rem] text-(--text-main) transition-all duration-300 hover:translate-x-0.5 hover:text-(--text-main)" aria-label="Privacy Policy">
              <i className="fas fa-shield-halved w-4 text-center text-base" />
              <span className="truncate">Privacy</span>
            </a>

            <a href="https://www.instagram.com/impervious_generation.g7/?__d=1%2F" className="flex items-center gap-2 text-[0.9rem] text-(--text-main) transition-all duration-300 hover:translate-x-0.5 hover:text-(--text-main)" aria-label="Instagram Official" rel="noopener noreferrer" target="_blank">
              <i className="fab fa-instagram w-4 text-center text-base" />
              <span className="truncate">Instagram</span>
            </a>

            <a href="https://www.youtube.com/@gontortv" className="flex items-center gap-2 text-[0.9rem] text-(--text-main) transition-all duration-300 hover:translate-x-0.5 hover:text-(--text-main)" aria-label="Gontortv Official" rel="noopener noreferrer" target="_blank">
              <i className="fab fa-youtube w-4 text-center text-base" />
              <span className="truncate">YouTube</span>
            </a>

            <a href="https://wa.me/6281547212932?text=Halo%20saya%20mau%20tanya" className="flex items-center gap-2 text-[0.9rem] text-(--text-main) transition-all duration-300 hover:translate-x-0.5 hover:text-(--text-main)" aria-label="WhatsApp Official" rel="noopener noreferrer" target="_blank">
              <i className="fab fa-whatsapp w-4 text-center text-base" />
              <span className="truncate">WhatsApp</span>
            </a>

            <a href="https://imperviousgeneration.my.id/" className="flex items-center gap-2 text-[0.9rem] text-(--text-main) transition-all duration-300 hover:translate-x-0.5 hover:text-(--text-main)" aria-label="Impervious Main Campus" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-globe w-4 text-center text-base" />
              <span className="truncate">Website</span>
            </a>
          </div>

          <p className="mt-5 overflow-hidden text-ellipsis pt-4 text-[0.72rem] uppercase tracking-[0.14em] text-(--text-muted)">
            Pondok Modern Darussalam Gontor Kampus 7, Kalianda, Lampung Selatan.
          </p>

          <div className="mt-4 border-t border-(--border-glass) pt-4 text-[0.7rem] uppercase tracking-[0.14em] text-(--text-muted)">
            <div>&copy; 1448 H / 2027 M PANGGUNG GEMBIRA 6101 - IMPERVIOUS GENERATION</div>
            <div className="mt-2">Multimedia Gontor 7</div>
          </div>
        </div>

        {/* DESKTOP / TABLET VERSION */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 xl:grid-cols-[2fr_1fr_1fr_1fr] xl:gap-10">
            <div className="f-brand">
              <h3 className="mb-4 font-(--font-main) text-[clamp(2rem,4vw,3.75rem)] leading-none tracking-tight text-(--text-main)">
                Panggung Gembira
              </h3>

              <p className="max-w-2xl text-justify text-[clamp(0.95rem,1.3vw,1.25rem)] leading-[1.9] text-(--text-h)">
                Panggung Gembira 6101 – Impervious Generation merupakan
                perwujudan kreativitas, semangat, dan dedikasi generasi muda
                dalam menghadirkan sebuah mahakarya. Melalui seni, budaya,
                dan kebersamaan, kami mengabadikan setiap proses menjadi
                bagian dari sejarah dan kenangan yang tak terlupakan.
              </p>
            </div>

            <div className="f-col">
              <h5 className="mb-4 py-1 font-(--font-lato) text-[clamp(1rem,1.4vw,1.35rem)] uppercase tracking-[0.18em] text-(--text-main)">
                Navigation
              </h5>

              <div className="space-y-3">
                <a href="/our-team" className="group flex items-center gap-3 text-[clamp(0.95rem,1.2vw,1.15rem)] text-(--text-muted) transition-all duration-300 hover:translate-x-1 hover:text-(--text-main) focus-visible:translate-x-1 focus-visible:text-(--text-main) focus-visible:outline-none">
                  <i className="fas fa-user-group w-5 text-center transition-transform duration-300 group-hover:scale-110" />
                  <span>Our Team</span>
                </a>

                <a href="/faq" className="group flex items-center gap-3 text-[clamp(0.95rem,1.2vw,1.15rem)] text-(--text-muted) transition-all duration-300 hover:translate-x-1 hover:text-(--text-main) focus-visible:translate-x-1 focus-visible:text-(--text-main) focus-visible:outline-none">
                  <i className="fas fa-circle-question w-5 text-center transition-transform duration-300 group-hover:scale-110" />
                  <span>FAQ</span>
                </a>

                <a href="/support-center" className="group flex items-center gap-3 text-[clamp(0.95rem,1.2vw,1.15rem)] text-(--text-muted) transition-all duration-300 hover:translate-x-1 hover:text-(--text-main) focus-visible:translate-x-1 focus-visible:text-(--text-main) focus-visible:outline-none">
                  <i className="fas fa-headset w-5 text-center transition-transform duration-300 group-hover:scale-110" />
                  <span>Support Center</span>
                </a>

                <a href="/privacy-policy" className="group flex items-center gap-3 text-[clamp(0.95rem,1.2vw,1.15rem)] text-(--text-muted) transition-all duration-300 hover:translate-x-1 hover:text-(--text-main) focus-visible:translate-x-1 focus-visible:text-(--text-main) focus-visible:outline-none">
                  <i className="fas fa-shield-halved w-5 text-center transition-transform duration-300 group-hover:scale-110" />
                  <span>Privacy Policy</span>
                </a>
              </div>
            </div>

            <div className="f-col">
              <h5 className="mb-4 py-1 font-(--font-lato) text-[clamp(1rem,1.4vw,1.35rem)] uppercase tracking-[0.18em] text-(--text-main)">
                Social Links
              </h5>

              <div className="space-y-3">
                <a href="https://www.instagram.com/impervious_generation.g7/?__d=1%2F" className="group flex items-center gap-3 text-[clamp(0.95rem,1.2vw,1.15rem)] text-(--text-muted) transition-all duration-300 hover:translate-x-1 hover:text-(--text-main) focus-visible:translate-x-1 focus-visible:text-(--text-main) focus-visible:outline-none" rel="noopener noreferrer" target="_blank">
                  <i className="fab fa-instagram w-5 text-center transition-transform duration-300 group-hover:scale-110" />
                  <span>Instagram Official</span>
                </a>

                <a href="https://www.youtube.com/@gontortv" className="group flex items-center gap-3 text-[clamp(0.95rem,1.2vw,1.15rem)] text-(--text-muted) transition-all duration-300 hover:translate-x-1 hover:text-(--text-main) focus-visible:translate-x-1 focus-visible:text-(--text-main) focus-visible:outline-none" rel="noopener noreferrer" target="_blank">
                  <i className="fab fa-youtube w-5 text-center transition-transform duration-300 group-hover:scale-110" />
                  <span>Gontortv Official</span>
                </a>

                <a href="https://wa.me/6281547212932?text=Halo%20saya%20mau%20tanya" className="group flex items-center gap-3 text-[clamp(0.95rem,1.2vw,1.15rem)] text-(--text-muted) transition-all duration-300 hover:translate-x-1 hover:text-(--text-main) focus-visible:translate-x-1 focus-visible:text-(--text-main) focus-visible:outline-none" rel="noopener noreferrer" target="_blank">
                  <i className="fab fa-whatsapp w-5 text-center transition-transform duration-300 group-hover:scale-110" />
                  <span>WhatsApp Official</span>
                </a>

                <a href="https://imperviousgeneration.my.id/" className="group flex items-center gap-3 text-[clamp(0.95rem,1.2vw,1.15rem)] text-(--text-muted) transition-all duration-300 hover:translate-x-1 hover:text-(--text-main) focus-visible:translate-x-1 focus-visible:text-(--text-main) focus-visible:outline-none" target="_blank" rel="noopener noreferrer">
                  <i className="fa-solid fa-globe w-5 text-center transition-transform duration-300 group-hover:scale-110" />
                  <span>Impervious Main Campus</span>
                </a>
              </div>
            </div>

            <div className="f-col">
              <h5 className="mb-4 py-1 font-(--font-lato) text-[clamp(1rem,1.4vw,1.35rem)] uppercase tracking-[0.18em] text-(--text-main)">
                Location
              </h5>

              <p className="max-w-sm text-justify text-[clamp(0.95rem,1.2vw,1.15rem)] leading-[1.9] text-(--text-muted)">
                Pondok Modern Darussalam Gontor Kampus 7, Kubu Panglima,
                Tajimalela, Kalianda, Kabupaten Lampung Selatan, Lampung.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-(--border-glass) pt-5 text-[clamp(0.7rem,0.9vw,0.95rem)] uppercase tracking-[0.16em] text-(--text-muted) sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; 1448 H / 2027 M PANGGUNG GEMBIRA 6101 - IMPERVIOUS GENERATION GONTOR 7</span>
            <span>Multimedia Gontor 7</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;