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
            const response = await axios('https://dummyjson.com/posts/1');
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
            <h2 className="section-title">Response Patching</h2>
            <div className="demo-container">
                <div className="code-block">
                    <div className="code-header">Setup Handler (responseHandlers.jsx)</div>
                    <div className="code-content">
                        <pre>
                            <code className="language-javascript">
                                {`import { http, HttpResponse, bypass } from 'msw';

export const handlers = [
    http.get('https://dummyjson.com/posts/1', async ({ request }) => {
        // Get the original JSON response from the server.
        const originalData = await fetch(bypass(request)).then((response) => response.json())

        return HttpResponse.json({
            // Combine the original data with the mocked data.
            ...originalData,
            mockId: 'mocked-id',
        })
    })
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
