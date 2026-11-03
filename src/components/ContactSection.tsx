import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, MapPin, Send, CheckCircle2, Copy, Sparkles, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subjectCategory, setSubjectCategory] = useState('General Query');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`[${subjectCategory}] Inquiry from ${senderName || 'Website Visitor'}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\nCategory: ${subjectCategory}\n\nMessage:\n${message}\n\nSent via Rahul & Jyoti Studio Contact Form`
    );
    window.location.href = `mailto:rahulgupt1231@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Rahul & Jyoti,\nMy name is ${senderName || 'a client'}.\nQuery Category: ${subjectCategory}\nMessage: ${message || 'I have a project query.'}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Query from: ${senderName} (${senderEmail})\nCategory: ${subjectCategory}\nMessage: ${message}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-[#080B11] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold mb-3">
            <Mail className="w-4 h-4" />
            <span>DIRECT INBOX &amp; COMMUNICATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Contact &amp; Studio Inquiries
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Have a question, technical query, or want to discuss a custom scope before signing the bond? Send a message directly to Rahul&apos;s email inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          
          {/* Left: Studio Summary & Quick Channels (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Studio Communication Summary
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Guaranteed Response Time</span>
                    <span className="text-slate-400">Within 2 to 4 business hours directly from Rahul &amp; Jyoti.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Official Contact Inboxes</span>
                    <div className="space-y-0.5 pt-0.5">
                      <div className="text-[11px] text-slate-400">
                        Rahul: <a href="mailto:rahulgupt1231@gmail.com" className="text-cyan-400 hover:underline">rahulgupt1231@gmail.com</a>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Jyoti: <a href="mailto:vruchika02@gmail.com" className="text-amber-400 hover:underline">vruchika02@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Operational Location</span>
                    <span className="text-slate-400">IIT Patna &bull; BIT Mesra &bull; Remote Worldwide</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Zero Subcontracting Policy</span>
                    <span className="text-slate-400">Every message and project is reviewed directly by the co-founders.</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Direct Query Form (3 Cols) */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl backdrop-blur-md"
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                Send a Direct Query
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="e.g. rahul@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Query Subject / Topic
                </label>
                <select
                  value={subjectCategory}
                  onChange={(e) => setSubjectCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                >
                  <option>General Project Query</option>
                  <option>Scope &amp; Architecture Consultation</option>
                  <option>Milestone Bond &amp; Payment Clarification</option>
                  <option>Full-Stack Web App Inquiry</option>
                  <option>Technical / SEO Content Writing</option>
                  <option>Turnkey &quot;Code + Copy&quot; Launch Bundle</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Your Message / Question *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help? Share your project timeline, technical requirements, or any specific questions..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Email to Rahul</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy Query'}</span>
                </button>
              </div>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Your email client has been prepared with your inquiry! We will reply promptly.</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
