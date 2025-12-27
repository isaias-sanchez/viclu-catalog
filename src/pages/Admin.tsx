import AdminPanel from '@/components/AdminPanel';
import { Helmet } from 'react-helmet-async';

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Admin Panel | Viclu Store</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminPanel />
    </>
  );
};

export default Admin;
