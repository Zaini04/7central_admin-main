import { useNavigate } from 'react-router-dom';


const BackBtn = ({ label = 'Back', url = -1 }) => {
    const navigate = useNavigate();

    return (
        <div>
            <button 
            className="flex items-center gap-1 hover:text-primary"
            onClick={() => navigate(url)}
            >
                <i className="uil uil-arrow-left text-lg"></i>
                <span>
                    {label}
                </span>
            </button>
        </div>
    )
}

export default BackBtn