
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Section from './Section';

type Inputs = {
  name: string;
  email: string;
  message: string;
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<Inputs>();
  const [status, setStatus] = useState<FormStatus>('idle');
  
  const hasName = !!watch('name');
  const hasEmail = !!watch('email');
  const hasMessage = !!watch('message');

  const onSubmit: SubmitHandler<Inputs> = data => {
    setStatus('loading');
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    if (serviceID === 'YOUR_SERVICE_ID' || templateID === 'YOUR_TEMPLATE_ID') {
      console.error("EmailJS credentials are not configured.");
      setStatus('error');
      return;
    }

    emailjs.send(serviceID, templateID, {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    }, publicKey)
      .then(() => {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <Section id="contact" title="Contact" iconClass="fas fa-handshake-angle" noContainer>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 max-w-6xl mx-auto">
        {/* Left Side: Professional Metadata */}
        <div className="lg:col-span-5 space-y-10" data-aos="fade-right">
          <div>
            <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-4">Get in touch</h3>
            <p className="text-text-secondary leading-relaxed font-medium">
              Open to consulting, research partnerships, and project work in water resources and GIS.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center group">
              <div className="w-12 h-12 bg-bg-app border border-border-subtle rounded-xl flex items-center justify-center text-brand-accent mr-4 group-hover:border-brand-accent/30 transition-colors">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-0.5">Email Address</p>
                <p className="text-sm font-bold text-text-primary">ti3.ari170197@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center group">
              <div className="w-12 h-12 bg-bg-app border border-border-subtle rounded-xl flex items-center justify-center text-brand-accent mr-4 group-hover:border-brand-accent/30 transition-colors">
                <i className="fas fa-location-dot"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-0.5">Primary Location</p>
                <p className="text-sm font-bold text-text-primary">Ciamis, Jawa Barat, ID</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7" data-aos="fade-left">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
            <div className="relative group">
              <label htmlFor="name" className={`absolute left-0 transition-all duration-300 pointer-events-none ${hasName ? '-top-6 text-[10px] text-brand-accent font-bold uppercase tracking-widest' : 'top-3 text-sm text-text-muted'}`}>
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary focus:outline-none focus:border-brand-accent transition-colors font-medium"
              />
              {errors.name && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.name.message}</p>}
            </div>

            <div className="relative group">
              <label htmlFor="email" className={`absolute left-0 transition-all duration-300 pointer-events-none ${hasEmail ? '-top-6 text-[10px] text-brand-accent font-bold uppercase tracking-widest' : 'top-3 text-sm text-text-muted'}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                })}
                className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary focus:outline-none focus:border-brand-accent transition-colors font-medium"
              />
              {errors.email && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.email.message}</p>}
            </div>

            <div className="relative group">
              <label htmlFor="message" className={`absolute left-0 transition-all duration-300 pointer-events-none ${hasMessage ? '-top-6 text-[10px] text-brand-accent font-bold uppercase tracking-widest' : 'top-3 text-sm text-text-muted'}`}>
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message', { required: 'Message required' })}
                className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary focus:outline-none focus:border-brand-accent transition-colors font-medium resize-none"
              />
              {errors.message && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="relative w-full lg:w-fit px-12 py-4 bg-brand-accent text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-md hover:shadow-xl hover:bg-brand-accent-hover transition-all transform active:scale-95 disabled:bg-text-muted overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
                <i className={`fas ${status === 'loading' ? 'fa-spinner fa-spin' : status === 'success' ? 'fa-check-double' : 'fa-arrow-right'} ml-3`}></i>
              </span>
            </button>

            {status === 'success' && (
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                <p className="text-xs text-green-600 font-bold text-center">Message sent — I'll reply soon.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
};

export default ContactForm;
