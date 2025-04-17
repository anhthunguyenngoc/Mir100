import './login-layout.css';
import { LoginHeader } from '../login-header';

export const LoginLayout = ({ children, defaultIndex }) => {
  return (
    <div className="login_layout">
      <LoginHeader defaultIndex={defaultIndex} />
      <div className="login_content">{children}</div>
    </div>
  );
};
