import EditableTable from "./parts/EditableTable";
// inventories;
const Admin = () => {
  return (
    <div
      style={{
        padding: 1,
        color: "#000",
        margin: 5,
        backgroundColor: "#ffffff85",
        borderRadius: ".8em",
      }}
    >
      <EditableTable
        endpoint="user_characters"
        primaryKey="user_character"
        editableColumns={["id", "helmet", "shield", "weapon"]}
      />
      {/* <EditableTable
        endpoint="inventories"
        primaryKey="id"
        editableColumns={["helmet", "shield", "weapon"]}
      /> */}
    </div>
  );
};

export default Admin;
