export default 
function 
Card(prop) {
    const 
    pokedex = prop.pokedex,
    {id, name,sprite} = pokedex
    return (
        <Link key={"pokeCardLink_"+id} className={style.link} to={"/pokemons/"+name}>
            <div key={"pokeCard_"+id} className={style.card}>
                <div className={style.name}>{name}</div>
                <div className={style.sprite}>
                    <Picture name={name} sprite={sprite}/>
                </div>
                {render.table(pokedex)}
                {render.types(id, pokedex.Types)}
            </div>
        </Link>
    )
}

const 
render = {}
render.table = (pokedex) => {
    const {
        speed, hp, attack, defense, height, weight
    } = pokedex
    return (
 <table>
    <tbody>
        <tr>
            <td>SPEED</td>
            <td>{speed}</td>
            <td>HP</td>
            <td>{hp}</td>
        </tr>
        <tr>
            <td>ATTACK</td>
            <td>{attack}</td>
            <td>DEFENSE</td>
            <td>{defense}</td>
        </tr>
        <tr>
            <td>HEIGHT</td>
            <td>{height}</td>
            <td>WEIGHT</td>
            <td>{weight}</td>
        </tr>
    </tbody>
</table>
)}
render.types = (id,types) => {
    return (
        <div className={style.typeContainer}>
        {
            (types)
            ? types.map( 
                (type,index) => <Type key={ "pokeCard_"+id+index } name={type.name}/>
              )
            : ''
        }
        </div>
    )
}

import { Link } from 'react-router-dom'
import style    from './card.module.css'
import Type     from '../WidgetType'
import Picture  from '../WidgetPicture'
