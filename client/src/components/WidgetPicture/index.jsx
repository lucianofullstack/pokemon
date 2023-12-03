export default function Pokepics(prop) 
{
    const 
    name = prop.name.replace('-','_'),
    url  = prop.sprite,
    img = (imgs[name] !== undefined) ? imgs[name] : url
    return <img src={img} alt={prop.name}/>
}

const 
imgs = {
    bulbasaur  : bulbasaur  , 
    ivysaur    : ivysaur    ,
    venusaur   : venusaur   ,
    charmander : charmander ,
    charmeleon : charmeleon ,
    charizard  : charizard  ,
    squirtle   : squirtle   ,
    wartortle  : wartortle  ,
    blastoise  : blastoise  ,
    caterpie   : caterpie   ,
    metapod    : metapod    ,
    butterfree : butterfree ,
    weedle     : weedle     ,
    kakuna     : kakuna     ,
    beedrill   : beedrill   ,
    pidgey     : pidgey     ,
    pidgeotto  : pidgeotto  ,
    pidgeot    : pidgeot    ,
    rattata    : rattata    ,
    raticate   : raticate   ,
    spearow    : spearow    ,
    fearow     : fearow     ,
    ekans      : ekans      ,
    arbok      : arbok      ,
    pikachu    : pikachu    ,
    raichu     : raichu     ,
    sandshrew  : sandshrew  ,
    sandslash  : sandslash  ,
    nidoran_f  : nidoran_f  ,
    nidorina   : nidorina   ,
    nidoqueen  : nidoqueen  ,
    nidoran_m  : nidoran_m  ,
    nidorino   : nidorino   ,
    nidoking   : nidoking   ,
    clefairy   : clefairy   ,
    clefable   : clefable   ,
    vulpix     : vulpix     ,
    ninetales  : ninetales  ,
    jigglypuff : jigglypuff ,
    wigglytuff : wigglytuff ,
}

import bulbasaur  from '@/img/pokemons/1.svg'
import ivysaur    from '@/img/pokemons/2.svg'
import venusaur   from '@/img/pokemons/3.svg'
import charmander from '@/img/pokemons/4.svg'
import charmeleon from '@/img/pokemons/5.svg'
import charizard  from '@/img/pokemons/6.svg'
import squirtle   from '@/img/pokemons/7.svg'
import wartortle  from '@/img/pokemons/8.svg'
import blastoise  from '@/img/pokemons/9.svg'
import caterpie   from '@/img/pokemons/10.svg'
import metapod    from '@/img/pokemons/11.svg'
import butterfree from '@/img/pokemons/12.svg'
import weedle     from '@/img/pokemons/13.svg'
import kakuna     from '@/img/pokemons/14.svg'
import beedrill   from '@/img/pokemons/15.svg'
import pidgey     from '@/img/pokemons/16.svg'
import pidgeotto  from '@/img/pokemons/17.svg'
import pidgeot    from '@/img/pokemons/18.svg'
import rattata    from '@/img/pokemons/19.svg'
import raticate   from '@/img/pokemons/20.svg'
import spearow    from '@/img/pokemons/21.svg'
import fearow     from '@/img/pokemons/22.svg'
import ekans      from '@/img/pokemons/23.svg'
import arbok      from '@/img/pokemons/24.svg'
import pikachu    from '@/img/pokemons/25.svg'
import raichu     from '@/img/pokemons/26.svg'
import sandshrew  from '@/img/pokemons/27.svg'
import sandslash  from '@/img/pokemons/28.svg'
import nidoran_f  from '@/img/pokemons/29.svg'
import nidorina   from '@/img/pokemons/30.svg'
import nidoqueen  from '@/img/pokemons/31.svg'
import nidoran_m  from '@/img/pokemons/32.svg'
import nidorino   from '@/img/pokemons/33.svg'
import nidoking   from '@/img/pokemons/34.svg'
import clefairy   from '@/img/pokemons/35.svg'
import clefable   from '@/img/pokemons/36.svg'
import vulpix     from '@/img/pokemons/37.svg'
import ninetales  from '@/img/pokemons/38.svg'
import jigglypuff from '@/img/pokemons/39.svg'
import wigglytuff from '@/img/pokemons/40.svg'
