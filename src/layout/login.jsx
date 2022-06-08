import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/registerForm';
import { QualityProvider } from '../hooks/useQuality';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');
  const toggleFormType = () => {
    setFormType(prevState => prevState === 'register' ? 'login' : 'register');
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          { formType === 'register'
            ? <QualityProvider><RegisterForm />
              <p>Already have an account?
                <a role='button' onClick={toggleFormType}> Sign In</a>
              </p>
            </QualityProvider>
            : <><LoginForm />
              <p>Do not have an account?
                <a role='button' onClick={toggleFormType}> Sign Up</a>
              </p>
            </>}
        </div>
      </div>
    </div>
  );
};
export default Login;
