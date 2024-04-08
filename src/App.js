import './App.css';
import { useState } from 'react';
import { z } from 'zod';

function App() {
  const [data, setData]
    = useState({ email: '', password: '' });

  const FormData = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      FormData.parse(data);
    } catch (e) {
      console.log(e.flatten());
    }
    console.log(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
}

export default App;