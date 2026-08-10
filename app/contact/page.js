export const metadata = {
  title: "Contact | Akri Bakes",
  description: "Contact Akri Bakes in Dimapur, Nagaland. Call, WhatsApp or email us for custom cake orders, delivery and events.",
};

const PHONE = "8259917757";

function MapPinIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function ContactLine({ icon, label, value, href }) {
  return (
    <a
      href={href}
      className="group flex items-start gap-4"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F9F8F6] text-[#BC6153] transition group-hover:bg-[#BC6153] group-hover:text-white">
        {icon}
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#8B7355]">{label}</span>
        <span className="mt-1 block font-medium text-[#26110B] transition group-hover:text-[#BC6153]">{value}</span>
      </span>
    </a>
  );
}

export default function ContactPage() {
  return (
    <main>
      <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Contact</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">Contact Us</h1>
          <p className="mt-6 text-lg text-[#8B7355]">
            We&rsquo;d love to hear from you — order a cake, plan an event, or just say hello.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-10 shadow-sm">
              <h3 className="font-serif text-2xl font-semibold text-[#26110B]">Store Information</h3>
              <div className="mt-8 space-y-7">
                <ContactLine
                  icon={<MapPinIcon />}
                  label="Visit Us"
                  value="Zion Hospital Road, Purana Bazar, Dimapur, Nagaland"
                  href="https://www.google.com/maps?q=Zion+Hospital+Road+Purana+Bazar+Dimapur+Nagaland"
                />
                <ContactLine
                  icon={<PhoneIcon />}
                  label="Call or WhatsApp"
                  value={PHONE}
                  href={`tel:${PHONE}`}
                />
                <ContactLine
                  icon={<MailIcon />}
                  label="Email"
                  value="Akribake2020@gmail.com"
                  href="mailto:Akribake2020@gmail.com"
                />
              </div>

              <h3 className="mt-10 font-serif text-2xl font-semibold text-[#26110B]">Business Hours</h3>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-5 py-3.5">
                  <span className="flex items-center gap-3 text-sm font-medium text-[#26110B]">
                    <ClockIcon />
                    Monday – Saturday
                  </span>
                  <span className="text-sm font-semibold text-[#26110B]">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-5 py-3.5">
                  <span className="flex items-center gap-3 text-sm font-medium text-[#26110B]">
                    <ClockIcon />
                    Sunday
                  </span>
                  <span className="text-sm font-semibold text-[#26110B]">10:00 AM – 4:00 PM</span>
                </div>
                <p className="rounded-2xl border border-dashed border-[#BC6153]/50 bg-[#BC6153]/5 px-5 py-3 text-xs leading-6 text-[#8B7355]">
                  Cakes need <strong>2–3 days advance notice</strong>. For bulk orders &amp; events, we need 7–10 days. For urgent orders, message us on WhatsApp.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/91${PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#26110B] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3D2219]"
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="rounded-full border border-[#26110B] px-6 py-3 text-sm font-medium text-[#26110B] transition hover:-translate-y-0.5 hover:bg-[#EDE8E0]"
                >
                  Call Us
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#E8E0D8] bg-white shadow-sm">
              <div className="border-b border-[#E8E0D8] px-8 py-6">
                <h3 className="font-serif text-2xl font-semibold text-[#26110B]">Find Us on the Map</h3>
              </div>
              <iframe
                title="Akri Bakes location map"
                src="https://www.google.com/maps?q=Zion%20Hospital%20Road%20Purana%20Bazar%20Dimapur%20Nagaland&output=embed"
                className="h-[560px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
