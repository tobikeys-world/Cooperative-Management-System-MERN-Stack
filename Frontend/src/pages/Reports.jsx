import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Reports() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, []);
    const fetchReports = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/reports/summary");
            setReports(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-100 min-h-screen p-8">
                <h1 className="text-3xl font-bold mb-8">
                    Cooperative Reports
                </h1>
                <div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-700 text-white">
                                <th className="p-3 text-left">Members</th>
                                <th className="p-3 text-left">Total Contributions</th>
                                <th className="p-3 text-left">Total Loans</th>
                                <th className="p-3 text-left">Active Loans</th>

                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (<tr key={index} className="border-b">
                                <td className="p-3">{report.name || "No Name"}</td>
                                <td className="p-3">₦{report.totalContribution}</td>
                                <td className="p-3">₦{report.totalLoan}</td>
                                <td className="p-3">{report.activeLoans}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default Reports;