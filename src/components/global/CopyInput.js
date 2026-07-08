import CopySuccessSvg from 'assets/svgs/CopySuccessSvg';
import CopySvg from 'assets/svgs/CopySvg';
import { useState, useRef, memo } from 'react';
import { Tooltip } from 'react-tooltip';
import { useWindowSize } from 'react-use';

const CopyInput = ({ value , label , hint , name , inputBg }) => {
    const { width } = useWindowSize();
    const inputRef = useRef(null);
    const [copied , setCopied] = useState('');

    const handleCopy = () => {
        inputRef.current.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000)
    };

    return (
        <div className='flex flex-col gap-2 w-full'>
            {
                label 
                ?
                    <label className='flex items-center gap-1'>
                        {label}
                        {
                            hint && (
                                <span
                                data-tooltip-id={name}
                                data-tooltip-content={hint}
                                className='text-grayText'
                                >
                                    <i className="uil uil-info-circle"></i>
                                    <Tooltip
                                    id={name}
                                    style={{ 
                                        fontSize : 15 , 
                                        background : 'var(--primary)', 
                                        width : 220 ,
                                    }} 
                                    />
                                </span>
                            )
                        }
                    </label>
                : ''
            }
            <div className='relative flex items-center w-full'>
                <input
                    ref={inputRef}
                    type="text"
                    className={`flex-1 w-full ${inputBg ? inputBg : 'bg-secondary'} rounded-md p-3 outline-none`}
                    value={value}
                    readOnly 
                />
                <div className='btn-primary py-2 px-2 flex items-center justify-center'>
                    {
                        copied 
                        ? 
                        <button type='button' className='flex items-center gap-2'>
                            <CopySuccessSvg />
                            <span>Copied</span>
                        </button>
                        : 
                        <button type='button' onClick={handleCopy} className='flex items-center gap-2'>
                            <CopySvg />
                            <span>Copy</span>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default memo(CopyInput);
