import CrossSvg from 'assets/svgs/CrossSvg'
import EditSvg from 'assets/svgs/EditSvg'
import Pagination from 'components/global/pagination'
import Status from 'components/global/Status'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { Tooltip } from 'react-tooltip'
import { admin_delete, admin_edit } from 'redux/actions/adminActions'
import { setDocDetails } from 'redux/slices/adminSlice'
import confirmBox from 'utils/confirmBox'
import formatAmount from 'utils/formatAmount'

const AdminUsersTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedItemId , setSelectedItemId] = useState(null);
    const { docs , pages , updateLoading } = useSelector(state => state.admin);

    const getWarnMessage = (status) => {
        const actions = {
            active: 'Activate',
            blocked: 'Block',
            deleted: 'Delete',
        };
        return `Are you sure? You want to ${actions[status] || 'perform this action on'} this user?`;
    };

    const statusChangeHandler = (itemId , status) => {
        setSelectedItemId(itemId);

        const message = getWarnMessage(status);
        const onYesClick = () => {
            dispatch(admin_edit(itemId , { status }))
        }
        confirmBox({ message , onYesClick });
    }
    const editHandler = (item) => {
        dispatch(setDocDetails(item));
        navigate(`/app/admin-users/edit/${item?._id}`)
    }
    return (
        <div className='table-container w-full'>
            <Table>
                <Thead>
                    <Tr>
                        <Th>
                            Username
                        </Th>
                        <Th>
                            Email
                        </Th>
                        <Th>
                            Country
                        </Th>
                        <Th>
                            Created At
                        </Th>
                        <Th>
                            Status
                        </Th>
                        <Th>
                            Edit
                        </Th>
                        <Th>
                            Delete
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        docs?.map(item => (
                            <Tr key={item?._id}>
                                <Td>
                                    {item?.username}
                                </Td>
                                <Td>
                                    {item?.email}
                                </Td>
                                <Td>
                                    {item?.country || '----'}
                                </Td>
                               
                                <Td>
                                    {moment(item?.createdAt).format('DD MMM YYYY')}
                                </Td>
                                <Td>
                                    <div className="icon">
                                        <Status status={item?.status} />
                                    </div>
                                </Td>
                                <Td>
                                    <div
                                            className="icon"
                                            onClick={() => editHandler(item)}
                                            data-tooltip-id="edit-admin"
                                            data-tooltip-content={'Edit Admin'}
                                        >
                                            <EditSvg className={'w-[20px] fill-pure cursor-pointer hover:fill-primary'} />
                                            <Tooltip
                                                id='edit-admin'
                                            />
                                        </div>
                                </Td>
                                <Td>
                                    {
                                        selectedItemId === item?._id && updateLoading
                                        ?
                                            <div className='icon'>
                                                <ClipLoader size={20} color='white' />
                                            </div>
                                        :
                                        <div className="icon">
                                            <button
                                            data-tooltip-id="block-user"
                                            data-tooltip-content={
                                                item?.status === 'active' 
                                                ? 
                                                    'Delete User' 
                                                :
                                                item?.status === 'deleted'
                                                ?
                                                    'Undo Delete'
                                                :
                                                    ''
                                            }
                                            onClick={() => {
                                                statusChangeHandler(
                                                    item?._id ,
                                                    item?.status === 'active' ? 'deleted' : item?.status === 'deleted' ? 'active' : ''
                                                )
                                            }}
                                            >
                                                {
                                                    item?.status === 'active'
                                                    ?
                                                        <CrossSvg 
                                                        className={'w-[20px] fill-pure cursor-pointer hover:fill-primary'} 
                                                        />
                                                    : 
                                                    item?.status === 'deleted'
                                                    ? 
                                                        <i className="uil uil-history-alt text-2xl"></i>
                                                    : 
                                                        '---'
                                                }
                                            </button>
                                        </div>

                                    }
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
            <Pagination 
            totalPages={pages}
            />
        </div>
    )
}

export default AdminUsersTable