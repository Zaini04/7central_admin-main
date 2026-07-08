import useQueryParams from 'utils/hooks/useQueryParams'

const Sort = ({ options , sortKey = 'sort' }) => {
    const { setQueryParams } = useQueryParams();

    const handleSorting = (e) => {
        setQueryParams({ [sortKey] : e.target.value , page : 1  })
    }

    return (
        <select 
        className='input w-full bg-transparent'
        onChange={handleSorting}
        >
            {
                options?.map((item , index) => (
                    <option
                    key={index}
                    value={item.value}
                    className='capitalize !bg-dark1'
                    >
                        {item.key}
                    </option>
                ))
            }
        </select>
    )
}

export default Sort;