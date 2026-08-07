export const metadata = {
  title: "Contact | Akri Bakes",
};

export default function ContactPage() {
  return (
    <main>

      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">
            Contact
          </p>

          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">
            Contact Us
          </h1>

          <p className="mt-6 text-lg text-[#333333]">
            We&apos;d love to hear from you.
          </p>

        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">

          <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-10 shadow-sm">

            <div className="grid md:grid-cols-2 gap-10">

              <div>

                <h3 className="font-serif text-2xl font-semibold text-[#111111]">
                  Store Information
                </h3>

                <div className="mt-6 space-y-4 text-[#333333]">

                  <p>
                    📍 Zion Hospital Road, Purana Bazar,
                    Dimapur, Nagaland
                  </p>

                  <p>
                    📞 8259917757
                  </p>

                  <p>
                    ✉️ Akribake2020@gmail.com
                  </p>

                </div>

              </div>

              <div>

                <h3 className="font-serif text-2xl font-semibold text-[#111111]">
                  Business Hours
                </h3>

                <div className="mt-6 space-y-3 text-[#333333]">

                  <p>Monday - Saturday : 9:00 AM - 7:00 PM</p>

                  <p>Sunday : 10:00 AM - 4:00 PM</p>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#e5e5e5] bg-white shadow-sm">
            <div className="border-b border-[#e5e5e5] px-6 py-4">
              <h3 className="font-serif text-2xl font-semibold text-[#111111]">
                Find Us on the Map
              </h3>
            </div>

            <iframe
              title="Akri Bakes location map"
              src="https://www.google.com/maps?q=Zion%20Hospital%20Road%20Purana%20Bazar%20Dimapur%20Nagaland&output=embed"
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>

    </main>
  );
}
