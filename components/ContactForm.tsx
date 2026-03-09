
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
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  const [status, setStatus] = useState<FormStatus>('idle');

  const onSubmit: SubmitHandler<Inputs> = data => {
    setStatus('loading');

    // IMPORTANT: Replace with your EmailJS Service ID, Template ID, and Public Key
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    // A simple check to prevent submission if placeholder values are used
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
        setTimeout(() => setStatus('idle'), 5000); // Reset form status after 5s
      }, (error) => {
        console.error('EmailJS failed...', error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <Section id="contact" title="Get In Touch" iconClass="fas fa-paper-plane">
      <div className="space-y-6">
        <p className="text-slate-600 mb-6">
          Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold text-text-primary mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Full name is required' })}
              className="block w-full px-4 py-2.5 bg-bg-app border border-border-subtle rounded-lg shadow-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all text-sm font-medium"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Ex: John Doe"
            />
            {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-500 font-bold" role="alert">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-text-primary mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email address" }
              })}
              className="block w-full px-4 py-2.5 bg-bg-app border border-border-subtle rounded-lg shadow-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all text-sm font-medium"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="john@example.com"
            />
            {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-500 font-bold" role="alert">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-bold text-text-primary mb-1">Message</label>
            <textarea
              id="message"
              rows={4}
              {...register('message', { required: 'Message cannot be empty' })}
              className="block w-full px-4 py-2.5 bg-bg-app border border-border-subtle rounded-lg shadow-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all text-sm font-medium resize-none"
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="How can I help you?"
            />
            {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-500 font-bold" role="alert">{errors.message.message}</p>}
          </div>
          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-md text-sm font-bold rounded-lg text-white bg-brand-accent hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:bg-text-muted disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95"
              aria-disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                  Sending...
                </>
              ) : status === 'success' ? (
                'Message Sent!'
              ) : status === 'error' ? (
                'Try Again'
              ) : (
                'Send Message Now'
              )}
            </button>
            {status === 'success' && (
              <p className="mt-4 text-sm text-center text-green-600 font-bold animate-fade-in" role="status">
                Thank you! Your message has been sent successfully.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm text-center text-red-500 font-bold" role="alert">
                Something went wrong. Please check your connection and try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
};

export default ContactForm;
