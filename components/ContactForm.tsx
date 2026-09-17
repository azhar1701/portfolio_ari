import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Section from './Section';

type Inputs = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const emailAddress = "ti3.ari170197@gmail.com";
  const phoneNumber = "089638421353";
  const waNumber = "6289638421353";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    } catch (err) {
      console.error("Failed to copy phone", err);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const subject = encodeURIComponent(data.subject || `Inquiry from ${data.name} via Portfolio`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    // Direct open in default mail client
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSentSuccess(true);
    reset();
    setTimeout(() => setSentSuccess(false), 6000);
  };

  return (
    <Section id="contact" title="Contact & Consultation" iconClass="fas fa-handshake-angle" noContainer>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto">
        {/* Left Side: Professional Metadata & Direct Channels */}
        <div className="lg:col-span-5 space-y-8" data-aos="fade-right">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Available for Consultation</span>
            </div>
            <h3 className="text-3xl font-bold text-text-primary tracking-tight mb-3">
              Mari Berkolaborasi
            </h3>
            <p className="text-text-secondary leading-relaxed font-medium text-sm sm:text-base">
              Terbuka untuk konsultasi teknis, studi hidraulika & hidrologi, perencanaan jaringan irigasi, serta pengembangan sistem informasi spasial (Web GIS).
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-app border border-border-subtle flex items-center justify-between group hover:border-brand-accent/40 transition-all">
              <div className="flex items-center space-x-4 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
                  <i className="fas fa-envelope text-base"></i>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Email Resmi</p>
                  <p className="text-sm font-bold text-text-primary truncate">{emailAddress}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-bg-canvas border border-border-subtle hover:border-brand-accent text-text-secondary hover:text-brand-accent transition-colors text-xs font-semibold cursor-pointer"
                  title="Copy email to clipboard"
                >
                  <i className={`fas ${copiedEmail ? 'fa-check text-emerald-500' : 'fa-copy'}`}></i>
                </button>
                <a
                  href={`mailto:${emailAddress}`}
                  className="p-2 rounded-lg bg-brand-accent hover:bg-brand-accent-hover text-white transition-colors text-xs font-semibold cursor-pointer"
                  title="Open mail client"
                >
                  <i className="fas fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-app border border-border-subtle flex items-center justify-between group hover:border-emerald-500/40 transition-all">
              <div className="flex items-center space-x-4 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                  <i className="fab fa-whatsapp text-lg"></i>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">WhatsApp Direct</p>
                  <p className="text-sm font-bold text-text-primary">{phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-bg-canvas border border-border-subtle hover:border-emerald-500 text-text-secondary hover:text-emerald-600 transition-colors text-xs font-semibold cursor-pointer"
                  title="Copy phone number"
                >
                  <i className={`fas ${copiedPhone ? 'fa-check text-emerald-500' : 'fa-copy'}`}></i>
                </button>
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Halo Pak Ari Azhar, saya ingin mendiskusikan proyek/pekerjaan teknis.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors text-xs font-semibold cursor-pointer"
                  title="Chat on WhatsApp"
                >
                  <i className="fas fa-paper-plane"></i>
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-app border border-border-subtle flex items-center space-x-4">
              <div className="w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
                <i className="fas fa-location-dot text-base"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Lokasi Domisili & Operasional</p>
                <p className="text-sm font-bold text-text-primary">Kabupaten Ciamis, Jawa Barat, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Direct Inquiry Dispatcher */}
        <div className="lg:col-span-7 bg-bg-app p-6 sm:p-10 rounded-3xl border border-border-subtle shadow-sm" data-aos="fade-left">
          <div className="mb-6">
            <h4 className="text-xl font-bold text-text-primary tracking-tight">Kirim Pesan Langsung</h4>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Isi form berikut untuk langsung membuka draf email resmi terstruktur ke alamat saya.
            </p>
          </div>

          {sentSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-sm flex items-center space-x-3">
              <i className="fas fa-circle-check text-base text-emerald-600"></i>
              <span>Draf pesan telah dibuka di aplikasi email Anda. Terima kasih!</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Nama Lengkap / Instansi *
                </label>
                <input
                  type="text"
                  id="contact-name"
                  placeholder="e.g. Ir. Hendra / Balai Wilayah Sungai"
                  {...register('name', { required: 'Nama wajib diisi' })}
                  className="w-full px-4 py-3 bg-bg-canvas border border-border-subtle rounded-xl text-sm font-medium text-text-primary placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  Alamat Email Anda *
                </label>
                <input
                  type="email"
                  id="contact-email"
                  placeholder="nama@instansi.go.id"
                  {...register('email', {
                    required: 'Email wajib diisi',
                    pattern: { value: /^\S+@\S+$/i, message: 'Format email tidak valid' }
                  })}
                  className="w-full px-4 py-3 bg-bg-canvas border border-border-subtle rounded-xl text-sm font-medium text-text-primary placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                Topik / Lingkup Pekerjaan
              </label>
              <input
                type="text"
                id="contact-subject"
                placeholder="e.g. Pemodelan Hidraulika HEC-RAS / Pengembangan WebGIS Irigasi"
                {...register('subject')}
                className="w-full px-4 py-3 bg-bg-canvas border border-border-subtle rounded-xl text-sm font-medium text-text-primary placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                Deskripsi Kebutuhan *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Jelaskan kebutuhan teknis, lokasi wilayah studi, atau dokumen referensi yang ingin dikonsultasikan..."
                {...register('message', { required: 'Pesan wajib diisi' })}
                className="w-full px-4 py-3 bg-bg-canvas border border-border-subtle rounded-xl text-sm font-medium text-text-primary placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all resize-none"
              />
              {errors.message && <p className="mt-1 text-xs text-red-500 font-medium">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <i className="fas fa-paper-plane text-xs"></i>
              <span>Buka Draf Email & Kirim</span>
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default ContactForm;
