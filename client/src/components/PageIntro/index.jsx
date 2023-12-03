import { Navigate } from 'react-router-dom';
export default
    function PageIntro() {
    sessionStorage.removeItem('intro')
    return <Navigate to='/' />
}
