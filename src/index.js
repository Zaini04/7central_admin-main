import React, { Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';


import 'styles/index.css';
import 'styles/utilities.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'styles/custom-confirm-alert.css'



import { Provider } from 'react-redux';
import store from 'redux/store';

// React Query
import { QueryClient, QueryClientProvider } from 'react-query';
import PreLoader from 'components/global/PreLoader';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<PreLoader />}>
        <Router>
            <Toaster
                position="top-center"
            />
            <QueryClientProvider client={queryClient}>
                <Provider store={store} >
                    <App />
                </Provider>
            </QueryClientProvider>
        </Router>
    </Suspense>
);