import { useState } from 'react';
import { useAppCtx } from '../utils/AppContext';

export default function SendSMS({ownerPhone}) {
  const { userLocation, user } = useAppCtx();
  const [to, setTo] = useState(ownerPhone);
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  async function handleSend(e) {
    e.stopPropagation();
    e.preventDefault();
    
    setSending(true);
    setSent(false);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/user/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to:ownerPhone,
          body,
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
      <p>
        {user.name} wants to contact you about your lost pet.
        The user's location is {userLocation[0].city}, {userLocation[0].coordinates}.
      </p>
      <div>
        <label htmlFor="message-body">Message body:</label>
        <textarea id="message-body" value={body} onChange={handleChangeBody} />
      </div>
      <button disabled={sending} onClick={handleSend}>Send SMS</button>
      {sent && <div>Message sent!</div>}
      {error && <div>Error sending message: {error}</div>}
    </div>
  );
}
