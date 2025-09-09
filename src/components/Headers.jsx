import React from 'react'

const App = () => {
    console.log("test")
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">MSW Demo</div>
                    <div className="msw-toggle">
                        <div className="toggle-switch" id="mswToggle">
                            <div className="toggle-slider"></div>
                        </div>
                        <div className="toggle-label" id="toggleLabel">MSW Aktif</div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default App
