import bg from '@/img/blueprint.png'
import back from '@/img/back.png'
import style from './create.module.css'
import { useSelector, useDispatch } from "react-redux"
import { create, postEdit, getType, clean } from '%actions%'
import { useNavigate } from "react-router-dom";
import { sanitize } from '../helpers'

export default
    function Create() {
    const
        status = useSelector((state) => state.status),
        post = useSelector((state) => state.post),
        type = useSelector((state) => state.type),
        created = useSelector((state) => state.create),
        dispatch = useDispatch(),
        navigate = useNavigate(),
        getName = (key) => type[type.map((field) => { return field.id }).indexOf(key)].name,
        Selector = () => {
            return type
                .map((field) => {
                    let
                        name = field.name,
                        id = field.id
                    return <option key={name} value={id}>{name.toUpperCase()}</option>
                })
        },
        handleSelector = (e) => {
            const
                first = Number(document.getElementById('first').value)
            let
                second = Number(document.getElementById('second').value)
            if (first === second || (first === 12 && second === 0)) {
                document.getElementById('second').value = 'none'
                second = Number('none')
            }
            const
                out = (isNaN(second))
                    ? [{ name: getName(first) }]
                    : [{ name: getName(first) }, { name: getName(second) }]
            let
                formData = []
            formData['types'] = out
            dispatch(postEdit(formData))
        },
        handleSlider = (e) => {
            let
                value = e.target.value
            const
                index = e.target.id,
                idlbl = index + 'value',
                id = document.getElementById(idlbl)
            let
                formData = {}
            formData[index] = Number(value)
            dispatch(postEdit(formData))
            if (id) {
                if (index === 'height') {
                    value = (value < 100)
                        ? value + ' cm'
                        : (value / 100).toFixed(2) + ' m'
                }
                if (index === 'weight') {
                    value = (value / 10).toFixed(2) + ' kg'
                }
                id.innerHTML = value
            }
        },
        valido = (e) => {
            const
                input = e.target,
                re = new RegExp
                    ("^" + input.getAttribute("pattern") + "$")
            let
                output = {}
            output[input.id] = ''
            if (re.test(input.value)
                || input.value === '') {
                input.classList.remove('error')
                output[input.id] =
                    (input.id === 'name')
                        ? sanitize(input.value)
                        : input.value
            } else {
                input.classList.add('error')
            } dispatch(postEdit(output))
        },
        handleSubmit = (e) => {
            if (post.name !== ''
                && post.sprite !== ''
                && document.getElementById('email').value === ''
                && document.getElementsByClassName("error").length === 0
            ) {
                e.preventDefault()
                dispatch(create(post))
                for (const [id, value] of Object.entries({
                    second: 'none',
                    sprite: '',
                    name: '',
                    first: 1,
                })) {
                    document.getElementById(id).value = value;
                }
                for (const [id, value] of Object.entries({
                    height: 500,
                    weight: 500,
                    hp: 500,
                    attack: 500,
                    defense: 500,
                    speed: 60
                })) {
                    document.getElementById(id).value = Number(value);
                    handleSlider(
                        {
                            target: {
                                id: id,
                                value: Number(value)
                            }
                        }
                    )
                }
                dispatch(clean())
                document.getElementById('name').focus()
            }
        }
    if (!status.GET_TYPE) { dispatch(getType()) }

    return (
        <div key="createPokemon" className={style.createPokemonBody}>
            <img src={bg} alt='pikachu' />
            <div className={style.createPokemon}>
                {
                    (created.name)
                        ? <div id={style.dialog}>
                            <h4>{created.name}</h4>
                            <h5>{created.data}</h5>
                            <input onClick={() => { navigate(`/pokemons/${created.name}`) }} type="button" value="GO" className={style.button2} />
                        </div>
                        : ''
                }
                {
                    (created.error)
                        ? <div id={style.dialog}>
                            <h4>Error {created.error}</h4>
                            <h5>{created.data}</h5>
                            <input onClick={() => { navigate(`/home`) }} type="button" value="GO" className={style.button2} />
                        </div>
                        : ''
                }
                <form name='form' id='form' method='post' action='' onSubmit={(e) => { e.preventDefault() }}>
                    <fieldset>
                        <div className={style.row}>
                            <div className={style.column}>
                                <img src={back} 
                                     alt='back' 
                                     className={style.back} 
                                     onClick={() => { navigate(`/home`) }}
                                />
                                <h3>POKEMON DESIGNER</h3>
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.wide_column}>
                                <input type='text' id="email" className={style.email} name='email' />
                                <label>Name
                                    <input type='text' onInput={(e) => valido(e)} id='name' name='name'
                                        pattern="[a-zA-Z].{3,}" minLength='3' autoFocus required='required'
                                        placeholder='name is required (min 4 alpha) ...' />
                                </label>
                            </div>
                            <div className={style.column}>
                                <label>1st Type</label>
                                <select  id='first' name='first'
                                    required='required' size='1' onChange={(e) => { handleSelector(e) }}>
                                    <option key='normaldefault' value='12' hidden> NORMAL (default)</option>
                                    <Selector />
                                </select>
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.wide_column}>
                                <label>Picture URL
                                    <input type='text' onInput={(e) => valido(e)} name='sprite' id='sprite'
                                        required='required' placeholder='url is required png jpg gif jpeg'
                                        pattern="[hH][tT][tT][pP][sS]?:\/\/.*\.(?:png|jpg|gif|jpeg)"
                                    />
                                </label>
                            </div>
                            <div className={style.column}>
                                <label>2nd Type</label>
                                <select defaultValue={'nonedefault'} id='second' name='second' required='required'
                                    size='1' onChange={(e) => { handleSelector(e) }}>
                                    <option key='nonedefault' hidden value='nonedefault'> NONE (default) </option>
                                    <option key='none' value='none'> NONE </option>
                                    <Selector />
                                </select>
                            </div>
                        </div>
                        <div className={style.gridGauge}>
                            <div className={style.gridControl}>
                                <label>Height: <span id='heightvalue'>
                                    {
                                        (post.height < 100)
                                            ? (post.height + ' cm')
                                            : ((post.height / 100).toFixed(2) + ' m')
                                    } </span></label>
                                <input type="range" id="height" name="height" min="10" max="1000"
                                    defaultValue={post.height} step="5" onChange={(e) => handleSlider(e)} />
                            </div>
                            <div className={style.gridControl}>
                                <label>Weight: <span id='weightvalue'>{(post.weight / 10).toFixed(2)} kg</span></label>
                                <input type="range" id="weight" name="weight" min="10" max="1000"
                                    defaultValue={post.weight} step="5" onChange={(e) => handleSlider(e)} />
                            </div>
                            <div className={style.gridControl}>
                                <label>HP: <span id='hpvalue'>{post.hp} </span></label>
                                <input type="range" id="hp" name="hp" min="10" max="1000"
                                    defaultValue={post.hp} step="5" onChange={(e) => handleSlider(e)} />
                            </div>
                            <div className={style.gridControl}>
                                <label>Atttack: <span id='attackvalue'>{post.attack} </span></label>
                                <input type="range" id="attack" name="attack" min="10" max="1000"
                                    defaultValue={post.attack} step="5" onChange={(e) => handleSlider(e)} />
                            </div>
                            <div className={style.gridControl}>
                                <label>Defense: <span id='defensevalue'>{post.defense} </span></label>
                                <input type="range" id="defense" name="defense" min="10" max="1000"
                                    defaultValue={post.defense} step="5" onChange={(e) => handleSlider(e)} />
                            </div>
                            <div className={style.gridControl}>
                                <label>Speed: <span id='speedvalue'>{post.speed}</span></label>
                                <input type="range" id="speed" name="speed" min="10" max="110"
                                    defaultValue={post.speed} step="5" onChange={(e) => handleSlider(e)} />
                            </div>
                        </div>
                        <div className={style.foot}>
                            <div className={style.left}>
                                <b>AVISO</b>: This application was made with educational purposes. Pokémon is a trademark of Nintendo. Luciano Pereira ©2022 GitHub: lucianofullstack
                            </div>
                            <div className={style.right}>
                                <button type='submit' onClick={(e) => handleSubmit(e)}>SEND</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
