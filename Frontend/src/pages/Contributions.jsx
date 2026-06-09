import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function Contributions() {
    const [contributions, setContributions] = useState([]);
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        memberId: "",
        amount: "",
        date: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const res = await axios.put(`https://cooperative-backend-9epa.onrender.com/api/contributions/${editingId}`, formData);
                setContributions(contributions.map((contribution) => contribution._id === editingId ? res.data : contribution));
                setEditingId(null);
            } else {
                const res = await axios.post("https://cooperative-backend-9epa.onrender.com/api/contributions", formData);
                setContributions([...contributions, res.data,]);
            }
            setFormData({
                memberId: "",
                amount: "",
                date: "",
            });
            setShowForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (contribution) => {
        setFormData({
            memberId: contribution.memberId?._id || "",
            amount: contribution.amount || "",
            date: contribution.date || "",
        });
        setEditingId(contribution._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://cooperative-backend-9epa.onrender.com/api/contributions/${id}`);
            setContributions(contributions.filter((contribution) =>
                contribution.id !== id));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchContributions();
        fetchMembers()
    }, []);
    const fetchContributions = async () => {
        try {
            const res = await axios.get("https://cooperative-backend-9epa.onrender.com/api/contributions");
            setContributions(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchMembers = async () => {
        try {
            const res = await axios.get("https://cooperative-backend-9epa.onrender.com/api/members");
            setMembers(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-100 min-h-screen p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Contributions</h1>
                    <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">Add Contribution</button>
                </div>
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-6">
                        <select
                            name="memberId"
                            value={formData.memberId}
                            onChange={handleChange}
                            className="border p-2 mr-2 rounded">
                            <option value="">Select Member</option>
                            {members.map((member) => (
                                <option key={member._id}
                                    value={member._id}>{member.name}</option>))}
                        </select>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="border p-2 mr-2 rounded" />

                        <input
                            type="text"
                            name="date"
                            placeholder="Date"
                            value={formData.date}
                            onChange={handleChange}
                            className="border p-2 mr-2 rounded" />
                        <button type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">Submit</button>
                    </form>)}
                <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-4 text-left">Member</th>
                            <th className="p-4 text-center">Amount</th>
                            <th className="p-4 text-center">Date</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contributions.map((contribution) => (
                            <tr key={contribution._id}
                                className="border-b">
                                <td className="text-left">{contribution.memberId?.name}</td>
                                <td className="text-center">₦{contribution.amount}</td>
                                <td className="text-center">{contribution.date}</td>
                                <td><button className="bg-red-600 text-white px-3 py-1 rounded over:bg-red-700 cursor-pointer" onClick={() => handleDelete(contribution._id)}>Delete</button><button onClick={() => handleEdit(contribution)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer">Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Contributions;