import { ClipLoader } from 'react-spinners'

const Loader = ({ color = "#2D3748" }) => {
  return (
    <div className="w-full h-[200px] flex items-center justify-center bg-white rounded-md mt-8">
      <div
        className="w-7 h-7 rounded-full border-4 border-gray-200 animate-spin"
        style={{ borderTopColor: color }}
      ></div>
      <span className="ml-2">Loading...</span>
    </div>
  );
};

export default Loader;
