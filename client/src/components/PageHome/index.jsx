export default
  function
  Main() {
  ReadData()
  const
    pageStep = 12,     // Cards per Page
    changeUrl = false, // TRUE saves URL and remerbers pagination without useParams

    type = useSelector((state) => state.type),
    data = useSelector((state) => state.filter),

    [ search      , setSearch      ] = useState(''),
    [ filteredBy  , setFilteredBy  ] = useState('all'), 
    [ orderedBy   , setOrderedBy   ] = useState('none'),
    [ currentPage , setCurrentPage ] = useState(pageUrl(changeUrl, orderedBy)),  // useState(1) = always reset
    dispatch = useDispatch(),

    $ = {}
    $.logo = () => {
      setFilteredBy('all')
      setOrderedBy('none')
      setCurrentPage(1)
      dispatch(filterType('all'))
    }
    $.page = (page, e = 0) => {
      setCurrentPage(page)
      if (e !== 0 && changeUrl === false) {
        e.preventDefault()
      }
    }
    $.order = (e = 0) => {
      if (e !== 0 ) {
         e.preventDefault()
      }; const value = e.target.id;
      if (orderedBy !== value) {
        setCurrentPage(1)
      }
        dispatch(setOrder(value))
        setOrderedBy(value)
    }
    $.type = (e = 0) => {
      if (e !== 0 ) {
        e.preventDefault()
     }; const value = e.target.value;
      if (filteredBy !== value)
     {
       setCurrentPage(1)
       setFilteredBy(value)
       dispatch(filterType(value))
     }   
    }
    $.search = async ( e = 0 ) => {
      if (e !== 0 ) {
          e.preventDefault()
          const
          value = e.target.value.toLowerCase().replace(/[^a-z]/gi, '')
          if (value.length < search.length) {
            setSearch(value)
            setFilteredBy('all')
            setOrderedBy('none')
            setCurrentPage(1)
            dispatch(filterType('all'))
            dispatch(find(value))
          }
          dispatch(find(value))
          setSearch(value)
        }
    }

  return (
    <>
      <Logo logoFunction={$.logo}/>
      <Toolbar>
        <Search 
            value = {search}
            searchFunction={$.search}
        />
      </Toolbar>
      <Toolbar>
        <Filter
          order={
            {
              none: xx,
              nameAsc: az,
              nameDesc: za,
              attackDesc: dw,
              attackAsc: up,
            }
          }
          orderFunction={$.order}
          select={type}
          selectFunction={$.type}
          value={filteredBy}
        />
      </Toolbar>
      <Toolbar>
        <Select 
          select={type}
          selectFunction={$.type}
          value={filteredBy}        
        />
        <Pager
          pageSize={data.length}
          pageFunction={$.page}
          pageCurrent={currentPage}
          pageStep={pageStep}
        />
      </Toolbar>
      <NotFound amount={data.length}/>
      <Grid
        from={[...data]}
        page={pageStep}
        current={currentPage}
      />
    </>
  )
}

const NotFound = ({amount}) => (amount===0) ? <h1>Not found</h1> : ''

const Search = ({value, searchFunction}) => 
  <input 
    className={style.search}
    id='search'
    type='text'
    placeholder="Search..."
    name="search"
    autoFocus
    value={value}
    onChange = { async (e) => searchFunction(e) }
  />
const Logo = ({logoFunction}) => <img
    id={style.logo}
    className='logo'
    src={imgLogo}
    alt="Pokemon"
    onClick={ async (e) => logoFunction(e) }
  />
const pageUrl = (go, order) => {
  const
    url = window.location.href.split('#')
  return (
    go === true
    && url.length === 2
    && !isNaN(url[1])
    && order === 'none')
    ? url[1]
    : 1
}

const Grid = (prop) => {
  const
    data = prop.from,
    page = prop.page || 12,
    actual = prop.current || 1,
    last = actual * page,
    first = last - page
  if (data.length < 1) {
    return <Loading />
  }
  return <div className={style.pokemons}>
    {
      data
        .slice(first, last)
        .map((row) =>
          <Card key={"pokemon" + row.id} pokedex={row} />
        )
    }</div>
}

const Loading = () =>
  <img src={imgLoading}
    alt="loading"
    key="imgLoading"
    className="loading"
  />

const Toolbar = ({ children }) =>
  <div className={style.toolBar}>
    {children}
  </div>

const Select = ({ select, selectFunction, value }) => 
  <select
     id='pokeselector'
     name='Tipos de Pokemon'
     className={style.selector}
     onChange={async (e) => selectFunction(e)}
     value={value}
  ><option key='all' value='all'>ALL</option>
  { select
    .map((p) => 
      <option
        className={style.option}
        key={p.name}
        value={p.name}
      >{(p.name).toUpperCase()}
      </option>)}
  </select>

const Filter = ({ order, orderFunction }) => 
<ul>{
  Object.entries(order)
  .map ( ([k, v]) =>
    <li key={'li' + k}>
      <img  className={style.orderButton}
            id={k}
            key={k}
            alt={k}
            src={v}
            onClick={ async (e) => orderFunction(e) }
      />
    </li>)}
    <li>
      <Link to="/Create">
        <img
          id='create'
          className={style.orderButton}
          src={cc}
        />
      </Link>
    </li>
</ul>

import { ReadData } from '../helpers'
import imgLogo    from '@/img/logo.png'
import imgLoading from '@/img/loading.gif'
import style from './main.module.css'
import up from '@/img/filters/UP.svg'
import dw from '@/img/filters/DW.svg'
import az from '@/img/filters/AZ.svg'
import za from '@/img/filters/ZA.svg'
import xx from '@/img/filters/XX.svg'
import cc from '@/img/filters/CC.svg'
import Pager from '../WidgetPager'
import Card from '../WidgetCard'
import { useDispatch, useSelector } from 'react-redux'
import { setOrder, filterType, find } from '%actions%'
import { Link }            from 'react-router-dom';
import React, { useState } from 'react'
