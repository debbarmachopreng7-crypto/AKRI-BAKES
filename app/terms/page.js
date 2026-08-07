export const metadata = {
  title: "Terms & Refunds",
  description: "Akri Bakes order terms, cancellation and refund policy for custom cakes in Dimapur, Nagaland.",
};

const sections = [
  {
    title: "Orders",
    body: "By placing an order you agree to provide accurate details, including your phone number and delivery address. Orders are confirmed by Akri Bakes on WhatsApp or phone once payment is received or a pickup is agreed.",
  },
  {
    title: "Advance notice",
    body: "Custom cakes and personalised orders require 7–10 days advance notice. Urgent orders may be possible depending on our schedule — please message us on WhatsApp first to check.",
  },
  {
    title: "Payments",
    body: "We accept payment via UPI (Google Pay, PhonePe, Paytm and other major UPI apps) and cash on pickup. Payment by UPI is made directly to Akri Bakes from your own UPI app; the website does not process or store your payment details.",
  },
  {
    title: "Pickup & delivery",
    body: "Pickup is from our store at Zion Hospital Road, Purana Bazar, Dimapur. Delivery is available across Dimapur; the delivery charge is shown at checkout before you pay. Please provide an accurate address and be reachable on the phone number given.",
  },
  {
    title: "Cancellations",
    body: "You can cancel an order free of charge more than 48 hours before your pickup or delivery date. Cancellations within 48 hours of the date, or after baking has begun, are non-refundable because your cake is made to order.",
  },
  {
    title: "Refunds",
    body: "If we cancel your order (for example, because of weather or an unavoidable issue on our side), you receive a full refund of anything paid. If your order arrives damaged, please message us on WhatsApp with a photo within 2 hours of delivery and we'll make it right — by a replacement, a remake, or a refund at our discretion.",
  },
  {
    title: "Cake care",
    body: "Cakes are made with fresh cream and perishable ingredients. Please refrigerate your cake and consume it within the time advised at pickup or delivery. Akri Bakes is not responsible for the condition of a cake left unrefrigerated.",
  },
  {
    title: "Allergies",
    body: "Our cakes may contain or come into contact with nuts, dairy, eggs, gluten and other allergens. Please tell us about any allergies before ordering — we'll do our best, but we cannot guarantee an allergen-free kitchen.",
  },
  {
    title: "Questions",
    body: "For anything on this page, contact us on WhatsApp at +91 82599 17757 or email Akribake2020@gmail.com.",
  },
];

export default function TermsPage() {
  return (
    <main>
      <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Legal</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">Terms, Cancellations & Refunds</h1>
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
