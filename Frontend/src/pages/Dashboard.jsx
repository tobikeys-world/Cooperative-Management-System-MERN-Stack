import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function Dashboard() {
    const [summary, setSummary] = useState({
        totalMembers: 0,
        totalContributions: 0,
        totalLoans: 0,
        activeLoans: 0
    });

    useEffect(() => {
        axios.get("http://localhost:5000/api/dashboard/summary")
            .then((res) => {
                setSummary(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1" p-8>
                <div className="min-h-screen bg-gray-100 p-8">
                    <h1 className="text-3xl font-bold mb-8">Cooperative Dashboard</h1>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-gray-600">Total Members</h3>
                            <p className="text-3xl font-bold">{summary.totalMembers}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-gray-600">Total Contribusions</h3>
                            <p className="text-3xl font-bold">₦{summary.totalContributions}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-gray-600">Total Loans</h3>
                            <p className="text-3xl font-bold">₦{summary.totalLoans}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-gray-600">Active Loans</h3>
                            <p className="text-3xl font-bold">{summary.activeLoans}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;