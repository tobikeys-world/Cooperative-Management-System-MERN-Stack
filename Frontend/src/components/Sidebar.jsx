import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-64 bg-blue-700 text-white min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-8">Coop Admin </h1>
            <ul className="space-y-4">
                <li className="hover:bg-blue-600 p-3 rounded-lg cursor-pointer"><Link to="/">Dashboard</Link></li>
                <li className="hover:bg-blue-600 p-3 rounded-lg cursor-pointer"><Link to="/members">Members</Link></li>
                <li className="hover:bg-blue-600 p-3 rounded-lg cursor-pointer"><Link to="/contributions"> Contributions</Link></li>
                <li className="hover:bg-blue-600 p-3 rounded-lg cursor-pointer"><Link to="/loans"> Loans</Link></li>
                <li className="hover:bg-blue-600 p-3 rounded-lg cursor-pointer"><Link to="/reports/summary">Reports</Link></li>

            </ul>
        </div>
    );
}

export default Sidebar;