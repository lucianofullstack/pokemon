import { Navigate } from 'react-router-dom';
import style from './pager.module.css'
export default
    function Pager(
        { pageSize, pageFunction, pageCurrent, pageStep = 12 }) {
    pageSize = Math.ceil(pageSize / pageStep)
    if (pageSize > 0 && pageCurrent > pageSize) {
        return <Navigate to='/home' />
    } // in case of reload or page outOfRange go back home
    if (pageSize < 2) return ''; // in case of lack of data or not two pages return empty
    let
        pageNumber = []
    for (let i = 0; i < pageSize; i++) {
        pageNumber.push(i + 1)
    }
    return (
        <nav className={style.pager}>
            <ul>
                <li className={style.text}>Page </li>
                {pageNumber && pageNumber.map((number) => (
                    <li key={number}>
                        <a href={'#' + number}
                            className={(number === pageCurrent) ? (style.selected) : ('')}
                            onClick={(e) => pageFunction(number, e)}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
