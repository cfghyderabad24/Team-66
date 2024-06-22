import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const paymentId = searchParams.get("paymentId");
  const navigate = useNavigate();
  const [certificateUrl, setCertificateUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const verifyPayment = async () => {
    try {
      const response = await axios.post('/donor/verify', { success, paymentId });
      if (response.data.success) {
        await getCertificate();
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const getCertificate = async () => {
    try {
      const response = await axios.get('/donor/certificate', {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(response.data);
      setCertificateUrl(url);
    } catch (error) {
      console.error('Error fetching certificate:', error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <>
      <div className='verify'>
        <div className="spinner" style={{ display: loading ? 'block' : 'none' }}>
          {/* Spinner content */}
        </div>
        {!loading && certificateUrl && (
          <div>
            <iframe src={certificateUrl} width="800" height="600" title="Certificate"></iframe>
          </div>
        )}
      </div>
    </>
  );
};

export default Verify;
