import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactFormStyle.css';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: name,
      email: email,
      subject: subject, // Ensure subject is included if your template requires it
      message: message
    };

    emailjs.send(
      'service_s741kca', // Replace with your EmailJS Service ID
      'template_xs43xwk', // Replace with your EmailJS Template ID
      templateParams,
      '--H2adMJpbNvOR3BE' // Replace with your EmailJS User ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Message sent successfully!');
    }, (error) => {
      console.log('FAILED...', error);
      alert('Failed to send message. Please try again later.');
    });
  };

  return (
    <div className="form-container" id='contact'>
      <h1>Send Us a Message</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="subject"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          name="message"
          placeholder="Message"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactForm;
