import intro from './intro.module.css'
export default
    function
    Intro({ children }) {
    return (<div key="intro" className={intro.landing}>
        <article>
            <p className={intro.center}>**** commodore 64 basic v2 ****</p>
            <p className={intro.center}>64k ram system 38911 basic bytes free</p>
            <p>ready</p><br />
            <p className={intro.typing}>load "pokemon.jsx",8,1</p><br />
            <p className={[intro.hide, intro.one].join(' ')}>searching for POKEMON.JSX</p>
            <p className={[intro.hide, intro.two].join(' ')}>LOADING</p>
            <p className={[intro.hide, intro.three].join(' ')}>READY</p><br />
            <p className={[intro.hide, intro.four].join(' ')}>RUN</p>
            <div className={intro.trainer}></div>
            <div className={intro.logo}></div>
            <div className={intro.marquee}>
                <ul className={intro.marquee__inner}>
                    {Array.from({ length: 4 }).map((it, index) =>
                        <li key={"intro_" + index} className={intro.marquee__part}>
                            8BIT POKEMON'22-
                        </li>
                    )}
                </ul>
            </div>
            <div className={intro.ok}>
                {children}
            </div>
        </article>
    </div>)
}
