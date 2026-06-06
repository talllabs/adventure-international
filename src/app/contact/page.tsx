import { Metadata } from "next";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Adventure International",
  description: "Plan your bespoke expedition with Adventure International. Get in touch with our team of specialist travel designers.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Hero — black */}
      <div className="bg-[#0a0a0a] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <SectionLabel className="justify-center mb-6" light>Get in Touch</SectionLabel>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light">Plan Your Journey</h1>
        </div>
      </div>

      {/* Content — white */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Editorial copy */}
            <div>
              <SectionLabel className="mb-6">Let&apos;s Talk</SectionLabel>
              <h2 className="font-serif text-4xl text-[#111111] font-light mb-6">
                Every Great Expedition Begins Here
              </h2>
              <p className="text-[#5a5a5a] leading-relaxed mb-8 text-lg">
                Our expedition specialists have deep first-hand knowledge of every destination we offer. Whether you know exactly where you want to go or are seeking guidance, we&apos;re here to design the journey of a lifetime.
              </p>
              <p className="text-[#5a5a5a] leading-relaxed mb-12">
                Fill out the form and one of our team will be in touch within 24 hours to begin the conversation. If you need an urgent response, please indicate so in the additional info box below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0 border border-gold/30">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-gold mb-1">Email</p>
                    <a href="mailto:info@adventure-international.com" className="text-[#5a5a5a] hover:text-gold transition-colors">
                      info@adventure-international.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0 border border-gold/30">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-gold mb-1">Phone</p>
                    <a href="tel:8886643865" className="text-[#5a5a5a] hover:text-gold transition-colors">
                      888-664-3865
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0 border border-gold/30">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-gold mb-1">Offices</p>
                    <p className="text-[#5a5a5a]">US · Canada · Holland · East Africa · Peru · Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
