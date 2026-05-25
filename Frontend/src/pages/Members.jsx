import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Members() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [members, setMembers] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const handleEdit = (member) => {
        setFormData({
            name: member.name || "",
            email: member.email || "",
            phone: member.phone || "",
        });
        setEditingId(member._id);
        setShowForm(true);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const res = await axios.put(`http://localhost:5000/api/members/${editingId}`, formData);
                setMembers(
                    members.map((member) => member._id === editingId ? res.data : member
                    ));
                setEditingId(null);
            } else {
                const res = await axios.post("http://localhost:5000/api/members", formData);
                setMembers([...members, res.data]);
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/members/${id}`);
            // remove deleted members instantly
            setMembers(members.filter((member) => member._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        axios.get("http://localhost:5000/api/members")
            .then((res) => {
                setMembers(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-8">

                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Members</h1>
                        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">Add Member</button>
                        {showForm && (
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="border p-2 mr-2 rounded"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="border p-2 mr-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="border p-2 mr-2 rounded"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                                    Submit
                                </button>
                            </form>)}
                    </div>

                    <table className="w-full bg-white rounded-xl shadow-md">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-center">Phone</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member._id}>
                                    <td className="p-4 text-left">{member.name}</td>
                                    <td className="p-4 text-left">{member.email}</td>
                                    <td className="p-4 text-center">{member.phone}</td>
                                    <td className="p-4 text-center"><button onClick={() => handleDelete(member._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer">Delete</button><button onClick={() => handleEdit(member)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2 cursor-pointer">Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </h1>
            </div>
        </div>
    );
}

export default Members;