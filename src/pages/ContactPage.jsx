import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import { PERSONAL_INFO, FORMSPREE_ENDPOINT } from '../data/siteData';

function ContactPage() {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // 模拟提交（如果没有配置 Formspree，打开邮件客户端）
    setTimeout(() => {
      setFormStatus('success');
      if (!FORMSPREE_ENDPOINT) {
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.email}`);
        const body = encodeURIComponent(formData.message);
        window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
      }
      setFormData({ email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-in fade-in">
      <div className="text-center mb-10">
        <RevealOnScroll>
          <h1 className="text-4xl font-bold text-white mb-6">Get in Touch</h1>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Have a question or want to work together? Send me a message!
          </p>
        </RevealOnScroll>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex border-b border-slate-800">
          <div className="flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 bg-slate-800 text-white">
            <Mail size={18} /> Send Email
          </div>
        </div>

        <div className="p-6 sm:p-8 min-h-[400px]">
          {formStatus === 'success' ? (
            <div className="py-12 flex flex-col items-center animate-in fade-in">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-slate-400 text-center mb-6">
                {FORMSPREE_ENDPOINT ? "Thanks for reaching out." : "I've opened your email client."}
              </p>
              <button onClick={() => setFormStatus('idle')} className="text-cyan-400 hover:text-white underline">
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-4 animate-in fade-in" onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
                  disabled={formStatus === 'submitting'}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Hi Zhou, I have a project regarding..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none disabled:opacity-50"
                  disabled={formStatus === 'submitting'}
                ></textarea>
              </div>
              <button
                disabled={formStatus === 'submitting'}
                className="w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
