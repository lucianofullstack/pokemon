import { Link } from "react-router-dom"
export default 
function 
Close(prop) 
{
  const 
  link = 
  <div className='close'>
      <Link to={prop.to}>
          <div className='arrow'>
              <div className='line'></div>
              <div className='line'></div>
          </div>
      </Link>
  </div>
  return link
}
