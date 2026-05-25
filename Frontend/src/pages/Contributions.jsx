import Sidebar from "../components/Sidebar";

function Contributions() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold">
                    Contributions</h1>
            </div>
        </div>
    );
}

export default Contributions;