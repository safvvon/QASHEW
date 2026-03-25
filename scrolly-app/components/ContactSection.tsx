import React from 'react';

export default function ContactSection() {
    return (
        <section id="contact" className="relative w-full py-24 bg-[#050505] overflow-hidden z-30">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(30,22,15,0.4)_0%,rgba(5,5,5,1)_100%)] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#C8A97E] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Get in <span className="gold-gradient">Touch</span>
                    </h2>
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6"></div>
                    <p className="text-[#F3E5AB]/80 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        We would love to hear from you. Contact us for orders, partnerships, or inquiries.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Contact Form */}
                    <div className="glass-card p-8 md:p-10 rounded-2xl border border-[#D4AF37]/20 bg-[#140F0A]/60 backdrop-blur-xl shadow-2xl shrink-0">
                        <form className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <input type="text" placeholder="Full Name" required 
                                        className="w-full bg-[#C8A97E]/10 border border-[#D4AF37]/20 text-[#C8A97E] placeholder-[#C8A97E]/50 rounded-lg px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:bg-[#C8A97E]/20 transition-all font-light" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email Address" required 
                                        className="w-full bg-[#C8A97E]/10 border border-[#D4AF37]/20 text-[#C8A97E] placeholder-[#C8A97E]/50 rounded-lg px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:bg-[#C8A97E]/20 transition-all font-light" />
                                </div>
                                <div>
                                    <input type="tel" placeholder="Phone Number" 
                                        className="w-full bg-[#C8A97E]/10 border border-[#D4AF37]/20 text-[#C8A97E] placeholder-[#C8A97E]/50 rounded-lg px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:bg-[#C8A97E]/20 transition-all font-light" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Subject" required 
                                        className="w-full bg-[#C8A97E]/10 border border-[#D4AF37]/20 text-[#C8A97E] placeholder-[#C8A97E]/50 rounded-lg px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:bg-[#C8A97E]/20 transition-all font-light" />
                                </div>
                                <div>
                                    <textarea placeholder="Message" rows={5} required 
                                        className="w-full bg-[#C8A97E]/10 border border-[#D4AF37]/20 text-[#C8A97E] placeholder-[#C8A97E]/50 rounded-lg px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:bg-[#C8A97E]/20 transition-all font-light resize-none"></textarea>
                                </div>
                            </div>
                            
                            <button type="submit" className="w-full glass-button relative overflow-hidden group bg-transparent border border-[#D4AF37]/40 text-white px-8 py-4 rounded-full font-light tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                <span className="relative z-10">Send Message</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col justify-between glass-card p-8 md:p-10 rounded-2xl border border-[#D4AF37]/20 bg-[#140F0A]/60 backdrop-blur-xl shadow-2xl h-full">
                        <div className="space-y-10">
                            <div>
                                <h4 className="text-[#D4AF37] text-xl font-medium tracking-wide mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Headquarters</h4>
                                <p className="text-[#C8A97E]/80 font-light leading-relaxed">
                                    123 Luxury Avenue, Business Bay<br />
                                    Dubai, United Arab Emirates
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-[#D4AF37] text-xl font-medium tracking-wide mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Contact Details</h4>
                                <p className="text-[#C8A97E]/80 font-light leading-relaxed">
                                    Phone: +971 4 123 4567<br />
                                    Email: info@qashew.com
                                </p>
                            </div>

                            <div>
                                <h4 className="text-[#D4AF37] text-xl font-medium tracking-wide mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Export &amp; Wholesale</h4>
                                <p className="text-[#C8A97E]/80 font-light leading-relaxed">
                                    For large volume orders, please email:<br />
                                    export@qashew.com
                                </p>
                            </div>

                            <div>
                                <h4 className="text-[#D4AF37] text-xl font-medium tracking-wide mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Business Hours</h4>
                                <p className="text-[#C8A97E]/80 font-light leading-relaxed">
                                    Monday - Friday: 9 AM - 6 PM<br />
                                    Saturday: 10 AM - 4 PM<br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4">
                            {['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp'].map((social) => (
                                <a key={social} href="#" className="flex-1 text-center text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/30 px-3 md:px-6 py-3 rounded-full hover:bg-[#D4AF37] hover:text-[#050505] font-semibold transition-all duration-300">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#D4AF37]/20 relative shadow-2xl glass-card bg-[#140F0A]/60 p-2">
                    <iframe 
                        className="w-full h-full rounded-xl"
                        style={{ filter: "sepia(0.8) hue-rotate(345deg) saturate(1.8) contrast(1) brightness(0.9)" }}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8112349.378954751!2d-7.461621644784711!3d7.925577626359556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf7df5cb17ecfb%3A0xff0fd28302061329!2sGhana!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </section>
    );
}
