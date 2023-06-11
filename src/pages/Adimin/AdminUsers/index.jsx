import { useEffect, useState } from "react";
import AdminCards from "../../../components/AdminAppBar/AdminCards";
import UserAdmin from "../../../components/AdminUsers/Index";
import { api } from '../../../services/api'
import AdminUsersTotals from "../../../components/AdminUsers/AdminTotais";
import AdminGrafic from "../../../components/AdminUsers/AdminGrafic";
import moment from "moment/moment";




export default function AdminUser() {

    const [users, setUsers] = useState([]);
    console.log(users)
    useEffect(() => {
        async function fetchUsers() {
            const response = await api.get("/users");
            setUsers(response.data)
        }
        fetchUsers();
    }, [])


    let totals = users.length
    
    function displayMonths(user) {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        let userMonths = []
        let store = []
        let valPerMonth = {}

        user.map((data) => {
            let formatDate = moment(data.created_at).format('MMM')
            userMonths.push(formatDate)
            store.push(formatDate)

        })
        months.map(month => {
            if (!userMonths.includes(month)){
                userMonths.push(month)
            }
        })
      
        userMonths.map(item => {
            if (store.includes(item)){
                valPerMonth[item] = (valPerMonth[item] || 0) + 1
            } else{
                valPerMonth[item] = (valPerMonth[item] || 0) 
            }
        })
        
        return [valPerMonth, Object.values(months)]

    }


    return (
        <>
            <AdminCards
                gridXs={12}
                gridMd={8}
                gridLg={9}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'row'}
                height="auto"
                title={'Grafico de usuários'}
                component={<AdminGrafic created={displayMonths(users)} />}
            />

            <AdminCards
                gridXs={12}
                gridMd={4}
                gridLg={3}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'column'}
                height={240}
                title={'Total de usuarios'}
                component={<AdminUsersTotals totals={totals} />}
            />

            {/* Recent Orders */}
            <AdminCards
                gridXs={12}
                paperP={2}
                paperDisplay={'block'}
                flexDirection={'column'}
                height="auto"
                title={'Users table'}
                component={<UserAdmin prop={users}/>}
            />
        </>
    );
}