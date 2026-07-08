import Search from 'components/global/Search'
import DisplayError from 'components/global/DisplayError'
import ItemNotFound from 'components/global/ItemNotFound'
import Loader from 'components/global/Loader'
import Axios from 'config/api'
import React from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setStats } from 'redux/slices/adminSlice'
import useQueryParams from 'utils/hooks/useQueryParams'
import { Link } from 'react-router-dom'
import AdminUsersTable from 'components/admin-users/AdminUsersTable'

const AdminUsers = () => {
    const dispatch = useDispatch();
    const { docs } = useSelector(state => state.admin);

    const { getQueryParams } = useQueryParams();
    const { page = 1, keyword = '' } = getQueryParams();

    const queryKey = ['fetch-all-admin-users', page, keyword];
    const { isLoading, isError, error } = useQuery(queryKey, () => {
        return Axios(`/user/all-admins?keyword=${keyword}&page=${page}`);
    }, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const { data: { data: { docs, pages, docsCount, page } } } = data;
            dispatch(setStats({ docs, pages, docsCount, page }))
        }
    });


    return (
        <div>
            {/* <h1 className="section-heading">
                ADMIN USER LIST
            </h1>
            <div className="mt-12 flex items-center justify-end gap-4">
                <div>
                    <Search placeholder='Search' />
                </div>
                    <div>
                     <Link 
                                to='/app/admin-users/add' 
                                className="btn-secondary py-3 px-6"
                                >
                                    + Add
                                </Link>
                            </div>
            </div>
            
            <div className="mt-4">
                {
                    isLoading
                    ?
                        <Loader />
                    :
                    isError
                    ?
                        <DisplayError message={error} />
                    :
                    docs?.length > 0
                    ?
                        <AdminUsersTable />
                    :
                        <ItemNotFound message='No User found.' />
                }
            </div> */}
        </div>
    )
}

export default AdminUsers