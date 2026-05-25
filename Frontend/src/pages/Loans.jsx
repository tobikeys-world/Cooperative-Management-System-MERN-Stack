import Sidebar from "../components/Sidebar";

function Loans() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold">
                    Loans</h1>
            </div>
        </div>
    );
}

export default Loans;