import { confirmAlert } from 'react-confirm-alert'; 

const confirmBox = (
    {
        title = 'Confirm to submit' ,
        message='Are you sure? You want to Perform this Action?' ,
        onYesClick , 
        onNoClick = () => ''
    }
) => {
    confirmAlert({
        title ,
        message ,
        buttons: [
            {
                label: 'Yes',
                onClick: onYesClick
            },
            {
                label: 'No',
                onClick: onNoClick
            }
        ]
    });
}

export default confirmBox;