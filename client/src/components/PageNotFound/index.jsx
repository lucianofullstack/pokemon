const
  out =
    <div key="notfound" className='main'>
      <div key="404detail" className='frame'>
        <Close to="/" />
        <h1>Not found</h1>
        <Link to="/">
          <img src={pic404} className={pic.pikachu} alt="pikachu" />
        </Link>
      </div>
    </div>

export default
  function NotFound() { return out }

import { Link } from 'react-router-dom'
import Close from '../WidgetClose'
import pic from './notfound.module.css'
import pic404 from '@/img/404.png'
