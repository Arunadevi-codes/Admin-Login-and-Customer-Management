import React, { useEffect, useState } from "react";
import {
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer
} from "../services/customerService";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editingCustomer, setEditingCustomer] = useState(null);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [message, setMessage] = useState("");

  const fetchCustomers = async () => {
    const res = await getCustomers();
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleAdd = async () => {

    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    await addCustomer({ name, email, phone });

    setName("");
    setEmail("");
    setPhone("");

    showMessage("✅ Customer added successfully!");

    fetchCustomers();
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    await deleteCustomer(id);

    showMessage("🗑 Customer deleted successfully!");

    fetchCustomers();
  };

  const handleEdit = (customer) => {

    setEditingCustomer(customer);

    setEditName(customer.name);
    setEditEmail(customer.email);
    setEditPhone(customer.phone);
  };

  const handleUpdate = async () => {

    if (!editingCustomer) return;

    await updateCustomer(editingCustomer._id, {
      name: editName,
      email: editEmail,
      phone: editPhone
    });

    showMessage("✏ Customer updated successfully!");

    setEditingCustomer(null);

    setEditName("");
    setEditEmail("");
    setEditPhone("");

    fetchCustomers();
  };

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <Layout>

      <div className="page-container">

        <h2 className="page-title">👥 Customer Management</h2>

        {message && <div className="success-message">{message}</div>}

        {/* Search */}

        <input
          className="search-box"
          placeholder="🔍 Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Add Customer */}

        <div className="card">

          <h3>➕ Add Customer</h3>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="btn-add" onClick={handleAdd}>
            ➕ Add Customer
          </button>

        </div>

        {/* Customer Table */}

        <div className="card">

          <h3>📋 Customer List</h3>

          <table>

            <thead>
              <tr>
                <th>👤 Name</th>
                <th>📧 Email</th>
                <th>📱 Phone</th>
                <th>⚙ Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredCustomers.map((c) => (

                <tr key={c._id}>

                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>

                  <td>

                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(c)}
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(c._id)}
                    >
                      🗑 Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Edit Customer */}

        {editingCustomer && (

          <div className="card">

            <h3>✏ Edit Customer</h3>

            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <input
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />

            <input
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />

            <button className="btn-add" onClick={handleUpdate}>
              Update Customer
            </button>

            <button
              className="btn-cancel"
              onClick={() => setEditingCustomer(null)}
            >
              Cancel
            </button>

          </div>

        )}

      </div>

    </Layout>
  );
};

export default Customers;