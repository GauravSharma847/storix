import React from 'react'
import { Link } from 'react-router-dom'
import "./AppLayout.css"

const AppLayout = ({ children }) => {
    return (
        <div className='layout'>
            <aside className='sidebar'>
                <h1>Storix</h1>
                <nav>
                    <Link to='/dashboard'>Dashboard</Link>
                    <Link to='/files'>Files</Link>
                </nav>

            </aside>
            <main className='content'>
                {children}
            </main>
        </div>
    )
}

export default AppLayout