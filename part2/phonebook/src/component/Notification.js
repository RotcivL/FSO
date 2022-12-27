const Notification = ({ message, error }) => {
  let notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (error) {
    notificationStyle = { ...notificationStyle, color: "red" };
  }

  if (message === null) {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
