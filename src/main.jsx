import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import MainFrame from "./MainFrame.jsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/validate/" element={<MainFrame/>}/>
            </Routes>
        </Router>
    </StrictMode>
)

/*

const SuccessPage = () => {
    const location = useLocation();
    const data = location.state?.data; // دریافت State

    // تبدیل رشته JSON به آبجکت
    const jsonData = data ? JSON.parse(data) : {};

    return (
        <div>
            <h1>Validation Successful!</h1>
            <p>You have been redirected to this page after successful validation.</p>
            <ul>
                {Object.entries(jsonData).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};
*/
