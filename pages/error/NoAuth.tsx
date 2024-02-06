import { Link } from 'react-router-dom';
import logo from '../../assets/images/Blogger-logo1.png';
import { styled } from 'styled-components';

const ErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
`;

const Clearance = styled.div`
  height: 64px;
`;

const BlogImg = styled.img`
  height: 64px;
  width: 64px;
`

function NoAuth() {
  return (
    <ErrorPage>
      <Clearance />
      <BlogImg src={logo} alt="Blogger logo" />
      <h1>Unauthorised</h1>
      <p>Please <Link to='/login'>Login</Link>.</p>
    </ErrorPage>
  );
}

export default NoAuth;
