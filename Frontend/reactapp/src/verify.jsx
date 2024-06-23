import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const paymentId = searchParams.get("paymentId");
  const name = searchParams.get("name");
  const navigate = useNavigate();
  const [certificateUrl, setCertificateUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const verifyPayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/donor/verify', { success, paymentId, name });
      if (response.data.success) {
        console.log(response);
        console.log(response.data.name)
        await getCertificate(response.data.name);
      } else {
        navigate('http://localhost:3000/donor/verify');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      navigate('http://localhost:3000/donor/verify');
    } finally {
      setLoading(false);
    }
  };

  const getCertificate = async (n) => {
    try {
      const response = await axios.get(`http://localhost:3000/donor/certificate/${n}`, {
        responseType: 'blob'
      },);
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
