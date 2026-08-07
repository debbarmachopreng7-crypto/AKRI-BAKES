"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How early should I place an order?",
    a: "We recommend ordering 7–10 days in advance for custom cakes, so our bakers can plan, source ingredients and perfect your design. For simpler menu cakes, 2–3 days usually works — message us on WhatsApp to check availability.",
  },
  {
    q: "Do you make custom cakes?",
    a: "Yes. Use our Build Your Cake tool to pick the occasion, size, flavour, frosting and decorations with a live price, upload an inspiration photo, and reserve your pickup. For fully bespoke designs, WhatsApp us a reference photo and we'll bring it to life.",
  },
  {
    q: "Is delivery available?",
    a: "Yes. Delivery is available across Dimapur with area-based charges — from ₹100 to ₹280 depending on your area. Choose Delivery at checkout and pick your area to see the exact charge. Pickup from Purana Bazar is always free.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI (Google Pay, Paytm, PhonePe and any UPI app via QR scan), cash on delivery, and pay-at-store. For UPI you can pay by opening the app with details prefilled or by scanning a QR code.",
  },
  {
    q: "Can I add a message on the cake?",
    a: "Of course. Add your message when ordering — we'll pipe it in whatever style suits your design. Photo cakes are available as an add-on on any flavour (+₹300).",
  },
  {
    q: "Do you bake eggless or sugar-free cakes?",
    a: "We have a full sugar-free menu (1 lb ₹900 – 2 lb ₹1800) with flavours like Vanilla Custard, Red Velvet, Tiramisu and more. For eggless or other dietary requirements, let us know when you order and we'll do our best to accommodate.",
  },
  {
    q: "Can I see the cake before paying?",
    a: "We share design previews for custom cakes before your pickup or delivery date. On pickup day, if something isn't right, we'll fix it on the spot — your celebration matters more than anything.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-4">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q} className="overflow-hidden rounded-[20px] border border-[#E8E0D8] bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
            >
              <span className="font-serif text-lg font-semibold text-[#26110B]">{item.q}</span>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${isOpen ? "bg-[#BC6153] text-white" : "bg-[#F9F8F6] text-[#26110B]"}`}>
                <svg className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </span>
            </button>
            {isOpen ? (
              <div className="border-t border-[#E8E0D8] bg-[#F9F8F6] px-7 py-5">
                <p className="leading-7 text-[#8B7355]">{item.a}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
