import './App.css';
import { useState } from 'react';
import { z } from 'zod';

function App() {
  const [data, setData]
    = useState({ email: '', password: '' });
  const [errors, setErrors] = useState(null);

  const FormData = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      FormData.parse(data);
    } catch (e) {
      setErrors(e.flatten().fieldErrors);
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
        {errors?.email && <div style={{ color: 'red' }}>{errors.email}</div>}
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
        {errors?.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
}

export default App;