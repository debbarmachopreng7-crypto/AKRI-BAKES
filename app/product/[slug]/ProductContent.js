"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "../../../components/animations";
import ProductOrder from "./ProductOrder";
import SocialShare from "../../../components/SocialShare";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { getCakeImage } from "../../../lib/cakeImages";

export default function ProductContent({ product }) {
  const isCheesecake = product.type === "cheesecake";
  const priceLabel = isCheesecake
    ? `Mini \u20B9${product.price1} \u00B7 6" \u20B9${product.price2} \u00B7 7.5" \u20B9${product.price3}`
    : product.price2
      ? `\u20B9${product.price1} \u2014 \u20B9${product.price2}`
      : `\u20B9${product.price1}`;

  return (
    <main>
      <Breadcrumbs items={[
        { href: "/menu", label: "Menu" },
        { label: product.name },
      ]} />
      <SlideUp>
        <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Product Page</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">{product.name}</h1>
          </div>
        </section>
      </SlideUp>

      <FadeIn>
        <section className="py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
            <motion.div
              className="relative overflow-hidden rounded-[2rem] border border-[#E8E0D8] bg-[linear-gradient(135deg,#f5f5f5_0%,#ffffff_50%,#ececec_100%)] shadow-sm min-h-[300px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {getCakeImage(product.name) && (
                <Image
                  src={getCakeImage(product.name)}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              )}
            </motion.div>
            <StaggerContainer>
              <StaggerItem>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Premium Cake</p>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-4 text-2xl font-semibold text-[#26110B]">{priceLabel}</p>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-6 max-w-xl leading-8 text-[#8B7355]">{product.description}</p>
              </StaggerItem>
              <StaggerItem>
                <ProductOrder product={product} />
              </StaggerItem>
              <StaggerItem>
                <SocialShare name={product.name} />
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
