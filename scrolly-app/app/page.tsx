import ScrollySequence from "../components/ScrollySequence";
import MissionStatement from "../components/MissionStatement";
import CraftsmanshipSection from "../components/CraftsmanshipSection";
import GlobalPresence from "../components/GlobalPresence";
import CashewCollection from "../components/CashewCollection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white/30 font-sans">
      <ScrollySequence />
      <MissionStatement />
      <CraftsmanshipSection />
      <CashewCollection />
      <GlobalPresence />
      <ContactSection />

      {/* Footer */}
      <footer className="luxury-footer">
        <div className="logo large">QASHEW COMPANY</div>
        <p>© 2026 Qashew Company. The Art of Premium Cashews.</p>
      </footer>
    </main>
  );
}
