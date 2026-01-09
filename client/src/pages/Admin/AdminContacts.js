import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import { contactAPI } from '../../utils/api';
import './AdminContacts.css';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await contactAPI.getAll();
        setContacts(data.contacts);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleContactClick = async (contact) => {
    setSelectedContact(contact);
    if (!contact.isRead) {
      try {
        await contactAPI.getById(contact._id);
        setContacts(contacts.map(c =>
          c._id === contact._id ? { ...c, isRead: true } : c
        ));
      } catch (error) {
        console.error('Error marking as read:', error);
      }
    }
  };

  const statusColors = {
    'new': { bg: '#FEF3C7', text: '#92400E' },
    'contacted': { bg: '#DBEAFE', text: '#1E40AF' },
    'qualified': { bg: '#D1FAE5', text: '#065F46' },
    'proposal': { bg: '#E0E7FF', text: '#3730A3' },
    'closed-won': { bg: '#D1FAE5', text: '#065F46' },
    'closed-lost': { bg: '#FEE2E2', text: '#991B1B' }
  };

  return (
    <div className="sfm-admin-contacts">
      <div className="sfm-admin-contacts__header">
        <Link to="/admin" className="sfm-admin-contacts__back">
          <FiArrowLeft />
          Back to Dashboard
        </Link>
        <h1>Contact Submissions</h1>
      </div>

      {loading ? (
        <div className="sfm-loading-screen">
          <div className="sfm-loading-spinner"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="sfm-admin-contacts__empty">
          <p>No contact submissions yet.</p>
        </div>
      ) : (
        <div className="sfm-admin-contacts__layout">
          <div className="sfm-admin-contacts__list">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className={`sfm-admin-contacts__item ${!contact.isRead ? 'sfm-admin-contacts__item--unread' : ''} ${selectedContact?._id === contact._id ? 'sfm-admin-contacts__item--selected' : ''}`}
                onClick={() => handleContactClick(contact)}
              >
                <div className="sfm-admin-contacts__item-header">
                  <h3>{contact.name}</h3>
                  <span
                    className="sfm-admin-contacts__status"
                    style={{
                      backgroundColor: statusColors[contact.status]?.bg || '#F3F4F6',
                      color: statusColors[contact.status]?.text || '#374151'
                    }}
                  >
                    {contact.status}
                  </span>
                </div>
                <p className="sfm-admin-contacts__email">{contact.email}</p>
                <p className="sfm-admin-contacts__date">
                  <FiCalendar />
                  {new Date(contact.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {selectedContact && (
            <div className="sfm-admin-contacts__detail">
              <h2>{selectedContact.name}</h2>
              <div className="sfm-admin-contacts__detail-info">
                <p>
                  <FiMail />
                  <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
                </p>
                {selectedContact.phone && (
                  <p>
                    <FiPhone />
                    <a href={`tel:${selectedContact.phone}`}>{selectedContact.phone}</a>
                  </p>
                )}
                <p>
                  <FiCalendar />
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="sfm-admin-contacts__detail-section">
                <h3>Project Details</h3>
                {selectedContact.company && <p><strong>Company:</strong> {selectedContact.company}</p>}
                <p><strong>Project Type:</strong> {selectedContact.projectType}</p>
                <p><strong>Budget:</strong> {selectedContact.budget}</p>
              </div>

              <div className="sfm-admin-contacts__detail-section">
                <h3>Message</h3>
                <p className="sfm-admin-contacts__message">{selectedContact.message}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
