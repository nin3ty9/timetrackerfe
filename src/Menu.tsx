//Typa propsen för att undvika att använda "any":
interface Props {
    setPage: ((page: string) => void);
}
//Menycomponenten, den använder props från app.tsx:
function Menu(props: Props) {
    return (
        <div>
            <button onClick={() => props.setPage("start")}>Start</button>
            <button onClick={() => props.setPage("activities")}>Activities</button>
            <button onClick={() => props.setPage("actSessions")}>Activity Sessions</button>
            <button onClick={() => props.setPage("totalStatistics")}>Total Statistics</button>
            <button onClick={() => props.setPage("weeklyStatistics")}>Weekly Statistics</button>
        </div>
    );
}

export default Menu;