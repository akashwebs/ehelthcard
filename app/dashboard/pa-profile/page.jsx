"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/v1/pa-profile";

const initialForm = {
  healthId: "",
  fullName: "",
  profileImage: "",
  dateOfBirth: "",
  gender: "Male",
  bloodGroup: "B+",
  mobile: "",
  address: "",
  issueDate: "",
  validDate: "",
  status: "active",
};

export default function PaProfileAddAndView() {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProfiles(res.data?.data.result || res.data || []);
    } catch (error) {
      toast.error("Profile load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);

    setFormData({
      fullName: item.fullName || "",
      profileImage: item.profileImage || "",
      dateOfBirth: item.dateOfBirth?.slice(0, 10) || "",
      gender: item.gender || "Male",
      bloodGroup: item.bloodGroup || "B+",
      mobile: item.mobile || "",
      address: item.address || "",
      issueDate: item.issueDate?.slice(0, 10) || "",
      validDate: item.validDate?.slice(0, 10) || "",
      status: item.status || "active",
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleSubmit = async (e) => {
    try {
    
      if (editingId) {
        await axios.patch(`${API_URL}/${editingId}`, formData);
        toast.success("Profile updated successfully");
      } else {
        await axios.post(API_URL, formData);
        console.log("from data",formData)
        toast.success("Profile added successfully");
      }

      /* closeModal();
      fetchProfiles(); */
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Profile deleted successfully");
      fetchProfiles();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  /* const filteredProfiles = profiles?.filter((item) => {
    const text = `${item.fullName} ${item.healthId} ${item.mobile} ${item.bloodGroup}`.toLowerCase();
    return text.includes(search.toLowerCase());
  }); */

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Patient Profile Management
            </h1>
            <p className="text-slate-500 mt-1">
              Add, view, edit and delete patient health card profiles
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="bg-emerald-800 hover:bg-black-700 text-black border cursor-pointer px-5 py-3 rounded-lg font-semibold"
          >
            + Add Patient
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-5">
          <input
            type="text"
            placeholder="Search by name, health ID, mobile or blood group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg">
              All Patients ({profiles.length})
            </h2>
          </div>

         {loading ? (
            <div className="p-10 text-center text-slate-500">Loading...</div>
          ) : profiles.length === 0 ? (
            <div className="p-10 text-center text-slate-500">No profile found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-3 text-left">Patient</th>
                    <th className="p-3 text-left">Health ID</th>
                    <th className="p-3 text-left">DOB</th>
                    <th className="p-3 text-left">Blood</th>
                    <th className="p-3 text-left">Mobile</th>
                    <th className="p-3 text-left">Valid Date</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {profiles.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-slate-50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.profileImage || "https://via.placeholder.com/80"}
                            alt={item.fullName}
                            className="w-12 h-12 rounded-lg object-cover border"
                          />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {item.fullName}
                            </p>
                            <p className="text-slate-500">{item.gender}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 font-medium">{item.healthId}</td>
                      <td className="p-3">
                        {item.dateOfBirth?.slice(0, 10)}
                      </td>
                      <td className="p-3">
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
                          {item.bloodGroup}
                        </span>
                      </td>
                      <td className="p-3">{item.mobile}</td>
                      <td className="p-3">
                        {item.validDate?.slice(0, 10)}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 text-balck rounded-md cursor-pointer"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-600 hover:bg-red-700  text-black px-3 py-2 rounded-md cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )} 
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Patient Profile" : "Add Patient Profile"}
              </h2>

              <button
                onClick={closeModal}
                className="text-slate-500 hover:text-red-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Profile Image URL"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                />

                <Input
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />

                <Select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={["Male", "Female", "Other"]}
                />

                <Select
                  label="Blood Group"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                />

                <Input
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Issue Date"
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Valid Date"
                  type="date"
                  name="validDate"
                  value={formData.validDate}
                  onChange={handleChange}
                  required
                />

                <Select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={["active", "inactive"]}
                />

                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {formData.profileImage && (
                  <div className="md:col-span-3">
                    <p className="text-sm font-semibold mb-2">Image Preview</p>
                    <img
                      src={formData.profileImage}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-xl border"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-lg border font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  // disabled={submitLoading}
                  className="px-5 py-3  rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-60"
                >
                  {submitLoading
                    ? "Saving..."
                    : editingId
                    ? "Update Profile"
                    : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <select
        {...props}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}