import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../router';

export const LoginByCode = () => {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // Ngăn chặn hành vi gửi mặc định
    navigate(PATH.defaultDashboard);
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="/submit"
      method="POST"
      className="full-width full-height flex col gap-frame"
    >
      <h2>Sign in by pincode</h2>
      <div>
        If you are registerd in the robot as a pincode-enabled user, you can use
        your pincode to sign in from here.
      </div>
      <div>
        If you don't have a pincode, but would like to use this method for
        signing in, you should contact your robot administrator.
      </div>
      <div className="height-25per flex row gap-2per">
        <input
          className="full-height code padding-15px"
          id="code-01"
          name="code-01"
          type="password"
        />
        <input
          className="full-height code padding-15px"
          id="code-02"
          name="code-02"
          type="password"
        />
        <input
          className="full-height code padding-15px"
          id="code-03"
          name="code-03"
          type="password"
        />
        <input
          className="full-height code padding-15px"
          id="code-04"
          name="code-04"
          type="password"
        />
      </div>
      <button
        className="button"
        type="submit"
        style={{ width: '25%', padding: '10px' }}
        onclick="confirmSignInByCode()"
      >
        Sign in
      </button>
    </form>
  );
};
