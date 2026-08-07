export const metadata = {
  title: "Privacy Policy",
  description: "How Akri Bakes handles your personal information — what we collect, why, and how it's protected.",
};

const sections = [
  {
    title: "What we collect",
    body: "When you place an order or contact us, we collect only what's needed to fulfil it: your name, phone number, email address, delivery address, and the details of your order (cake, size, date and any personalisation message).",
  },
  {
    title: "How it's used",
    body: "We use your details to prepare your order, confirm it with you over WhatsApp or phone, arrange pickup or delivery, and respond to your enquiries. We never sell or rent your information to anyone.",
  },
  {
    title: "Where it's stored",
    body: "Your order is saved in your own browser's local storage on your device — it is not uploaded to any Akri Bakes server. Order details reach us only when you send them to us on WhatsApp or share them over a call.",
  },
  {
    title: "Payments",
    body: "Payments are made through your own UPI app (Google Pay, PhonePe, Paytm, and others) directly to Akri Bakes. The website never sees, stores, or processes your card or UPI PIN. Your bank handles payment data under its own privacy policy.",
  },
  {
    title: "Local storage & cookies",
    body: "We use your browser's local storage to remember your shopping cart between visits and to keep you signed in to the staff area. We do not use advertising trackers or third-party analytics cookies.",
  },
  {
    title: "Contact details",
    body: "To review, correct, or delete the information you've shared with us, contact Akri Bakes on WhatsApp at +91 82599 17757 or email Akribake2020@gmail.com. We're happy to help.",
  },
  {
    title: "Changes to this policy",
    body: "If we change how we handle your information, we'll update this page. The latest version is always available here.",
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Legal</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">Privacy Policy</h1>
          <p className="mt-6 text-[#8B7355]">Last updated: August 2026</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-2xl font-semibold text-[#26110B]">{section.title}</h2>
              <p className="mt-3 leading-8 text-[#8B7355]">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
