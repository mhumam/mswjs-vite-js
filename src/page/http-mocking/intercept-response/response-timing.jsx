import { useState, useCallback } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import InterceptResult from '../../../components/InterceptResult';

const App = () => {
    const [request, setRequest] = useState({});
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(async () => {
        await setIsLoading(true);
        try {
            const response = await axios('https://dummyjson.com/response-timing');
            setResult(response);
            setRequest(response?.request);
            await setIsLoading(false);
        } catch (error) {
            await setIsLoading(false);
            setResult(error);
            setRequest(error?.request);

        }
    }, []);

    const hasResults = Object.keys(result).length > 0;

    return (
        <div className="content-section active" id="intercept-request">
            <h2 className="section-title">Response Timing</h2>
            <div className="demo-container">
                <div className="code-block">
                    <div className="code-header">Setup Handler (responseHandlers.jsx)</div>
                    <div className="code-content">
                        <pre>
                            <code className="language-javascript">
                                {`import { http, HttpResponse, delay } from 'msw';

export const handlers = [
    http.get('https://dummyjson.com/response-timing', async () => {
        await delay(5000)
        return HttpResponse.json({ id: 'abc-123' })
    }),
]`}
                            </code>
                        </pre>
                    </div>
                </div>

                <div className="action-buttons">
                    <Button type="primary" size='large' onClick={() => handleSubmit()} loading={isLoading}>
                        {isLoading ? 'Loading' : 'Submit'}
                    </Button>
                </div>
                <InterceptResult show={hasResults} request={request} result={result} />
            </div>
        </div>
    );
};

export default App;
