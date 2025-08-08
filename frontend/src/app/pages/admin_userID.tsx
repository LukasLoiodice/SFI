import { useParams } from "react-router";
import { AdminUserIDComponent } from "src/features/users/components/admin_userID";

export default function AdminUserID() {
    const { userID } = useParams()

    return (
        <AdminUserIDComponent userID={userID}/>
    )
}