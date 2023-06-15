import { Bar } from 'react-chartjs-2'
import { Chart as Chartjs } from 'chart.js/auto';


export default function AdminGrafic({ created, chartLabel }) {
    //console.log(created)

    const [data, labels, userIds, datas] = created

    let userChart = []

    {
        datas
            ?
            userChart = ({
                labels,
                datasets: [{
                    label: chartLabel,
                    data: data,
                    backgroundColor: '#1E90FF'
                }, {
                    label: 'notas de grupo',
                    data: datas,
                    backgroundColor: '#EE82EE'
                }],

            })
            :
            userChart = ({
                labels,
                datasets: [{
                    label: chartLabel,
                    data: data,
                    backgroundColor: '#1E90FF'
                    
                }]
            })

    }



    return (
        <div style={{ width: 'auto' }}>
            <Bar data={userChart}></Bar>
        </div>

    )
}