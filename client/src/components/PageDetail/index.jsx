export default
    function Detail() {
        const
        dispatcher = useSelector((state) => state.byName),
        { name } = useParams(),
        dispatch = useDispatch()
    useEffect(() => {
        dispatch(getByName(name))
        return () => {
            dispatch(resetDetails())
        }
    }, [dispatch])

    let loading
        = (dispatcher.length > 0)
            ? false
            : true
    return (
        <div className='main' key={'detail'+useParams().name}>
            <div className='frame'>
                <Close key="goHome" to="/home" />
                <h1>{useParams().name}</h1>
                { loading ? <Pokeball/> : <Stats pokemon={dispatcher[0]}/> }
            </div>
        </div>
    )
}

const 
Pokeball = () => { 
    return (<div className={style.pokeball}></div>) 
}

const 
Gauge = (prop) => {
    const 
    gauge = prop.gauge,
    text  = prop.text,
    value = prop.value,
    color = style[prop.color]
    return (
    <div className={[style.chart, color  ].join(' ')} style={{"--val":gauge}}>
        <p>{text} {value}</p>
    </div>
) 
}

const
Stats = (prop) => { 
    const 
    pokemon = prop.pokemon,
    {
        name, 
        speed, 
        hp, 
        attack, 
        defense, 
        height, 
        weight, 
        Types, 
        sprite
    }  = pokemon,
    
      speedGauge = Math.floor( speed   / 1.1 + 0.1) + '%',
     attackGauge = Math.floor( attack  / 1.1 + 0.1) + '%',
    defenseGauge = Math.floor( defense / 1.1 + 0.1) + '%',
         hpGauge = Math.floor( hp      / 1.4 + 0.1) + '%'
    return (
    <div key={name+"_detail"} className={style.detail}>
        <div className={style.left}>
            <div className={style.sprite}>
                <Picture name={name} sprite={sprite}/>
            </div>
        <div>
           <div className={style.height}>
               <svg  className={style.svg1} viewBox="0 0 24 24">
                   <path fill="#323130" d="M7,2C8.78,2 9.67,4.16 8.42,5.42C7.16,6.67 5,5.78 5,4A2,2 0 0,1 7,2M5.5,7H8.5A2,2 0 0,1 10.5,9V14.5H9V22H5V14.5H3.5V9A2,2 0 0,1 5.5,7M21,8H15V10H21M21,11H18V13H21M21,2H15V4H21M21,5H18V7H21M21,14H15V16H21M21,20H15V22H21M21,17H18V19H21" />
               </svg>
               {height/10}m.
               <svg  className={style.svg2} viewBox="0 0 24 24">
                   <path fill="#323130" d="M12,3A4,4 0 0,1 16,7C16,7.73 15.81,8.41 15.46,9H18C18.95,9 19.75,9.67 19.95,10.56C21.96,18.57 22,18.78 22,19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19C2,18.78 2.04,18.57 4.05,10.56C4.25,9.67 5.05,9 6,9H8.54C8.19,8.41 8,7.73 8,7A4,4 0 0,1 12,3M12,5A2,2 0 0,0 10,7A2,2 0 0,0 12,9A2,2 0 0,0 14,7A2,2 0 0,0 12,5M6,11V19H8V16.5L9,17.5V19H11V17L9,15L11,13V11H9V12.5L8,13.5V11H6M15,11C13.89,11 13,11.89 13,13V17C13,18.11 13.89,19 15,19H18V14H16V17H15V13H18V11H15Z" />
               </svg>
               {weight}
           </div>
           <div className={style.typeContainer}>
            {
                (Types)
                ? Types.map
                (
                    (type) => <div key={type.name} className={style.type}>{type.name}</div>
                )
                : ''
            }
           </div>
        </div>
        </div>
        <div className={style.right}>
            <Gauge text="SPEED"   value={speed}   gauge={speedGauge}   color='blue'  />
            <Gauge text="ATTACK"  value={attack}  gauge={attackGauge}  color='red'   />
            <Gauge text="DEFENSE" value={defense} gauge={defenseGauge} color='green' />
            <Gauge text="HP"      value={hp}      gauge={hpGauge}      color='yellow'/>
        </div>
    </div>
    )
}

import Close   from '../WidgetClose'
import Picture from '../WidgetPicture'
import style   from './detail.module.css'
import { getByName, resetDetails } from "%actions%"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
