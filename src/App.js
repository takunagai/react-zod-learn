import './App.css';
import { useState } from 'react';
import { z } from 'zod';

function App() {
  const [data, setData]
    = useState({ email: '', password: '' });

  const mySchema = z.string().min(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = mySchema.safeParse(data.email);
    console.log(result);
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