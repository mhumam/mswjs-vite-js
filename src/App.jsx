import React, { useState } from 'react';
import Header from './components/Headers';
import { Routes, Route } from "react-router";
import { NavLink } from "react-router";
import PathParameters from './page/http-mocking/intercept-request/path-parameters';
import QueryParameters from './page/http-mocking/intercept-request/query-parameters';
import ErrorResponse from './page/http-mocking/intercept-response/error-response';
import NetworkErrors from './page/http-mocking/intercept-response/network-errors';
// import Cookies from './page/http-mocking/intercept-response/cookies';
// import Polling from './page/http-mocking/intercept-response/polling';
import ResponseTiming from './page/http-mocking/intercept-response/response-timing';
import ResponsePatching from './page/http-mocking/intercept-response/response-patching';

const App = () => {
	const [expandedSections, setExpandedSections] = useState({
		'http-mocking': true,
		'intercept-request': true,
		'mocking-response': true,
		'graphql-mocking': true
	});

	const toggleSection = (sectionKey) => {
		setExpandedSections(prev => ({
			...prev,
			[sectionKey]: !prev[sectionKey]
		}));
	};

	return (
		<div>
			<Header />
			<div className="container">
				<div className="main-content">
					<aside className="sidebar">
						<div className="menu-section">
							<div
								className="menu-title"
								onClick={() => toggleSection('http-mocking')}
								style={{ cursor: 'pointer' }}
							>
								<span className="menu-icon">
									{expandedSections['http-mocking'] ? '▼' : '▶'}
								</span>
								HTTP Mocking
							</div>
							{expandedSections['http-mocking'] && (
								<div className="submenu">
									<div
										className="submenu-title"
										onClick={() => toggleSection('intercept-request')}
										style={{ cursor: 'pointer' }}
									>
										<span className="menu-icon">
											{expandedSections['intercept-request'] ? '▼' : '▶'}
										</span>
										Intercept Request
									</div>
									{expandedSections['intercept-request'] && (
										<div className="sub-submenu">
											<NavLink to="/path-parameters" style={{ textDecoration: 'none' }}>
												{({ isActive }) => (
													<div className={`menu-item ${isActive ? "active" : ""}`} data-section="path-parameters">
														Path Parameters
													</div>
												)}
											</NavLink>
											<NavLink to="/query-parameters" style={{ textDecoration: 'none' }}>
												{({ isActive }) => (
													<div className={`menu-item ${isActive ? "active" : ""}`} data-section="query-parameters">
														Query Parameters
													</div>
												)}
											</NavLink>
											{/* <div className="menu-item" data-section="request-body">Request Body</div>
											<div className="menu-item" data-section="request-cookie">Request Cookie</div> */}
										</div>
									)}

									<div
										className="submenu-title"
										onClick={() => toggleSection('mocking-response')}
										style={{ cursor: 'pointer' }}
									>
										<span className="menu-icon">
											{expandedSections['mocking-response'] ? '▼' : '▶'}
										</span>
										Mocking Response
									</div>
									{expandedSections['mocking-response'] && (
										<div className="sub-submenu">
											<NavLink to="/error-response" style={{ textDecoration: 'none' }}>
												{({ isActive }) => (
													<div className={`menu-item ${isActive ? "active" : ""}`} data-section="error-response">
														Error Response
													</div>
												)}
											</NavLink>
											<NavLink to="/network-errors" style={{ textDecoration: 'none' }}>
												{({ isActive }) => (
													<div className={`menu-item ${isActive ? "active" : ""}`} data-section="network-errors">
														Network Errors
													</div>
												)}
											</NavLink>
											{/* <NavLink to="/cookies" style={{ textDecoration: 'none' }}>
												{({ isActive }) => (
													<div className={`menu-item ${isActive ? "active" : ""}`} data-section="cookies">
														Cookies
													</div>
												)}
											</NavLink>
											<NavLink to="/polling" style={{ textDecoration: 'none' }}>
												{({ isActive }) => (
													<div className={`menu-item ${isActive ? "active" : ""}`} data-section="polling">
														Polling
													</div>
												)}
											</NavLink> */}
											<NavLink to="/response-timing" style={{ textDecoration: 'none' }}>
												{({ isActive }) => (
													<div className={`menu-item ${isActive ? "active" : ""}`} data-section="response-timing">
														Response Timing
													</div>
												)}
											</NavLink>
											<NavLink to="/response-patching" style={{ textDecoration: 'none' }}>
												{({ isActive }) => (
													<div className={`menu-item ${isActive ? "active" : ""}`} data-section="response-patching">
														Response Patching
													</div>
												)}
											</NavLink>
										</div>
									)}
								</div>
							)}
						</div>

						{/* <div className="menu-section">
							<div
								className="menu-title"
								onClick={() => toggleSection('graphql-mocking')}
								style={{ cursor: 'pointer' }}
							>
								<span className="menu-icon">
									{expandedSections['graphql-mocking'] ? '▼' : '▶'}
								</span>
								GraphQL Mocking
							</div>
							{expandedSections['graphql-mocking'] && (
								<div className="submenu">
									<div className="menu-item" data-section="intercept-operations">Intercept Operations</div>
									<div className="menu-item" data-section="graphql-response">Mocking Response</div>
								</div>
							)}
						</div> */}
					</aside>


					<main className="content-area">
						<Routes>
							<Route path="/" element={<PathParameters />} />
							<Route path="/path-parameters" element={<PathParameters />} />
							<Route path="/query-parameters" element={<QueryParameters />} />
							<Route path="/error-response" element={<ErrorResponse />} />
							<Route path="/network-errors" element={<NetworkErrors />} />
							{/* <Route path="/cookies" element={<Cookies />} />
							<Route path="/polling" element={<Polling />} /> */}
							<Route path="/response-timing" element={<ResponseTiming />} />
							<Route path="/response-patching" element={<ResponsePatching />} />
						</Routes>
					</main>
				</div>
			</div>
		</div>
	)
}

export default App
