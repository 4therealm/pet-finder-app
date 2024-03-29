import { useState } from 'react';
import { useAppCtx } from '../utils/AppContext';

export default function SendSMS(phone) {
  const { userLocation, user } = useAppCtx();
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  // const [to, setTo] = useState(null);


  
  async function handleSend(e) {
    e.stopPropagation();
    e.preventDefault();
    
    setSending(true);
    setSent(false);
    setError(null);
  
    try {
      const response = await fetch('/api/user/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phone.phone,
          body: `${body}`,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send SMS');
      }
  
      setSent(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSending(false);
    }
  }
  



  function handleChangeBody(event) {
    setBody(event.target.value);
  }

  return (
    <div>
      <div>
        <label htmlFor="message-body">Message body:</label>
        <textarea id="message-body" value={body} onChange={handleChangeBody} />
      </div>
      <button className="btn btn-primary btn-dark btn-rounded" disabled={sending} onClick={handleSend}>Send SMS</button>
      {sent && <div>Message sent!</div>}
      {error && <div>Error sending message: {error}</div>}
    </div>
  );
}
