import { useState, useCallback } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import InterceptResult from '../../../components/InterceptResult';

const App = () => {
    const [request, setRequest] = useState({});
    const [result, setResult] = useState({});

    const handleSubmit = useCallback(async () => {
        try {
            const response = await axios(`https://dummyjson.com/network-errors`);
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
            <h2 className="section-title">Error Responses</h2>
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
                    <Button type="primary" size='large' danger onClick={() => handleSubmit(403)}>Network Errors</Button>
                </div>
                <InterceptResult show={hasResults} request={request} result={result} />
            </div>
        </div>
    );
};

export default App;
