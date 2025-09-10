import { useState, useCallback } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view';
import Input from 'antd/es/input/Input';
import Form from 'antd/es/form/Form';
import Card from 'antd/es/card/Card';

const App = () => {
    const [form] = Form.useForm();
    const [input, setInput] = useState('');
    const [request, setRequest] = useState({});
    const [result, setResult] = useState({});

    const handleSubmit = useCallback(async () => {
        if (!input.trim()) return;

        try {
            const response = await axios(`https://dummyjson.com/products?q=${input}`);
            setResult(response);
            setRequest(response?.request);
        } catch (error) {
            setResult(error);
            setRequest(error?.request);
        }
    }, [input]);

    const handleClear = useCallback(() => {
        setResult({});
        setRequest({});
        setInput('');
    }, []);

    const handleInputChange = useCallback((event) => {
        setInput(event.target.value);
    }, []);

    const hasResults = Object.keys(result).length > 0;

    return (
        <div className="content-section active" id="intercept-request">
            <h2 className="section-title">Query Parameters</h2>
            <div className="demo-container">
                <div className="code-block">
                    <div className="code-header">Setup Handler (productHandlers.jsx)</div>
                    <div className="code-content">
                        <pre>
                            <code className="language-javascript">
                                {`import { http, HttpResponse, passthrough } from 'msw';

export const handlers = [
    http.get('https://dummyjson.com/products', ({ request }) => {
        const url = new URL(request.url);
        const q = url.searchParams.get('q')

        if (q === '0') {
            return new HttpResponse(null, { status: 404 })
        }

        return passthrough();
    })
]`}
                            </code>
                        </pre>
                    </div>
                </div>

                <Card title="Custom Value Params" variant="outlined">
                    <Form layout={'vertical'} form={form} initialValues={{ layout: 'vertical' }}>
                        <Form.Item label="Search">
                            <Input placeholder="input Search" onChange={handleInputChange} value={input} />
                        </Form.Item>
                    </Form>
                </Card>
                <div className="action-buttons">
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={!input.trim()}
                    >
                        Test Request
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={handleClear}
                        disabled={!hasResults}
                    >
                        Clear
                    </button>
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
