import './login-header.css';
import { Navigation } from '../../navigation/Navigation.js';
import { PUBLIC_ROUTER } from '../../../router/router.js';

export const LoginHeader = ({ defaultIndex }) => {
  return (
    <div className="login_header">
      <div style={{ width: '100%' }}>Robot's name</div>
      <div style={{ whiteSpace: 'nowrap' }}>
        Please choose a way to sign in:
      </div>
      <Navigation
        navList={PUBLIC_ROUTER}
        ulStyle="login_nav"
        liStyle="button login_nav_btn"
        defaultIndex={defaultIndex}
      />
    </div>
  );
};
