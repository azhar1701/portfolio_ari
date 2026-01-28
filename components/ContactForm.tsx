
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
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Full name is required' })}
                className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                {...register('message', { required: 'Message cannot be empty' })}
                className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                {status === 'loading' && <i className="fas fa-spinner fa-spin mr-2"></i>}
                {status === 'idle' && 'Send Message'}
                {status === 'loading' && 'Sending...'}
                {status === 'success' && 'Message Sent!'}
                {status === 'error' && 'Submission Failed'}
              </button>
              {status === 'success' && <p className="mt-2 text-sm text-center text-green-600">Thank you! Your message has been sent successfully.</p>}
              {status === 'error' && <p className="mt-2 text-sm text-center text-red-500">Something went wrong. Please check your EmailJS credentials or try again later.</p>}
            </div>
          </form>
        </div>
    </Section>
  );
};

export default ContactForm;
