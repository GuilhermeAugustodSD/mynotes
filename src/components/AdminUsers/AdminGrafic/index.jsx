import { Bar } from 'react-chartjs-2'
import { Chart as Chartjs } from 'chart.js/auto';


export default function AdminGrafic({ created, chartLabel, secondLabel }) {
    //console.log(created)

    const [data, labels, userIds, datas = ''] = created

    let userChart = []


    let orderChart = []
    labels.flatMap((item, index) =>
        orderChart.push({
            data1: data[index],
            data2: datas[index],
            label: item
        })
    )

    orderChart.sort(function compare(a, b) {
        if (a.data1 < b.data1) return +1;
        if (a.data1 > b.data1) return -1;
        return 0;
    })

    let data1 = []
    let data2 = []
    let label = []
    orderChart.map(item => {
        data1.push(item.data1),
            data2.push(item.data2)
        label.push(item.label)
    })


    {
        datas
            ?
            userChart = ({
                labels: label,
                datasets: [{
                    label: chartLabel,
                    data: data1,
                    backgroundColor: '#1E90FF'
                }, {
                    label: secondLabel,
                    data: data2,
                    backgroundColor: 'rgba(225,100,64, 0.5)'
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