function BranchSelector({ branch, setBranch }) {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h3>Select Branch</h3>

      <select value={branch} onChange={(e) => setBranch(e.target.value)}>
        <option value="">Choose Branch</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="IT">IT</option>
      </select>
    </div>
  );
}

export default BranchSelector;