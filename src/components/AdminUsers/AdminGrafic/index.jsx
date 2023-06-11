import {Bar} from 'react-chartjs-2'
import {Chart as Chartjs} from 'chart.js/auto';


export default function AdminGrafic({created}){
    //console.log(created)
    
    const [data, labels] = created
    
    const userChart = ({
        labels,
        datasets: [{
            label: 'Criação do perfil',
            data: data
        }]
    })
    return(
        <div style={{width: 'auto'}}>
            <Bar data={userChart}></Bar>
        </div>

    )
}