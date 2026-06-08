import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Loans() {
    const [loans, setLoans] = useState([]);
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        memberId: "",
        amount: "",
        status: "pending",
    });
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://cooperative-backend-9epa.onrender.com//api/loans", formData);
            setLoans([...loans, res.data]);
            setFormData({
                memberId: "",
                amount: "",
                status: "pending",
            });
            setShowForm(false);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchLoans();
        fetchMembers();
    }, []);
    const fetchLoans = async () => {
        try {
            const res = await axios.get("https://cooperative-backend-9epa.onrender.com//api/loans");
            setLoans(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchMembers = async () => {
        try {
            const res = await axios.get("https://cooperative-backend-9epa.onrender.com//api/members");
            setMembers(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-100 min-h-screen p-8">
                <div className="flex justify-between item-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Loans</h1>
                    <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add Loan</button>
                </div>
                {showForm && (
                    <form onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-xl shadow-md mb-6">
                        <select name="memberId"
                            value={formData.memberId}
                            onChange={handleChange}>
                            <option value="">Select Menber </option>
                            {members.map((member) => (
                                <option key={member._id}
                                    value={member._id}>{member.name}</option>
                            ))}
                        </select>
                        <input type="number"
                            name="amount"
                            placeholder="Loan Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="border p-2 mr-2" />
                        <select name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="boder p-2 mr-2 rounded">
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="paid">Paid</option>
                        </select>
                        <button type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                            Submit
                        </button>
                    </form>
                )};
                <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="text-left p-4">Member</th>
                            <th className="text-center p-4">Amount</th>
                            <th className="text-center p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map((loan) => (<tr key={loan._id} className="border-b">
                            <td className="text-left p-4">{loan.memberId?.name || "No Name"}</td>
                            <td className="text-center p-4">{loan.amount}</td>
                            <td className="text-center p-4">{loan.status}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Loans;