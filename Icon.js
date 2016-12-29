const IconInstance = (<div>
    <div>
        <table className = "rc-table" style = {{"width": "80%", "textAlign": "center"}}>
            <thead>
                <tr>
                <th>Name</th>
                <th>Default</th>
                <th>Color</th>
                <th>Zoom</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>arrow-down</td>
                <td><Icon name="arrow-down"/></td>
                <td>RED:<Icon name="arrow-down" color = "RED"/></td>
                <td><Icon name="arrow-down" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>arrow-left</td>
                <td><Icon name="arrow-left"/></td>
                <td>MA_BLUE:<Icon name="arrow-left" color = "MA_BLUE"/></td>
                <td><Icon name="arrow-left" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>arrow-right</td>
                <td><Icon name="arrow-right"/></td>
                <td>MIS_BLUE:<Icon name="arrow-right" color = "MIS_BLUE"/></td>
                <td><Icon name="arrow-right" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>arrow-sort</td>
                <td><Icon name="arrow-sort"/></td>
                <td>MOODYS_BLUE:<Icon name="arrow-sort" color = "MOODYS_BLUE"/></td>
                <td><Icon name="arrow-sort" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>arrow-up</td>
                <td><Icon name="arrow-up"/></td>
                <td>GOLD:<Icon name="arrow-up" color = "GOLD"/></td>
                <td><Icon name="arrow-up" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>bell</td>
                <td><Icon name="bell"/></td>
                <td>BLACK:<Icon name="bell" color = "BLACK"/></td>
                <td><Icon name="bell" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>calendar</td>
                <td><Icon name="calendar"/></td>
                <td>GREY_4:<Icon name="calendar" color = "GREY_4"/></td>
                <td><Icon name="calendar" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>checkmark</td>
                <td><Icon name="checkmark"/></td>
                <td>GREY_3_4:<Icon name="checkmark" color = "GREY_3_4"/></td>
                <td><Icon name="checkmark" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>close</td>
                <td><Icon name="close"/></td>
                <td>GREY_3_3:<Icon name="close" color = "GREY_3_3"/></td>
                <td><Icon name="close" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>document</td>
                <td><Icon name="document"/></td>
                <td>GREY_3_2:<Icon name="document" color = "GREY_3_2"/></td>
                <td><Icon name="document" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>globe</td>
                <td><Icon name="globe"/></td>
                <td>GREY_3_1:<Icon name="globe" color = "GREY_3_1"/></td>
                <td><Icon name="globe" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>information</td>
                <td><Icon name="information"/></td>
                <td>GREY_3:<Icon name="information" color = "GREY_3"/></td>
                <td><Icon name="information" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>search</td>
                <td><Icon name="search"/></td>
                <td>GREY_2_1:<Icon name="search" color = "GREY_2_1"/></td>
                <td><Icon name="search" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>slider</td>
                <td><Icon name="slider"/></td>
                <td>GREY_2:<Icon name="slider" color = "GREY_2"/></td>
                <td><Icon name="slider" zoom = "1.5"/></td>
            </tr>
            <tr>
                <td>speech-bubble</td>
                <td><Icon name="speech-bubble"/></td>
                <td>GREY_1:<Icon name="speech-bubble" color = "GREY_1"/></td>
                <td><Icon name="speech-bubble" zoom = "1.5"/></td>
            </tr>
            </tbody>
        </table>
    </div>
    </div>);
ReactDOM.render(IconInstance, mountNode);
