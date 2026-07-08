import { Link } from 'react-router-dom';
import ErrorImg from 'assets/images/404-error-idea.gif';

const NotFound = () => (
    <div className="flex flex-col h-screen text-center justify-center bg-dark text-pure">
        <div className="max-w-md mx-auto">
            <img src={ErrorImg} alt="404" className="w-full max-w-lg mx-auto" />
            <h1 className="text-4xl font-bold mb-4">
                Opps!!!
            </h1>
            <h4 className="text-xl mb-4">
                This page you are looking for could not be found.
            </h4>
            <Link to="/app">
                <button className="inline-block mx-auto btn-primary py-2 px-6 mt-6">
                    Go Back to Home
                </button>
            </Link>
        </div>
    </div>
);

export default NotFound;
