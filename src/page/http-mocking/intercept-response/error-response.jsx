import { useState, useCallback } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view';
import { Button } from 'antd';

const App = () => {
    const [request, setRequest] = useState({});
    const [result, setResult] = useState({});

    const handleSubmit = useCallback(async (errorCode) => {
        try {
            const response = await axios(`https://dummyjson.com/error-response?errorCode=${errorCode}`);
            setResult(response);
            setRequest(response?.request);
        } catch (error) {
            setResult(error);
            setRequest(error?.request);
        }
    }, []);

    const hasResults = Object.keys(result).length > 0;

    return (
        <div className="content-section active" id="intercept-request">
            <h2 className="section-title">Network Errors</h2>
            <div className="demo-container">
                <div className="code-block">
                    <div className="code-header">Setup Handler (responseHandlers.jsx)</div>
                    <div className="code-content">
                        <pre>
                            <code className="language-javascript">
                                {`import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('https://dummyjson.com/error-response', ({ request }) => {
        const url = new URL(request.url);
        const errorCode = url.searchParams.get('errorCode');

        if (errorCode) {
            return new HttpResponse(null, { status: errorCode })
        }

        return HttpResponse.json({ data: 'success' });
    })
]`}
                            </code>
                        </pre>
                    </div>
                </div>

                <div className="action-buttons">
                    <Button type="primary" size='large' danger onClick={() => handleSubmit(403)}>403 Unauthorized</Button>
                    <Button type="primary" size='large' danger onClick={() => handleSubmit(404)}>404 Not Found</Button>
                    <Button type="primary" size='large' danger onClick={() => handleSubmit(500)}>500 Server Error</Button>
                </div>

                {hasResults && (
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
        </div>
    );
};

export default App;
