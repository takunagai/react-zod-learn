import './App.css';
import { useState } from 'react';
import { z } from 'zod';

function App() {
  const [data, setData]
    = useState({ email: '', password: '' });
  const [errors, setErrors] = useState(null);

  const FormData = z.object({
    email: z.string().email({ message: 'メールアドレスの形式が正しくありません' }),
    password: z.string()
      .min(8, { message: 'パスワードは8文字以上で入力してください' })
      .max(32, { message: 'パスワードは32文字以下で入力してください' }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = FormData.safeParse(data);
    const errors = result.success ? {} :
      result.error.flatten().fieldErrors;
    setErrors(errors);
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