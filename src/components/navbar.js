import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { Context } from './wrapper'


function Navbar() {
    const context = useContext(Context)



    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand"><FormattedMessage id='app.notes' defaultMessage='Notes' /></Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">

                    <li className="navbar-item">
                        <Link to="/create" className="nav-link"><FormattedMessage id='app.createNote' defaultMessage='Create Note' /></Link>
                    </li>
                </ul>
            </div>
            <select onChange={context.selectLang}>
                <option value='cs-CZ'>Čeština</option>
                <option value='en-US'>English</option>
            </select>

        </nav>
    )
}
export default Navbar