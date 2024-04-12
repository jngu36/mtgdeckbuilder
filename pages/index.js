import { useEffect, useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const jwt = require("jsonwebtoken");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setName(jwt.decode(token).user);
    }
  }, []);

  return (
    <>
      <div>
        <p>Hello {name}</p>
      </div>
    </>
  );
}
