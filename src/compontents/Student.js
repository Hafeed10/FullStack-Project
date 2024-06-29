import { useEffect, useState } from "react";
import axios from 'axios';

function Student() {
  const [id, setId] = useState('');
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [fee, setFee] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://127.0.0.1:8000/student");
    setStudents(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/student", {
        name: name,
        address: address,
        fee: fee
      });
      alert("Student Registration Successfully");
      setId("");
      setName("");
      setAddress("");
      setFee("");
      Load();
    } catch (err) {
      alert("Student Registration Failed");
    }
  }

  async function editStudent(student) {
    setName(student.name);
    setAddress(student.address);
    setFee(student.fee);
    setId(student.id);
  }

  async function DeleteStudent(id) {
    await axios.delete("http://127.0.0.1:8000/student/" + id);
    alert("Student deleted Successfully");
    setId("");
    setName("");
    setAddress("");
    setFee("");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put("http://127.0.0.1:8000/student/" + id, {
        id: id,
        name: name,
        address: address,
        fee: fee
      });
      alert("Student Updated Successfully");
      setId("");
      setName("");
      setAddress("");
      setFee("");
      Load();
    } catch (err) {
      alert("Student Update Failed");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-mono text-5xl py-10">Student Details</h1>
      <div className="flex justify-center text-start w-1/2 border-gray-700">
        <form className="w-full">
          <div className="form-group mb-4">
            <label className="block">Student Name</label>
            <input
              type="text"
              className="form-control w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label className="block">Address</label>
            <input
              type="text"
              className="form-control w-full p-2 border border-gray-300 rounded"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label className="block">Fee</label>
            <input
              type="text"
              className="form-control w-full p-2 border border-gray-300 rounded"
              value={fee}
              onChange={(event) => setFee(event.target.value)}
            />
          </div>

          <div className="flex gap-5 py-10">
            <button
              className="bg-orange-600 p-2 rounded-lg text-white"
              onClick={save}
            >
              Register
            </button>
            <button
              className="bg-blue-600 p-2 rounded-lg text-white"
              onClick={update}
            >
              Update
            </button>
          </div>
        </form>
      </div>

      <table className="table-auto border-collapse w-3/4 mt-10">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border px-4 py-2">Student Id</th>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Fee</th>
            <th className="border px-4 py-2">Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.id}</td>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.address}</td>
              <td className="border px-4 py-2">{student.fee}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => DeleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;
