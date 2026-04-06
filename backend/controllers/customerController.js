const Customer = require("../models/Customer");

const getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

const addCustomer = async (req, res) => {
  const newCustomer = new Customer(req.body);
  const savedCustomer = await newCustomer.save();
  res.json(savedCustomer);
};

const updateCustomer = async (req, res) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedCustomer);
};

const deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer deleted" });
};

module.exports = {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer
};