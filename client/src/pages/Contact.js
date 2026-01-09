import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheck } from 'react-icons/fi';
import SEO from '../components/SEO';
import { contactAPI } from '../utils/api';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const projectTypes = [
    { value: 'new-website', label: 'New Website' },
    { value: 'redesign', label: 'Website Redesign' },
    { value: 'ecommerce', label: 'E-Commerce Store' },
    { value: 'seo', label: 'SEO Services' },
    { value: 'maintenance', label: 'Website Maintenance' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-plus', label: '$25,000+' },
    { value: 'not-sure', label: 'Not Sure Yet' }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await contactAPI.submit(data);
      setIsSubmitted(true);
      reset();
      toast.success('Message sent successfully! We\'ll be in touch soon.');
    } catch (error) {
      toast.error('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with SilverFox Media for your web development project. Schedule a free consultation to discuss your website needs."
        url="/contact"
      />

      <section className="sfm-contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Contact Us</h1>
            <p>Let's discuss your project and bring your vision to life</p>
          </motion.div>
        </div>
      </section>

      <section className="sfm-contact section">
        <div className="container">
          <div className="sfm-contact__content">
            <motion.div
              className="sfm-contact__info"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Get In Touch</h2>
              <p>
                Ready to start your project? Have questions about our services?
                We'd love to hear from you. Fill out the form or contact us directly.
              </p>

              <div className="sfm-contact__methods">
                <a href="tel:9728008105" className="sfm-contact__method">
                  <div className="sfm-contact__method-icon">
                    <FiPhone />
                  </div>
                  <div>
                    <h3>Phone</h3>
                    <p>(972) 800-8105</p>
                  </div>
                </a>

                <a href="mailto:information@silverfoxmedia.co" className="sfm-contact__method">
                  <div className="sfm-contact__method-icon">
                    <FiMail />
                  </div>
                  <div>
                    <h3>Email</h3>
                    <p>information@silverfoxmedia.co</p>
                  </div>
                </a>

                <div className="sfm-contact__method">
                  <div className="sfm-contact__method-icon">
                    <FiMapPin />
                  </div>
                  <div>
                    <h3>Location</h3>
                    <p>Dallas-Fort Worth, Texas</p>
                  </div>
                </div>
              </div>

              <div className="sfm-contact__hours">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM CST</p>
                <p>Saturday: By Appointment</p>
                <p>Sunday: Closed</p>
              </div>
            </motion.div>

            <motion.div
              className="sfm-contact__form-wrapper"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isSubmitted ? (
                <div className="sfm-contact__success">
                  <div className="sfm-contact__success-icon">
                    <FiCheck />
                  </div>
                  <h2>Thank You!</h2>
                  <p>
                    Your message has been received. We'll get back to you within
                    1-2 business days.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="sfm-contact__form">
                  <h2>Request a Quote</h2>

                  <div className="sfm-contact__form-row">
                    <div className="sfm-contact__form-group">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        className={errors.name ? 'sfm-contact__input--error' : ''}
                      />
                      {errors.name && (
                        <span className="sfm-contact__error">{errors.name.message}</span>
                      )}
                    </div>

                    <div className="sfm-contact__form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className={errors.email ? 'sfm-contact__input--error' : ''}
                      />
                      {errors.email && (
                        <span className="sfm-contact__error">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="sfm-contact__form-row">
                    <div className="sfm-contact__form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                      />
                    </div>

                    <div className="sfm-contact__form-group">
                      <label htmlFor="company">Company</label>
                      <input
                        type="text"
                        id="company"
                        {...register('company')}
                      />
                    </div>
                  </div>

                  <div className="sfm-contact__form-row">
                    <div className="sfm-contact__form-group">
                      <label htmlFor="projectType">Project Type</label>
                      <select id="projectType" {...register('projectType')}>
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sfm-contact__form-group">
                      <label htmlFor="budget">Budget Range</label>
                      <select id="budget" {...register('budget')}>
                        {budgetRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sfm-contact__form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      rows="5"
                      {...register('message', { required: 'Message is required' })}
                      className={errors.message ? 'sfm-contact__input--error' : ''}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <span className="sfm-contact__error">{errors.message.message}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg sfm-contact__submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <FiSend />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
