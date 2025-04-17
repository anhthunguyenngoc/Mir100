import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAPI, postAPI } from '../../../api';
import { PATH } from '../../../router';

export const LoginByPass = () => {
  const navigate = useNavigate();

  useEffect(() => {
    postAPI('/users/auth', { username: 'admin', password: 'admin' });
  }, []);

  function handleSubmit(event) {
    event.preventDefault(); // Ngăn chặn hành vi gửi mặc định
    window.location.href = PATH.defaultDashboard;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="full-width full-height flex row gap-frame"
    >
      <div className="width-50per flex col gap-frame">
        <h2>Sign in by username and password</h2>
        <div>Enter your username and password to sign in to the robot.</div>
        <div>
          Your username and password should be given to you by either the robot
          administrator or found in the robot manual.
        </div>
        <div>
          If you don't have a username and password, please contact the robot
          administrator.
        </div>
      </div>
      <div className="width-50per flex col gap-frame">
        <div className="full-width flex col gap-5px">
          <label for="username">Username</label>
          <input
            id="username"
            placeholder="Enter your username..."
            name="username"
            type="text"
          />
        </div>
        <div className="full-width flex col gap-5px">
          <label for="pass">Password</label>
          <input
            id="pass"
            placeholder="Enter your password..."
            name="pass"
            type="password"
          />
        </div>
        <button
          className="button"
          style={{ width: '25%', padding: '10px' }}
          type="submit"
          onclick="confirmSignInByPass()"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};
