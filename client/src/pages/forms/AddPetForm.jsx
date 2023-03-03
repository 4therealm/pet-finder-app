// export default function AddPetForm({ handleAddPet, handleCancel, userId, setPets }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     breed: "",
//     description: "",
//     age: "",
//     gender: "",
//     size: "",
//     color: "",
//     friendly: "",
//     health: "",
//     notes: "",
//     userId: userId,
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();


//     try {
//       const response = await axios.post("/api/pets", formData);
//       console.log(response.data);

//       if (!response.data) {
//         throw new Error("Failed to add pet");
//       }

//       handleAddPet(formData);
//       setPets((prevPets) => [...prevPets, formData]); // add the new pet to the pets array
//       setFormData({
//         name: "",
//         type: "",
//         breed: "",
//         description: "",
//         age: "",
//         gender: "",
//         size: "",
//         color: "",
//         friendly: "",
//         health: "",
//         notes: "",
//         userId: "",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add a Pet</h2>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//       </div>
//       <div>
//         <label htmlFor="type">Type:</label>
//         <input type="text" name="type" value={formData.type} onChange={handleChange} required />
//       </div>
//       <div>
//         <label htmlFor="breed">Breed:</label>
//         <input type="text" name="breed" value={formData.breed} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="age">Age:</label>
//         <input type="number" name="age" value={formData.age} onChange={handleChange} step={1} />
//       </div>
//       <div>
//         <label htmlFor="gender">Gender:</label>
//         <select name="gender" value={formData.gender} onChange={handleChange}>
//           <option value="">Select</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       <div>
//         <label htmlFor="size">Size:</label>
//         <select name="size" value={formData.size} onChange={handleChange}>
//           <option value="small">Small</option>
//           <option value="medium">Medium</option>
//           <option value="large">Large</option>
//         </select>
//       </div>

//       <div>
//         <label htmlFor="color">Color:</label>
//         <input type="text" name="color" value={formData.color} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="friendly">Friendly:</label>
//         <div>
//           <input type="radio" id="friendly-yes" name="friendly" value="yes" checked={formData.friendly==="yes"} onChange={handleChange} />
//           <label htmlFor="friendly-yes">Yes</label>
//         </div>
//         <div>
//           <input type="radio" id="friendly-no" name="friendly" value="no" checked={formData.friendly==="no"} onChange={handleChange} />
//           <label htmlFor="friendly-no">No</label>
//         </div>
//       </div>

//       <div>
//         <label htmlFor="health">Health:</label>
//         <input type="text" name="health" value={formData.health} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="notes">Notes:</label>
//         <input type="text" name="notes" value={formData.notes} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="userId">User Id:</label>
//         <input hidden type="text" name="userId" value={userId} onChange={handleChange} />
//         <p>{userId}</p>
//       </div>
//       <button type="submit">Add Pet</button>
//       <button type="button" onClick={handleCancel}>Cancel</button>
//     </form>
//   )
// }