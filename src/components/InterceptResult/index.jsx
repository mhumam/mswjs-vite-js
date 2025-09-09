import React from 'react';
import ReactJson from 'react-json-view';

const App = ({ request, result, show = false }) => {
    return (
        <div>
            {show && (
                <div className="result-section">
                    <div className="result-header">
                        <div className="status-indicator"></div>
                        Hasil Intercept
                    </div>
                    <div className="result-content" id="interceptResult">
                        <div>Request URL: {request?.responseURL}</div>
                        <div>Response:</div>
                        <ReactJson
                            src={result}
                            theme="bright:inverted"
                            collapsed={1}
                            displayDataTypes={false}
                            displayObjectSize={false}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
